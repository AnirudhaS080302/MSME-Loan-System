import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">MSME Lending Decision System</h1>
          <p className="text-center lead">Simple, fast, and transparent lending decisions for small businesses</p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>📝 Register Business</Card.Title>
              <Card.Text>
                Create a business profile with owner details, PAN, and monthly revenue.
              </Card.Text>
              <Link to="/business">
                <Button variant="primary">Register Business</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>💰 Apply for Loan</Card.Title>
              <Card.Text>
                Submit loan applications and get instant decisions with reasoning.
              </Card.Text>
              <Link to="/loan">
                <Button variant="success">Apply for Loan</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Alert variant="info">
            <strong>Tip:</strong> Register your business first, then apply for a loan using the business ID.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;