const LoanApplication = require('../models/LoanApplication');
const BusinessProfile = require('../models/BusinessProfile');
const { runCreditDecision } = require('../services/creditEngine');

// POST /api/loan/apply
const applyForLoan = async (req, res) => {
  const { business_id, requested_amount, tenure_months, purpose } = req.body;

  try {
    // Fetch business profile
    const business = await BusinessProfile.findById(business_id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business profile not found. Please register first.',
      });
    }

    // Run credit decision engine
    const { decision, score, emi_estimate, reasoning } = runCreditDecision({
      monthly_revenue: business.monthly_revenue,
      business_type: business.business_type,
      requested_amount: parseFloat(requested_amount),
      tenure_months: parseInt(tenure_months),
    });

    // Create and save loan application
    const loanApplication = new LoanApplication({
      business_id,
      requested_amount,
      tenure_months,
      purpose,
      decision,
      decision_score: score,
      decision_reason: reasoning.join(' '),
      emi_estimate,
    });

    const savedLoan = await loanApplication.save();

    return res.status(201).json({
      success: true,
      message: 'Loan application processed.',
      data: {
        application_id: savedLoan._id,
        business_owner: business.owner_name,
        requested_amount,
        tenure_months,
        purpose,
        decision,
        decision_score: score,
        emi_estimate,
        reasoning,
        applied_at: savedLoan.createdAt,
      },
    });
  } catch (error) {
    console.error('applyForLoan error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// GET /api/loan/applications/:business_id
const getLoansByBusiness = async (req, res) => {
  const { business_id } = req.params;

  try {
    const loans = await LoanApplication.find({ business_id })
      .populate('business_id', 'owner_name pan business_type monthly_revenue')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: loans,
    });
  } catch (error) {
    console.error('getLoansByBusiness error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports = { applyForLoan, getLoansByBusiness };