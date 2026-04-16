# MSME Lending Decision System

Overview
This system enables MSMEs to:

Register their business profile
Submit loan applications
Get instant credit decisions with risk scoring & reason codes
View approval/rejection with explanations
Built for speed, scalability, and regulatory compliance — perfect for fintech startups or internal lending

# Tech Stack
Layer	Technology
Backend	Node.js, Express, MongoDB, Mongoose
Frontend	React, React Router, Bootstrap
Validation	Custom middleware + Zod (optional)
API Testing	Postman + Swagger (future)
Deployment	Docker-ready (future)


Project Structure
msme-lending-system/
├── backend/
│   ├── src/
│   │   ├── config/         # DB, env, logging
│   │   ├── controllers/    # Business, Loan, Decision
│   │   ├── models/         # Business, Loan, CreditScore
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # BusinessService, LoanService, DecisionEngine
│   │   ├── middleware/     # Validation, error handling, logging
│   │   └── app.js          # Express server
│   └── package.json
│
msme-lending-frontend/
│
├── node_modules/
├── public/
│
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BusinessForm.jsx
│   │   ├── DecisionResult.jsx
│   │   ├── LoanForm.jsx
│   │   └── Navbar.jsx
│   │
│   ├── pages/             # Page-level components
│   │   ├── BusinessPage.jsx
│   │   ├── HomePage.jsx
│   │   └── LoanPage.jsx
│   │
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

## Overview
A lightweight, end-to-end lending decision system for MSME businesses.

## Setup Guide
1. Clone the repo
2. Install dependencies: `npm install`
3. Start backend: `npm run dev`
4. Start frontend: `npm start`



## Credit Decision Engine (Backend Logic)

The decision engine evaluates:
Signal	Weight	Rule
Revenue-to-EMI Ratio	30%	Must be ≥ 3x
Loan-to-Revenue Multiple	25%	Must be ≤ 3x
Tenure-adjusted Risk	20%	Longer tenure = higher risk
Fraud Checks	15%	PAN validation, duplicate business
Industry Risk	10%	Retail = low, Manufacturing = medium

Contact
Have questions? Need help? Reach out!

📧 Email: anirudha.s8032@gmail.com
🐙 GitHub: https://github.com/AnirudhaS08