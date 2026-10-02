# Employee Management API

REST API built with Node.js, Express, TypeScript and MongoDB (Mongoose).

## Setup
```bash
npm install
cp .env.example .env    # then set MONGO_URI
npm run dev             # development
npm run build && npm start   # production
```

## Environment variables
| Key | Description |
|---|---|
| PORT | Server port (default 5000) |
| MONGO_URI | MongoDB connection string |

## Employee fields
| Field | Type | Rules |
|---|---|---|
| name | string | required |
| email | string | required, valid, unique |
| phone | string | required |
| department | string | required |
| position | string | required |
| status | string | `ACTIVE` or `INACTIVE` (default `ACTIVE`) |

## Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/employees | Get all employees |
| GET | /api/employees/:id | Get one employee |
| POST | /api/employees | Create employee |
| PUT/PATCH | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |

## Example
`POST /api/employees`
```json
{ "name": "Kasun Perera", "email": "kasun@example.com", "phone": "0771234567",
  "department": "IT", "position": "Software Engineer", "status": "ACTIVE" }
```
Response `201`:
```json
{ "success": true, "message": "Employee created successfully",
  "data": { "id": "...", "name": "Kasun Perera", "email": "kasun@example.com",
            "phone": "0771234567", "department": "IT",
            "position": "Software Engineer", "status": "ACTIVE" } }
```
Error format:
```json
{ "success": false, "message": "Validation failed", "errors": ["name is required"] }
```

## Status codes
200 OK, 201 Created, 400 Bad Request (validation / invalid ID), 404 Not Found, 500 Server Error.

## Structure
`routes -> middleware (validation) -> controllers -> services -> models (MongoDB)`
