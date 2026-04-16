const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Import CORS
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Routes
const businessRoutes = require('./routes/businessRoutes');
const loanRoutes = require('./routes/loanRoutes');

// Use routes
app.use('/api/business', businessRoutes);  // ✅ This is critical!
app.use('/api/loan', loanRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'MSME Lending API', 
    timestamp: new Date(),
    version: '1.0.0',
    database: 'MongoDB',
    environment: process.env.NODE_ENV
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found.',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error.',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MSME Lending API running on port ${PORT}`);
  console.log(`Frontend: http://localhost:3001`);
  console.log(`Health Check: http://localhost:3000/health`);
});