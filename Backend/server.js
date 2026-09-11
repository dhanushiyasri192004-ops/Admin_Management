require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const jobRoutes = require('./routes/jobRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const kycRoutes = require('./routes/kycRoutes');
const qualityRoutes = require('./routes/qualityRoutes');
const pincodeRoutes = require('./routes/pincodeRoutes');
const executiveRoutes = require('./routes/executiveRoutes');

const app = express();
// Port configured
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api/quality', qualityRoutes);
app.use('/api/pincodes', pincodeRoutes);
app.use('/api/operations', executiveRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Hierarchical Admin Management System API'
  });
});

// Global 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Hierarchical Admin Management Backend is running!`);
  console.log(`🌐 Server Port: http://localhost:${PORT}`);
  console.log(`⚡ Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
