const { db, filterByLocation } = require('../config/db');

function getCustomers(req, res) {
  try {
    let scoped = filterByLocation(db.customers, req.user);

    // Apply query filters
    const { search, tier, status, pincode } = req.query;
    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.email.toLowerCase().includes(q) || 
        c.phone.includes(q) ||
        (c.membership && c.membership.cardNumber.toLowerCase().includes(q))
      );
    }
    if (tier) {
      if (tier.toLowerCase() === 'customers' || tier.toLowerCase() === 'none' || tier.toLowerCase() === 'no card') {
        scoped = scoped.filter(c => !c.membership || !c.membership.tier);
      } else {
        scoped = scoped.filter(c => c.membership && c.membership.tier.toLowerCase() === tier.toLowerCase());
      }
    }
    if (status) {
      scoped = scoped.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }
    if (pincode && req.user.role !== 'Pincode Admin') {
      scoped = scoped.filter(c => c.pincode === pincode);
    }

    return res.json({ success: true, count: scoped.length, customers: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch customers', error: error.message });
  }
}

function getMembershipCards(req, res) {
  try {
    const scopedCustomers = filterByLocation(db.customers, req.user);
    const cards = scopedCustomers
      .filter(c => c.membership && c.membership.cardNumber)
      .map(c => ({
        customerId: c.id,
        customerName: c.name,
        customerPhone: c.phone,
        state: c.state,
        district: c.district,
        division: c.division,
        pincode: c.pincode,
        ...c.membership
      }));

    // Tier counts
    const counts = {
      total: cards.length,
      silver: cards.filter(c => c.tier === 'Silver').length,
      gold: cards.filter(c => c.tier === 'Gold').length,
      diamond: cards.filter(c => c.tier === 'Diamond').length
    };

    return res.json({ success: true, counts, cards });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch membership cards', error: error.message });
  }
}

function upgradeMembership(req, res) {
  try {
    const { customerId, tier, pointsBonus } = req.body;
    if (!['Silver', 'Gold', 'Diamond'].includes(tier)) {
      return res.status(400).json({ success: false, message: 'Invalid tier. Must be Silver, Gold, or Diamond.' });
    }

    const customer = db.customers.find(c => c.id === customerId);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Verify user has access to customer location
    const accessible = filterByLocation([customer], req.user);
    if (accessible.length === 0) {
      return res.status(403).json({ success: false, message: 'Customer outside your jurisdiction' });
    }

    const discountMap = { Silver: 5, Gold: 12, Diamond: 20 };
    customer.membership.tier = tier;
    customer.membership.discountPercent = discountMap[tier];
    if (pointsBonus) customer.membership.points += Number(pointsBonus);

    return res.json({
      success: true,
      message: `Customer ${customer.name} upgraded to ${tier} membership.`,
      customer
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to upgrade membership', error: error.message });
  }
}

module.exports = {
  getCustomers,
  getMembershipCards,
  upgradeMembership
};
