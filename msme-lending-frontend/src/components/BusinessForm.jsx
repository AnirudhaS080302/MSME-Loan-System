import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const BusinessForm = ({ onBusinessCreated }) => {
  const [formData, setFormData] = useState({
    owner_name: '',
    pan: '',
    business_type: 'retail',
    monthly_revenue: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form (basic validation)
    if (!formData.owner_name.trim()) {
      setError('Owner name is required');
      return;
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      setError('Invalid PAN format. Expected: ABCDE1234F');
      return;
    }

    if (formData.monthly_revenue < 1000) {
      setError('Monthly revenue must be at least ₹1,000');
      return;
    }

    // Show alert with form data (instead of saving to database)
    const alertMessage = `
What's your name? → "${formData.owner_name}"
What's your PAN? → "${formData.pan}"
What type of business? → "${formData.business_type}"
How much do you earn monthly? → "₹${Number(formData.monthly_revenue).toLocaleString()}"
    `;

    alert(alertMessage);

    // Reset form
    setFormData({
      owner_name: '',
      pan: '',
      business_type: 'retail',
      monthly_revenue: ''
    });

    setSuccess('Business profile data captured successfully!');
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Register Business Profile</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Owner Name</Form.Label>
            <Form.Control
              type="text"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              required
              placeholder="Enter owner name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>PAN (ABCDE1234F)</Form.Label>
            <Form.Control
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              required
              placeholder="ABCDE1234F"
              pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
            />
            <Form.Text className="text-muted">
              Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Business Type</Form.Label>
            <Form.Select
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              required
            >
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Services</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Monthly Revenue (₹)</Form.Label>
            <Form.Control
              type="number"
              name="monthly_revenue"
              value={formData.monthly_revenue}
              onChange={handleChange}
              required
              min="1000"
              placeholder="Enter monthly revenue"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register Business
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BusinessForm;