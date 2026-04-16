# MSME Lending Decision System

A full-stack MERN application that enables MSMEs (Micro, Small, and Medium Enterprises) to apply for loans and receive instant credit decisions based on a rule-based scoring engine.

---

## Features

* Business registration with PAN and revenue details
* Loan application submission
* 5-factor credit scoring system (0–1000)
* Instant loan approval/rejection
* Clear reason codes for decisions
* Clean and modular architecture (MVC)

---

## Tech Stack

### Frontend

* React.js
* React Router
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## Project Structure

```
backend/
  ├── routes/
  ├── controllers/
  ├── services/
  ├── models/
  ├── middleware/
  └── decisionEngine/

frontend/
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   └── App.js
```

---

## Installation & Setup

### 1. Clone Repository

```
git clone <your-repo-link>
cd MSME-Loan-System
```

### 2. Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```
npm start
```

### 3. Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`
Backend runs on: `http://localhost:5000`

---

## API Endpoints

### Business

* `POST /api/business` → Register business

### Loan

* `POST /api/loan/apply` → Apply for loan

### Decision

* Returns:

```
{
  score: number,
  decision: "Approved" | "Rejected",
  reasons: string[]
}
```

---

## Decision Logic

The system uses a weighted scoring model:

| Factor               | Weight |
| -------------------- | ------ |
| Revenue-to-EMI Ratio | 30%    |
| Loan-to-Revenue      | 25%    |
| Tenure Risk          | 20%    |
| PAN Validation       | 15%    |
| Industry Risk        | 10%    |

---

## Known Limitations

* No authentication (MVP only)
* Rule-based scoring (no ML model)
* Limited validation
* No automated tests

---

## Future Improvements

* JWT Authentication
* Machine Learning scoring model
* Integration with CIBIL/GST APIs
* Docker & CI/CD
* Cloud deployment (AWS/GCP)
* Admin dashboard & analytics

---

## Common Issues & Fixes

* **404 Error** → Check route order
* **Empty request body** → Set `Content-Type: application/json`
* **PAN validation error** → Ensure uppercase format
* **MongoDB disconnects** → Add retry logic

---

## Assumptions

* PAN is unique per business
* Revenue is self-declared
* Loan purpose not included in scoring
* Currency: INR (₹)

---

## Contribution

Contributions are welcome!

* Fork the repo
* Create a new branch
* Submit a PR

---

## License

This project is for educational purposes.

---

## Author

Developed as part of a MERN stack project for MSME loan decisioning.
