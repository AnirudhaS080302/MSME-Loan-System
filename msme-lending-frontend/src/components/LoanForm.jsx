import React, { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const LoanForm = ({ onDecisionReceived }) => {
  const [formData, setFormData] = useState({
    business_id: '',
    requested_amount: '',
    tenure_months: '24',
    purpose: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/loan/apply', formData);
      
      if (response.data.success) {
        // Show decision in alert
        const decision = response.data.data;
        const alertMessage = `
✅ Loan Decision: ${decision.decision}
📊 Score: ${decision.decision_score}/100
💰 EMI: ₹${decision.emi_estimate.toLocaleString()}
📅 Tenure: ${decision.tenure_months} months
📝 Purpose: ${decision.purpose}

Reasoning:
${decision.reasoning.join('\n- ')}
        `;
        
        alert(alertMessage);
        
        // Send decision to parent component
        if (onDecisionReceived) {
          onDecisionReceived(decision);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error applying for loan');
      alert('❌ Error applying for loan. Check console for details.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Apply for Loan</Card.Title>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Business ID</Form.Label>
            <Form.Control
              type="text"
              name="business_id"
              value={formData.business_id}
              onChange={handleChange}
              required
              placeholder="Enter business ID from registration"
            />
            <Form.Text className="text-muted">
              Copy the Business ID from your registration response
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Requested Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              name="requested_amount"
              value={formData.requested_amount}
              onChange={handleChange}
              required
              min="10000"
              placeholder="Enter loan amount"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Repayment Tenure (Months)</Form.Label>
            <Form.Select
              name="tenure_months"
              value={formData.tenure_months}
              onChange={handleChange}
              required
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Loan Purpose</Form.Label>
            <Form.Control
              as="textarea"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              placeholder="e.g., Inventory purchase, Equipment upgrade"
              rows={3}
            />
          </Form.Group>

          <Button variant="success" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : (
              'Apply for Loan'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoanForm;