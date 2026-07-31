# 💰 Smart Expense Tracker API

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey)
![Vitest](https://img.shields.io/badge/Tested%20With-Vitest-6E9F18)
![OpenAPI](https://img.shields.io/badge/API-OpenAPI%203.0-success)

A production-ready RESTful API for managing personal expenses, built with **Node.js**, **Express**, and **TypeScript**. The application follows a layered architecture, validates incoming requests using **Zod**, stores data in a JSON file, and includes comprehensive integration tests and interactive API documentation with **OpenAPI (Swagger)**.

---

# 📖 Project Overview

This project was developed as part of the **Diligent Software Engineering Apprenticeship 2026 Take-Home Assignment**.

The goal was to design and implement a clean, maintainable REST API while demonstrating software engineering best practices, including layered architecture, request validation, centralized error handling, automated testing, and API documentation.

---

# ✨ Features

- Create a new expense
- View all expenses
- Filter expenses by category
- Calculate total expenses
- Calculate category-wise totals
- Delete an expense
- Request validation using Zod
- Centralized error handling
- Interactive OpenAPI (Swagger) documentation
- **11 integration tests** using Vitest & Supertest
- Environment-specific configuration for development and testing

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Validation | Zod |
| Testing | Vitest, Supertest |
| API Documentation | Swagger (OpenAPI) |
| Storage | JSON File |

---

# 📂 Project Structure

```text
src/
├── config/
├── constants/
├── controllers/
├── data/
├── docs/
├── errors/
├── middlewares/
├── repositories/
├── routes/
├── schemas/
├── services/
├── types/
├── utils/
├── app.ts
└── server.ts

tests/
├── data/
├── expense.test.ts
└── setup.ts
```

---

# 🏗️ Architecture

The application follows a **layered architecture**, where each layer has a single responsibility. This improves maintainability, testability, and separation of concerns.

```text
Client
   │
   ▼
Routes
   │
   ▼
Validation Middleware
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
JSON Storage
```

### Layer Responsibilities

- **Routes** → Define API endpoints
- **Validation Middleware** → Validate incoming requests
- **Controllers** → Handle HTTP requests and responses
- **Services** → Implement business logic
- **Repositories** → Manage data persistence

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/bhaveshdesale/diligent-smart-expense-tracker-api.git

cd diligent-expense-tracker-api
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
DATA_FILE=src/data/expenses.json
```

---

## 4. Start the Development Server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

# 📜 Available Scripts

```bash
npm run dev             # Start development server
npm run build           # Build the TypeScript project
npm start               # Run the production build
npm test                # Execute integration tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate test coverage report
```

---

# 📚 API Documentation

After starting the application, interactive API documentation is available at:

```text
http://localhost:3000/api-docs
```

Using Swagger UI, you can:

- Explore all endpoints
- Execute API requests directly from the browser
- View request and response schemas
- Test the API without additional tools

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/expenses` | Create a new expense |
| GET | `/api/v1/expenses` | Retrieve all expenses |
| GET | `/api/v1/expenses?category=Food` | Filter expenses by category |
| GET | `/api/v1/expenses/total` | Calculate total expenses |
| GET | `/api/v1/expenses/total?category=Food` | Calculate category-wise total |
| DELETE | `/api/v1/expenses/:id` | Delete an expense |
| GET | `/api/v1/health` | Health check |

---

# 📝 Example Request

### Create Expense

**POST** `/api/v1/expenses`

```json
{
  "title": "Pizza",
  "amount": 250,
  "category": "Food",
  "date": "2026-07-31"
}
```

### Example Response

```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Pizza",
    "amount": 250,
    "category": "Food",
    "date": "2026-07-31"
  }
}
```

---

# 🧪 Testing

The project includes **11 integration tests** covering:

- Expense creation
- Request validation
- Fetching expenses
- Category filtering
- Total calculations
- Expense deletion
- Health endpoint

Run the test suite:

```bash
npm test
```

Generate a coverage report:

```bash
npm run test:coverage
```

---

# 💡 Design Decisions

Some key architectural decisions made during development:

- Layered architecture for maintainability and scalability
- Repository pattern to isolate persistence logic
- Zod for runtime validation and type safety
- Centralized error handling using custom error classes
- Environment-specific configuration for development and testing
- Interactive OpenAPI (Swagger) documentation
- Comprehensive integration testing using Vitest and Supertest

---

# 🔮 Future Improvements

- Replace JSON-based storage with PostgreSQL using Prisma ORM
- Add JWT-based authentication and authorization
- Implement pagination, sorting, and advanced filtering
- Add expense update functionality
- Introduce structured logging using Pino
- Containerize the application with Docker
- Configure CI/CD using GitHub Actions

---

# 👨‍💻 Author

**Bhavesh Desale**

- GitHub: https://github.com/bhaveshdesale

---

## 📄 License

This project is licensed under the MIT License.