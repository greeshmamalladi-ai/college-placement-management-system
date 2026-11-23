# College Placement & Application Management System

A web application under development to manage college placement activities, student authentication, and job postings.

## Technologies Used

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Authentication:** JWT, bcrypt

**Frontend:** React.js (planned)

## Features Implemented

- Student registration and login APIs.
- Password hashing using bcrypt.
- JWT-based authentication.
- Separate student and administrator authentication.
- Protected routes using authentication middleware.
- Role-based authorization.
- Job creation, retrieval, updating, and deletion APIs.
- MongoDB database integration using Mongoose.

## Project Structure

```text
CollegePlacementSystem/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
└── README.md
```

## Backend Setup

Clone the repository:

```bash
git clone https://github.com/greeshmamalladi-ai/college-placement-management-system.git
```

Navigate to the backend folder:

```bash
cd college-placement-management-system/backend
```

Install dependencies:

```bash
npm install
```

Configure your private `.env` file with the environment variables required by the application.

Start the server:

```bash
node server.js
```

## Project Status

**In Progress**

Backend development is underway. Frontend development and integration are planned.

## Developer

**Naga Greeshma Malladi**

GitHub: https://github.com/greeshmamalladi-ai