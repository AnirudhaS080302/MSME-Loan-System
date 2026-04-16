/**
 * MSME Credit Decision Engine
 * Scores a loan application based on business profile + loan inputs
 * Score range: 0 - 100
 */

const BUSINESS_TYPE_RISK = {
  retail: 70,
  services: 75,
  manufacturing: 65,
};

function calculateEMI(principal, tenureMonths, annualRate = 0.14) {
  const r = annualRate / 12;
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) /
               (Math.pow(1 + r, tenureMonths) - 1);
  return parseFloat(emi.toFixed(2));
}

function runCreditDecision({ monthly_revenue, business_type, requested_amount, tenure_months }) {
  let score = 0;
  const reasons = [];

  // --- Rule 1: Revenue-to-Loan Ratio (max 40 pts) ---
  const revenueRatio = requested_amount / monthly_revenue;
  if (revenueRatio <= 3) {
    score += 40;
    reasons.push('Strong revenue-to-loan ratio.');
  } else if (revenueRatio <= 6) {
    score += 25;
    reasons.push('Moderate revenue-to-loan ratio.');
  } else if (revenueRatio <= 10) {
    score += 10;
    reasons.push('High loan amount relative to monthly revenue.');
  } else {
    score += 0;
    reasons.push('Loan amount significantly exceeds revenue capacity.');
  }

  // --- Rule 2: Business Type Risk Score (max 30 pts) ---
  const bizScore = BUSINESS_TYPE_RISK[business_type.toLowerCase()] || 60;
  const bizPoints = Math.round((bizScore / 100) * 30);
  score += bizPoints;
  reasons.push(`Business type (${business_type}) risk score: ${bizScore}/100.`);

  // --- Rule 3: EMI Affordability (max 30 pts) ---
  const emi = calculateEMI(requested_amount, tenure_months);
  const emiRatio = emi / monthly_revenue;

  if (emiRatio <= 0.3) {
    score += 30;
    reasons.push(`EMI (₹${emi}) is well within repayment capacity.`);
  } else if (emiRatio <= 0.5) {
    score += 15;
    reasons.push(`EMI (₹${emi}) is at moderate repayment capacity.`);
  } else {
    score += 0;
    reasons.push(`EMI (₹${emi}) exceeds safe repayment threshold (50% of revenue).`);
  }

  // --- Final Decision ---
  let decision;
  if (score >= 65) {
    decision = 'APPROVED';
  } else if (score >= 45) {
    decision = 'REVIEW';
  } else {
    decision = 'REJECTED';
  }

  return {
    decision,
    score,
    emi_estimate: emi,
    reasoning: reasons,
  };
}

module.exports = { runCreditDecision };