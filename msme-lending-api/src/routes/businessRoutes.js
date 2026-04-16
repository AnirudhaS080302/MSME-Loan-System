const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const { createBusinessProfile, getBusinessProfile } = require('../controllers/businessController');

const profileValidation = [
  body('owner_name').trim().notEmpty().withMessage('Owner name is required.'),
  body('pan')
    .trim()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage('Invalid PAN format. Expected: ABCDE1234F'),
  body('business_type')
    .isIn(['retail', 'manufacturing', 'services'])
    .withMessage('Business type must be retail, manufacturing, or services.'),
  body('monthly_revenue')
    .isFloat({ min: 1000 })
    .withMessage('Monthly revenue must be a positive number (min 1000).'),
];

router.post('/profile', profileValidation, validate, createBusinessProfile);
router.get('/profile/:id', getBusinessProfile);

module.exports = router;