# CS 458 Assignment 11 — Maintenance Management Full-Stack CRUD App

A full-stack web application with an **ASP.NET Core Web API** backend and a **React (Vite)** frontend. It provides full CRUD operations for **Work Logs** and **Invoices**.

---

## Project Structure

```
cs458-assignment11/
  MaintenanceAPI/          ← ASP.NET Core 8 Web API
  maintenance-frontend/    ← React 18 + Vite 5
  database_script.sql      ← SQL Server schema + seed data
  README.md
  .gitignore
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| .NET SDK | 8.0+ |
| SQL Server | 2019+ (or LocalDB / Express) |
| Node.js | 18+ |
| npm | 9+ |

---

## Database Setup

1. Open SQL Server Management Studio (SSMS) or `sqlcmd`.
2. Run `database_script.sql` to create the `MaintenanceDB` database and tables.

---

## Backend Setup (ASP.NET Core)

```bash
cd MaintenanceAPI
dotnet restore
dotnet run
```

The API will be available at `https://localhost:7239` (HTTPS) and `http://localhost:5000` (HTTP).

### Swagger UI

Navigate to `https://localhost:7239/swagger` to explore and test all endpoints interactively.

### Connection String

Edit `MaintenanceAPI/appsettings.json` to match your SQL Server instance:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=MaintenanceDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

### API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/worklogs` | List all work logs |
| GET | `/api/worklogs/{id}` | Get a work log by ID |
| POST | `/api/worklogs` | Create a new work log |
| PUT | `/api/worklogs/{id}` | Update a work log |
| DELETE | `/api/worklogs/{id}` | Delete a work log |
| GET | `/api/invoices` | List all invoices |
| GET | `/api/invoices/{id}` | Get an invoice by ID |
| POST | `/api/invoices` | Create a new invoice |
| PUT | `/api/invoices/{id}` | Update an invoice |
| DELETE | `/api/invoices/{id}` | Delete an invoice |

---

## Frontend Setup (React + Vite)

```bash
cd maintenance-frontend
npm install
npm run dev
```

The React app will be available at `http://localhost:5173`.

The Vite dev server proxies all `/api/*` requests to `https://localhost:7239`, so no browser HTTPS certificate errors occur.

---

## Features

- **Work Logs:** Create, view, edit, and delete maintenance work logs with clock-in/clock-out times, GPS location, proof photo URL, materials used, and vendor signature.
- **Invoices:** Create, view, edit, and delete invoices with project/schedule linkage, total amount, and export flag. Running total is displayed below the table.
- Form state resets correctly after save or cancel.
- All CRUD errors surface as browser alerts.
- Backend validates that `ClockOutTime > ClockInTime` on work logs.
- Backend handles EF Core concurrency exceptions on PUT operations (returns 404 if record was deleted concurrently).

---

## Notes

- `InvoiceDate` is always set server-side using `DateTime.UtcNow` to avoid timezone inconsistencies.
- CORS is configured to allow requests from `http://localhost:5173` (Vite dev server).
- For production deployment, update the CORS policy and connection string accordingly.
