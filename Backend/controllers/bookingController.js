const { db, filterByLocation } = require('../config/db');

function getBookings(req, res) {
  try {
    let scoped = filterByLocation(db.bookings, req.user);
    const { search, status } = req.query;

    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(b =>
        b.bookingNumber.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q) ||
        b.pincode.includes(q)
      );
    }
    if (status) {
      scoped = scoped.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }

    return res.json({ success: true, count: scoped.length, bookings: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: error.message });
  }
}

function updateBookingStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, technicianAssigned } = req.body;

    const booking = db.bookings.find(b => b.id === id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const scoped = filterByLocation([booking], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Booking outside your jurisdiction' });
    }

    if (status) booking.status = status;
    if (technicianAssigned) booking.technicianAssigned = technicianAssigned;

    return res.json({ success: true, message: 'Booking updated successfully', booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update booking', error: error.message });
  }
}

module.exports = {
  getBookings,
  updateBookingStatus
};
