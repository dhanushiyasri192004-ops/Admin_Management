const { db, filterByLocation } = require('../config/db');

// Executives & Support Team
function getExecutives(req, res) {
  try {
    let scoped = filterByLocation(db.executives, req.user);
    return res.json({ success: true, count: scoped.length, executives: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch executives', error: error.message });
  }
}

function getSupportTeam(req, res) {
  try {
    let scoped = filterByLocation(db.supportTeam, req.user);
    return res.json({ success: true, count: scoped.length, tickets: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch support team', error: error.message });
  }
}

function updateTicketStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, assignedTo } = req.body;

    const ticket = db.supportTeam.find(t => t.id === id);
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found' });

    const scoped = filterByLocation([ticket], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Ticket outside your jurisdiction' });
    }

    if (status) ticket.status = status;
    if (assignedTo) ticket.assignedTo = assignedTo;

    return res.json({ success: true, message: 'Ticket updated', ticket });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update ticket', error: error.message });
  }
}

// Agents
function getAgents(req, res) {
  try {
    let scoped = filterByLocation(db.agents, req.user);
    const { search, status } = req.query;

    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.pincode.includes(q)
      );
    }
    if (status) {
      scoped = scoped.filter(a => a.status.toLowerCase() === status.toLowerCase());
    }

    return res.json({ success: true, count: scoped.length, agents: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch agents', error: error.message });
  }
}

module.exports = {
  getExecutives,
  getSupportTeam,
  updateTicketStatus,
  getAgents
};
