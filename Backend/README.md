# Team Task Management System - Backend

A comprehensive backend API for managing team tasks, built with **Express.js** and **MongoDB**.

## 📋 Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Running the Server](#running-the-server)
- [API Routes](#api-routes)
- [Authentication](#authentication)

## ✨ Features

- **User Authentication** - JWT-based secure authentication
- **Task Management** - Create, read, update, and delete tasks
- **Team Collaboration** - Manage team members and assignments
- **Password Security** - Bcrypt hashing for secure password storage
- **CORS Enabled** - Cross-origin resource sharing support
- **Database Integration** - MongoDB with Mongoose ODM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages:
   - express (5.2.1)
   - mongoose (9.3.3)
   - jsonwebtoken (9.0.3)
   - bcrypt (6.0.0)
   - cors (2.8.6)
   - dotenv (17.4.0)

## 🔧 Environment Variables

Create a `.env` file in the Backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/team_task_management
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/team_task_management

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=7d

# Other Configuration
CORS_ORIGIN=http://localhost:3000
```

## 📁 Project Structure

```
Backend/
├── config/              # Configuration files (database, env variables)
├── controllers/         # Route controllers (business logic)
├── models/             # MongoDB schemas (Mongoose models)
├── routes/             # API routes
├── middlewares/        # Custom middleware (auth, error handling)
├── services/           # Business logic services
├── utils/              # Utility functions and helpers
├── package.json        # Project dependencies
├── server.js           # Main server file
└── README.md           # This file
```

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | 5.2.1 | Web framework for building API |
| **mongoose** | 9.3.3 | MongoDB object modeling |
| **jsonwebtoken** | 9.0.3 | JWT token generation and verification |
| **bcrypt** | 6.0.0 | Password hashing and encryption |
| **cors** | 2.8.6 | Cross-Origin Resource Sharing |
| **dotenv** | 17.4.0 | Environment variable management |

## 🎯 Running the Server

To start the development server:

```bash
npm start
```

The server will run on `http://localhost:5000` (or the port specified in your `.env` file).

### Available Scripts

```bash
# Start the server
npm start

# Run tests (when configured)
npm test
```

## 🔌 API Routes

(Routes will be documented here as you create them)

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token
- `POST /api/auth/logout` - Logout user

### Task Routes
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Team Routes
- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create a team
- `PUT /api/teams/:id` - Update a team
- `DELETE /api/teams/:id` - Delete a team

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication:

1. Users register/login to get a JWT token
2. Token is sent in the `Authorization` header as: `Bearer <token>`
3. Middleware validates the token for protected routes
4. Tokens expire based on the `JWT_EXPIRY` configuration

### Example Protected Request

```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🛠️ Development

### Adding a New Route

1. Create a controller in `controllers/`
2. Create a model in `models/` (if needed)
3. Create a route file in `routes/`
4. Import and use the route in `server.js`

### Adding Middleware

Place custom middleware in `middlewares/` folder and use it in `server.js` or specific routes.

### Best Practices

- Use environment variables for sensitive data
- Implement proper error handling
- Validate user inputs
- Use meaningful commit messages
- Keep controllers lean, move logic to services

## 📝 Notes

- Make sure MongoDB is running before starting the server
- Use `.env.example` template to document required environment variables
- Check MongoDB connection logs for debugging
- Ensure JWT_SECRET is strong and secure

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## ✅ Checklist for Setup

- [ ] Node.js and npm installed
- [ ] MongoDB running (local or Atlas)
- [ ] `.env` file created with all required variables
- [ ] Dependencies installed (`npm install`)
- [ ] Server running successfully (`npm start`)
- [ ] API routes tested with Postman/Thunder Client

---

**Happy Coding! 🚀**
