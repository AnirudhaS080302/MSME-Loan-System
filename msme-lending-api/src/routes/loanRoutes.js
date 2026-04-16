const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { applyForLoan, getLoansByBusiness } = require('../controllers/loanController');

const loanValidation = [
  body('business_id').isMongoId().withMessage('Valid business_id (MongoDB ID) is required.'),
  body('requested_amount')
    .isFloat({ min: 10000 })
    .withMessage('Requested amount must be at least ₹10,000.'),
  body('tenure_months')
    .isInt({ min: 3, max: 60 })
    .withMessage('Tenure must be between 3 and 60 months.'),
  body('purpose').trim().notEmpty().withMessage('Loan purpose is required.'),
];

router.post('/apply', loanValidation, validate, applyForLoan);
router.get('/applications/:business_id', getLoansByBusiness);

module.exports = router;