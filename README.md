Secure API Project

A simple security-focused Node.js + Express + PostgreSQL API created with help from GitHub Copilot.

1. Features

JWT Authentication

Role-Based Access Control (RBAC)

Input Validation (Joi)

SQL Injection Prevention (Parameterized Queries)

XSS Protection (Sanitization + Helmet)

Rate Limiting

Basic Security Tests (SQLi + XSS)

2. Setup
npm install
cp .env.example .env   # add your credentials
npm run dev

3. Database

Run db.sql to create required tables.

4. Tests
npm test

5. Endpoints

POST /auth/register

POST /auth/login

GET /users (admin)

GET /users/:id (admin/user)

6. Copilot Help

Copilot assisted in creating route templates, validation, and security test scaffolding.
