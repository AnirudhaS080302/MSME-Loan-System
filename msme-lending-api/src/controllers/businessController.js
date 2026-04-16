const BusinessProfile = require('../models/BusinessProfile');

// POST /api/business/profile
const createBusinessProfile = async (req, res) => {
  const { owner_name, pan, business_type, monthly_revenue } = req.body;

  try {
    // Check for duplicate PAN
    const existing = await BusinessProfile.findOne({ pan: pan.toUpperCase() });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'A business profile with this PAN already exists.',
      });
    }

    // Create new business profile
    const businessProfile = new BusinessProfile({
      owner_name,
      pan: pan.toUpperCase(),
      business_type: business_type.toLowerCase(),
      monthly_revenue,
    });

    const savedProfile = await businessProfile.save();

    return res.status(201).json({
      success: true,
      message: 'Business profile created successfully.',
      data: savedProfile,
    });
  } catch (error) {
    console.error('createBusinessProfile error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// GET /api/business/profile/:id
const getBusinessProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const businessProfile = await BusinessProfile.findById(id);

    if (!businessProfile) {
      return res.status(404).json({
        success: false,
        message: 'Business profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: businessProfile,
    });
  } catch (error) {
    console.error('getBusinessProfile error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports = { createBusinessProfile, getBusinessProfile };