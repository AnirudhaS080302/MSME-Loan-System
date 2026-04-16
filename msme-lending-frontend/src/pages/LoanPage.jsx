import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoanForm from '../components/LoanForm';
import DecisionResult from '../components/DecisionResult';

const LoanPage = () => {
  const [decision, setDecision] = useState(null);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Apply for Loan</h2>
          <p className="text-muted">Submit your loan application and get instant decision</p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <LoanForm onDecisionReceived={setDecision} />
        </Col>
        <Col md={6}>
          <DecisionResult decision={decision} />
        </Col>
      </Row>
    </Container>
  );
};

export default LoanPage;