const { db, filterByLocation } = require('../config/db');

function getOrders(req, res) {
  try {
    let scoped = filterByLocation(db.orders, req.user);

    const { search, status, pincode } = req.query;
    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(o =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.pincode.includes(q)
      );
    }
    if (status) {
      scoped = scoped.filter(o => o.status.toLowerCase() === status.toLowerCase());
    }
    if (pincode && req.user.role !== 'Pincode Admin') {
      scoped = scoped.filter(o => o.pincode === pincode);
    }

    return res.json({ success: true, count: scoped.length, orders: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
}

function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = db.orders.find(o => o.id === id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const scoped = filterByLocation([order], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Order outside your jurisdiction' });
    }

    order.status = status;
    return res.json({ success: true, message: `Order status updated to ${status}`, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update order', error: error.message });
  }
}

module.exports = {
  getOrders,
  updateOrderStatus
};
