const { db, filterByLocation } = require('../config/db');

function getJobs(req, res) {
  try {
    let scoped = filterByLocation(db.jobs, req.user);
    const { search, priority, status } = req.query;

    if (search) {
      const q = search.toLowerCase();
      scoped = scoped.filter(j =>
        (j.title || j.jobTitle || '').toLowerCase().includes(q) ||
        (j.customerName || '').toLowerCase().includes(q) ||
        (j.vendorName || '').toLowerCase().includes(q) ||
        (j.id || '').toLowerCase().includes(q) ||
        (j.pincode || '').includes(q)
      );
    }
    if (priority) {
      scoped = scoped.filter(j => j.priority.toLowerCase() === priority.toLowerCase());
    }
    if (status) {
      scoped = scoped.filter(j => j.status.toLowerCase() === status.toLowerCase());
    }

    return res.json({ success: true, count: scoped.length, jobs: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch jobs', error: error.message });
  }
}

function getTechnicians(req, res) {
  try {
    let scoped = filterByLocation(db.technicians, req.user);
    return res.json({ success: true, count: scoped.length, technicians: scoped });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch technicians', error: error.message });
  }
}

function updateJobStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, technicianName } = req.body;

    const job = db.jobs.find(j => j.id === id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    const scoped = filterByLocation([job], req.user);
    if (scoped.length === 0) {
      return res.status(403).json({ success: false, message: 'Job outside your jurisdiction' });
    }

    if (status) job.status = status;
    if (technicianName) job.technicianName = technicianName;

    return res.json({ success: true, message: 'Job updated', job });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update job', error: error.message });
  }
}

module.exports = {
  getJobs,
  getTechnicians,
  updateJobStatus
};
