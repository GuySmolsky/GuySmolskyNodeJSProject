Business Card Server API
A Node.js REST API server for managing digital business cards with user authentication and cloud database support.
🚀 Features

User Authentication

User registration and login
JWT-based authentication system
Business and regular user roles
Admin user capabilities

Business Card Management

CRUD operations for business cards
Multiple cards per user support
Duplicate emails allowed for cards
User-specific card access control

Database Support

Local MongoDB for development
MongoDB Atlas for production
Environment-based database switching

🛠️ Tech Stack

Runtime: Node.js
Framework: Express.js
Database: MongoDB / MongoDB Atlas
Authentication: JWT (JSON Web Tokens)
Validation:

Joi for request validation
Mongoose for database schema validation

Environment: dotenv

📋 Prerequisites

Node.js (v14 or higher)
MongoDB (for local development)
MongoDB Atlas account (for production deployment)
