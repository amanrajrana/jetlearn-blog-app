# Backend Project

## Description

This project is a robust backend service designed to support modern applications. It provides scalable, efficient, and easy-to-integrate solutions for handling user management, API operations, and serverless workflows. With a strong focus on performance and modularity, this project is ideal for building reliable backend systems.

### API Documentation

Access the API documentation in Postman:
[Postman Collection](https://www.postman.com/red-moon-996043/workspace/jetlearn/)

## Features

- **User Management**: Authentication and authorization for secure user interactions.
- **RESTful API Endpoints**: Seamless integration with frontend applications.
- **Database Operations**: Efficient data handling using MySQL.
- **Serverless Functions**: Leverage AWS Lambda for scalable serverless features.
- **Environment Configuration**: Easy setup with environment variables.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable server applications.
- **Express.js**: Minimal and flexible web application framework.
- **MySQL**: Relational database for structured data management.
- **mysql2**: MySQL client for Node.js with support for promises.
- **Serverless Framework**: Simplifies deploying serverless applications.
- **TypeScript**: Ensures type safety and improves code maintainability.

## Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)
- **MySQL** (local or cloud instance)
- **AWS CLI** (if deploying serverless functions) _(optional)_

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/amanrajrana/jetlearn-blog-app.git
cd jetlearn-blog-app/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the example `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with the appropriate values:
   ```plaintext
   PORT = 5000
   NODE_ENV = "development"

   JWT_SECRET = # Your secret key here

   # MySQL Database Configuration
   DB_HOST = # Database host
   DB_PORT = 3306 # Default MySQL port, or customize as needed
   DB_USER = # Database username
   DB_PASSWORD = # Database password
   DB_NAME = # Database name
   ```

## Usage

### Running the Application Locally

#### 1. Start the Development Server
```bash
npm run dev
```

#### 2. Run Serverless Functions Locally
```bash
npm run start:serverless
```

### API Documentation

Access the API documentation in Postman:
[Postman Collection](https://www.postman.com/red-moon-996043/workspace/jetlearn/)

## Deployment

### Deploying Serverless Functions

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy using the Serverless Framework:
   ```bash
   serverless deploy
   ```

3. Access the deployed endpoints and Lambda functions at the provided URLs.

## Authors
**_Aman Raj Rana_**

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amanrajrana)
[![github](https://img.shields.io/badge/github-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amanrajrana)