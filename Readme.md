# DataDropX Backend - Mini Employee Directory API

This project is a clean Node.js + Express + TypeScript backend for managing employees and departments.
It is designed for a MERN mini project and supports validation, filtering, search, sorting, pagination, and centralized error handling.

## ER Diagram

![ER Diagram](image-1.png)

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (request validation)

## Project Features

- Employee CRUD API
- Department CRUD API (create, list, get single, delete)
- Query support: filter, search, sort, field selection, date filter, pagination
- Global error handling with human-readable messages
- Structured API response format
- Environment-based configuration

## Environment Variables

Create a .env file in the project root with:

- PORT=5000
- DB_URL=your_mongodb_connection_string
- NODE_ENV=development
- FRONTEND_URL=http://localhost:3000

## Installation Steps

1. Clone the repository

- git clone <your-repository-url>

2. Go to the project folder

- cd DATADROPX-BACKEND

3. Check Node.js version (recommended Node 18+)

- node -v

4. Install dependencies

- npm install

5. Create .env file in the root directory

- Add PORT, DB_URL, NODE_ENV, FRONTEND_URL values

6. Start the development server

- npm run dev

7. Build and run production mode (optional)

- npm run build
- npm start

## Run Locally

1. Install dependencies

- npm install

2. Run development server

- npm run dev

3. Build for production

- npm run build

4. Start production build

- npm start

## Base URL

- Local: http://localhost:5000
- API Prefix: /api

## Postman API Documentation

Below are all available endpoints, payloads, and usage examples.

---

## Department Endpoints

### 1) Create Department

- Method: POST
- URL: http://localhost:5000/api/department

Payload:

{
"name": "Human Resources",
"description": "Handles hiring and employee relations"
}

Notes:

- name is required
- description is optional

### 2) Get All Departments

- Method: GET
- URL: http://localhost:5000/api/department

Supported query parameters:

- searchTerm
- sort
- fields
- page
- limit
- dateSearch
- direct filters such as name

Examples:

- http://localhost:5000/api/department?searchTerm=human
- http://localhost:5000/api/department?sort=-createdAt&page=1&limit=10
- http://localhost:5000/api/department?fields=name,description
- http://localhost:5000/api/department?dateSearch=2026-03-30

### 3) Get Single Department

- Method: GET
- URL: http://localhost:5000/api/department/:id

Example:

- http://localhost:5000/api/department/67e8b6e4a6b1cc0c3a72f001

### 4) Delete Department

- Method: DELETE
- URL: http://localhost:5000/api/department/:id

---

## Employee Endpoints

### 1) Create Employee

- Method: POST
- URL: http://localhost:5000/api/employees

Payload:

{
"name": "Rahim Uddin",
"email": "rahim@example.com",
"position": "Frontend Developer",
"department": "Engineering"
}

Notes:

- all fields are required while creating
- email must be a valid email format

### 2) Get All Employees

- Method: GET
- URL: http://localhost:5000/api/employees

Supported query parameters:

- searchTerm
- sort
- fields
- page
- limit
- dateSearch
- filters by any model field (most important: department)

Filter by department examples:

- http://localhost:5000/api/employees?department=Engineering
- http://localhost:5000/api/employees?department=HR

More examples:

- http://localhost:5000/api/employees?searchTerm=rahim
- http://localhost:5000/api/employees?position=Manager
- http://localhost:5000/api/employees?department=Engineering&sort=-createdAt&page=1&limit=10
- http://localhost:5000/api/employees?fields=name,email,department
- http://localhost:5000/api/employees?dateSearch=2026-03-30

### 3) Get Single Employee

- Method: GET
- URL: http://localhost:5000/api/employees/:id

### 4) Update Employee

- Method: PUT
- URL: http://localhost:5000/api/employees/:id

Payload (all optional for update):

{
"name": "Rahim Hasan",
"position": "Senior Frontend Developer",
"department": "Product Engineering"
}

### 5) Delete Employee

- Method: DELETE
- URL: http://localhost:5000/api/employees/:id

---

## Standard Response Style

Every successful endpoint returns a consistent structure:

- statusCode
- success
- message
- meta (for list endpoints)
- data

Example list response behavior:

- data contains array results
- meta contains page, limit, total, totalPage

## Validation Rules (Zod)

### Department Validation

- name: required, min 2, max 60
- description: optional, max 500

### Employee Validation

- name: required on create, min 2, max 80
- email: required on create, must be valid
- position: required on create, min 2, max 80
- department: required on create, min 2, max 80
- for update endpoint, all fields are optional

## Query System (How Filtering Works)

The query pipeline is reusable and lives in QueryBuilder.

Execution order:

1. filter()
2. search()
3. sort()
4. fields()
5. dateSearch()
6. paginate()

What each part does:

- filter: applies direct field filters from query params, for example department=HR
- search: fuzzy text search across predefined searchable fields
- sort: custom order, default is newest first by createdAt
- fields: select only required fields in response
- dateSearch: filter records created on a specific date
- paginate: page and limit support

## Config, Utils, Error Helpers, Helpers, Middlewares (In Brief but Deep)

### Config

Environment config loads and validates required env variables at startup.
If any required variable is missing, app throws immediately so configuration mistakes are caught early.

### Utils

1. catchAsync

- Wraps async controllers
- Automatically forwards errors to global error handler
- Removes repeated try-catch blocks

2. sendResponse

- Sends all API responses in a consistent format
- Keeps controller code clean and predictable

3. QueryBuilder

- Reusable query utility for list endpoints
- Supports filter, search, sort, fields, dateSearch, pagination
- Also provides meta information for frontend table/grid pages

### Error Helper

1. AppError

- Custom error class with statusCode + message
- Used for business logic errors like not found

### Helper Functions

1. handleDuplicateError

- Handles Mongo duplicate key errors (for example unique email)

2. handleCastError

- Handles invalid Mongo ObjectId format errors

3. handleValidationError

- Converts Mongoose validation errors into readable field-based messages

4. handleZodError

- Converts request validation errors into clear API error response format

### Middlewares

1. validateRequest

- Validates request body using Zod schema
- Stops invalid requests before they reach service logic

2. globalErrorHandler

- Central place for all error responses
- Detects error type and returns user-friendly message
- Shows detailed stack in development only

3. notFound

- Handles unknown routes with a clean 404 response

## Health Check

Root endpoint:

- GET http://localhost:5000/

Returns welcome message confirming API server is running.
