const mongoose = require('mongoose');

const businessProfileSchema = new mongoose.Schema(
  {
    owner_name: {
      type: String,
      required: [true, 'Owner name is required'],
      trim: true,
    },
    pan: {
      type: String,
      required: [true, 'PAN is required'],
      unique: true,
      uppercase: true,
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format. Expected: ABCDE1234F'],
    },
    business_type: {
      type: String,
      enum: ['retail', 'manufacturing', 'services'],
      required: [true, 'Business type is required'],
      lowercase: true,
    },
    monthly_revenue: {
      type: Number,
      required: [true, 'Monthly revenue is required'],
      min: [1000, 'Monthly revenue must be at least 1000'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BusinessProfile', businessProfileSchema);