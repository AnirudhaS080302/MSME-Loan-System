import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import BusinessForm from '../components/BusinessForm';

const BusinessPage = () => {
  const [createdBusiness, setCreatedBusiness] = useState(null);

  const handleBusinessCreated = (business) => {
    setCreatedBusiness(business);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Register Business Profile</h2>
          <p className="text-muted">Create a business profile to start applying for loans</p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <BusinessForm onBusinessCreated={handleBusinessCreated} />
        </Col>
        <Col md={6}>
          {createdBusiness && (
            <div>
              <Alert variant="success">
                <h5>Business Created Successfully!</h5>
                <p><strong>Business ID:</strong> {createdBusiness._id}</p>
                <p><strong>Owner:</strong> {createdBusiness.owner_name}</p>
                <p><strong>PAN:</strong> {createdBusiness.pan}</p>
              </Alert>
              <p>Use this Business ID to apply for loans.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessPage;