import React from 'react';
import { Card, Badge, ListGroup, Row, Col, Alert } from 'react-bootstrap';

const DecisionResult = ({ decision }) => {
  if (!decision) return null;

  const getDecisionBadge = (decision) => {
    switch (decision) {
      case 'APPROVED':
        return <Badge bg="success">APPROVED</Badge>;
      case 'REVIEW':
        return <Badge bg="warning">REVIEW</Badge>;
      case 'REJECTED':
        return <Badge bg="danger">REJECTED</Badge>;
      default:
        return <Badge bg="secondary">{decision}</Badge>;
    }
  };

  return (
    <Card className="shadow-sm mt-4">
      <Card.Header>
        <h4>Loan Decision Result</h4>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Business Owner:</strong> {decision.business_owner}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Requested Amount:</strong> ₹{decision.requested_amount.toLocaleString()}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Tenure:</strong> {decision.tenure_months} months
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Purpose:</strong> {decision.purpose}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Decision:</strong> {getDecisionBadge(decision.decision)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Decision Score:</strong> {decision.decision_score}/100
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>EMI Estimate:</strong> ₹{decision.emi_estimate?.toLocaleString()}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Header>Reasoning</Card.Header>
              <Card.Body>
                <ul>
                  {decision.reasoning?.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DecisionResult;