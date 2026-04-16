const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BusinessProfile',
      required: [true, 'Business ID is required'],
    },
    requested_amount: {
      type: Number,
      required: [true, 'Requested amount is required'],
      min: [10000, 'Requested amount must be at least 10,000'],
    },
    tenure_months: {
      type: Number,
      required: [true, 'Tenure is required'],
      min: [3, 'Tenure must be at least 3 months'],
      max: [60, 'Tenure cannot exceed 60 months'],
    },
    purpose: {
      type: String,
      required: [true, 'Loan purpose is required'],
      trim: true,
    },
    decision: {
      type: String,
      enum: ['APPROVED', 'REJECTED', 'REVIEW'],
      default: null,
    },
    decision_score: {
      type: Number,
      min: 0,
      max: 100,
    },
    decision_reason: {
      type: String,
    },
    emi_estimate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);