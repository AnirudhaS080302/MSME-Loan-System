const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Remove deprecated options: useNewUrlParser, useUnifiedTopology
    await mongoose.connect(process.env.MONGODB_URI, {
      // No options needed for Mongoose 7+ with MongoDB driver 4+
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;