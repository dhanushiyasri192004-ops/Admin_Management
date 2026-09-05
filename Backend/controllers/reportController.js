const { db, filterByLocation } = require('../config/db');

function getDashboardSummary(req, res) {
  try {
    const user = req.user;
    const scopedCustomers = filterByLocation(db.customers, user);
    const scopedVendors = filterByLocation(db.vendors, user);
    const scopedOrders = filterByLocation(db.orders, user);
    const scopedBookings = filterByLocation(db.bookings, user);
    const scopedJobs = filterByLocation(db.jobs, user);
    const scopedTechnicians = filterByLocation(db.technicians, user);
    const scopedExecutives = filterByLocation(db.executives, user);
    const scopedSupport = filterByLocation(db.supportTeam, user);
    const scopedAgents = filterByLocation(db.agents, user);
    const scopedKYC = filterByLocation(db.kycRecords, user);
    const scopedAgentPayments = filterByLocation(db.agentPayments, user);
    const scopedVendorPayments = filterByLocation(db.vendorPayments, user);
    const scopedPincodes = filterByLocation(db.pincodeDetails, user);

    // Calculate aggregations
    const totalRevenue = scopedOrders.reduce((sum, o) => sum + (o.netPayable || o.totalAmount || 0), 0);
    const pendingAgentPayouts = scopedAgentPayments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0);

    const pendingVendorPayouts = scopedVendorPayments
      .filter(p => p.status === 'Pending')
      .reduce((sum, p) => sum + p.amount, 0);

    // Membership tier distribution
    const membershipDistribution = {
      Silver: scopedCustomers.filter(c => c.membership && c.membership.tier === 'Silver').length,
      Gold: scopedCustomers.filter(c => c.membership && c.membership.tier === 'Gold').length,
      Diamond: scopedCustomers.filter(c => c.membership && c.membership.tier === 'Diamond').length
    };

    // Revenue trend by month (mock realistic distribution)
    const revenueTrend = [
      { month: 'Oct', revenue: Math.round(totalRevenue * 0.12), orders: Math.round(scopedOrders.length * 1.5) },
      { month: 'Nov', revenue: Math.round(totalRevenue * 0.18), orders: Math.round(scopedOrders.length * 1.8) },
      { month: 'Dec', revenue: Math.round(totalRevenue * 0.25), orders: Math.round(scopedOrders.length * 2.2) },
      { month: 'Jan', revenue: Math.round(totalRevenue * 0.20), orders: Math.round(scopedOrders.length * 1.9) },
      { month: 'Feb', revenue: Math.round(totalRevenue * 0.22), orders: Math.round(scopedOrders.length * 2.0) },
      { month: 'Mar', revenue: Math.round(totalRevenue * 0.28), orders: Math.round(scopedOrders.length * 2.5) }
    ];

    // Order status breakdown
    const orderStatusBreakdown = [
      { status: 'Delivered', count: scopedOrders.filter(o => o.status === 'Delivered').length },
      { status: 'Shipped / Out for Delivery', count: scopedOrders.filter(o => ['Shipped', 'Out for Delivery'].includes(o.status)).length },
      { status: 'Processing', count: scopedOrders.filter(o => o.status === 'Processing').length }
    ];

    return res.json({
      success: true,
      role: user.role,
      scope: {
        state: user.state,
        district: user.district,
        division: user.division,
        pincode: user.pincode
      },
      metrics: {
        totalCustomers: scopedCustomers.length,
        totalVendors: scopedVendors.length,
        totalOrders: scopedOrders.length,
        totalBookings: scopedBookings.length,
        totalJobs: scopedJobs.length,
        totalTechnicians: scopedTechnicians.length,
        totalExecutives: scopedExecutives.length,
        totalSupportTickets: scopedSupport.length,
        totalAgents: scopedAgents.length,
        totalKYC: scopedKYC.length,
        totalPincodes: scopedPincodes.length,
        totalRevenue,
        pendingAgentPayouts,
        pendingVendorPayouts
      },
      membershipDistribution,
      revenueTrend,
      orderStatusBreakdown
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to generate dashboard summary', error: error.message });
  }
}

function getBusinessReports(req, res) {
  try {
    const user = req.user;
    const scopedOrders = filterByLocation(db.orders, user);
    const scopedBookings = filterByLocation(db.bookings, user);
    const scopedCustomers = filterByLocation(db.customers, user);
    const scopedVendors = filterByLocation(db.vendors, user);

    const report = {
      generatedAt: new Date().toISOString(),
      adminScope: `${user.role} - ${user.pincode || user.division || user.district || user.state}`,
      summary: {
        totalSalesVolume: scopedOrders.length,
        grossSalesValue: scopedOrders.reduce((s, o) => s + o.totalAmount, 0),
        discountsGiven: scopedOrders.reduce((s, o) => s + (o.discountAmount || 0), 0),
        netRevenue: scopedOrders.reduce((s, o) => s + (o.netPayable || o.totalAmount), 0),
        totalServiceBookings: scopedBookings.length,
        activeCustomerBase: scopedCustomers.length,
        activeMerchants: scopedVendors.length
      },
      ordersList: scopedOrders,
      bookingsList: scopedBookings
    };

    return res.json({ success: true, report });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to generate business reports', error: error.message });
  }
}

module.exports = {
  getDashboardSummary,
  getBusinessReports
};
