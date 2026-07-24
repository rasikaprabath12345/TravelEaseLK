# TravelEase Sri Lanka

A comprehensive travel and tour booking platform designed to simplify holiday planning in Sri Lanka. The system includes a public-facing booking portal, a customer dashboard for managing reservations, and a dedicated admin panel for back-office management. Built using a decoupled architecture with a modern frontend and a robust backend.

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 
- **Animations:** Framer Motion
- **State Management:** Zustand, React Query
- **Form Handling & Validation:** React Hook Form, Zod

### Backend
- **Framework:** ASP.NET Core (.NET 8.0)
- **Architecture:** Clean Architecture (Domain, Application, Infrastructure, API Layers)
- **Language:** C#
- **ORM:** Entity Framework Core
- **Database:** Microsoft SQL Server
- **Security:** JWT Bearer Authentication, BCrypt

## ✨ Key Features

- **Dynamic Landing Page:** Features interactive hero sliders, popular destinations, and client stories.
- **Tour Packages:** Browse curated travel itineraries across Sri Lanka with real-time reservation options.
- **Destinations & Blogs:** Informational sections highlighting top travel zones, local history, and travel guides.
- **Customer Dashboard:** A secure workspace for users to view active bookings, upload payment receipts, and manage accounts.
- **Admin Control Panel:** A secure dashboard to review and verify bookings, manage packages, publish blogs, and oversee registered users.

## 🔄 System Overview

TravelEase operates on a strictly decoupled client-server model designed for scalability and maintainability:

1. **Client-Side (Frontend):** The Next.js application serves as the user interface, handling routing, rendering, and state management. Zustand and React Query manage global state and asynchronous data fetching, ensuring a responsive user experience.
2. **Server-Side (Backend):** The ASP.NET Core API acts as the central brain of the platform. It strictly follows **Clean Architecture**, separating the Domain (core logic), Application (use cases), Infrastructure (data access), and API (presentation) layers. This ensures the business logic remains independent of UI or database frameworks.
3. **Data Flow:** Users interact with the Next.js frontend, which sends secure, JWT-authenticated REST requests to the .NET API. The API processes these requests through the Application layer, interacts with the SQL Server database via Entity Framework Core, and returns JSON responses back to the frontend.

## 🏗 Architecture Overview

```text
+-------------------+       REST API          +--------------------+
|                   |       (JSON)            |                    |
|   Frontend App    | <=====================> |    Backend API     |
|  (Next.js/React)  |                         |   (ASP.NET Core)   |
|                   |                         |                    |
+--------+----------+                         +---------+----------+
         |                                              |
         | State (Zustand)                              | Clean Arch.
         | Auth (JWT)                                   | EF Core
         v                                              v
+-------------------+                         +--------------------+
|                   |                         |                    |
|  Browser Storage  |                         |    SQL Server      |
| (Local/Cookies)   |                         |    (Database)      |
|                   |                         |                    |
+-------------------+                         +--------------------+
```

## 📂 Repository Structure

```text
TravelEaseLK/
├── backend/                        # ASP.NET Core Web API
│   ├── TravelEase.API/             # Controllers and API entry point
│   ├── TravelEase.Application/     # Business logic, Interfaces, DTOs
│   ├── TravelEase.Domain/          # Core entities and exceptions
│   └── TravelEase.Infrastructure/  # Database context, EF Core migrations
│
├── frontend/                       # Next.js Application
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   ├── components/             # Reusable UI components
│   │   ├── store/                  # Zustand state management
│   │   └── lib/                    # Utilities and Axios configurations
│   └── package.json                # Node dependencies
│
└── README.md                       # Project Documentation
```

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### 1. Backend Setup (.NET API)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Update the connection string in `TravelEase.API/appsettings.json` to point to your local SQL Server instance.
3. Apply Entity Framework migrations to create the database:
   ```bash
   dotnet ef database update --project TravelEase.Infrastructure --startup-project TravelEase.API
   ```
4. Run the API server:
   ```bash
   dotnet run --project TravelEase.API
   ```
   *The API will start at `http://localhost:5000` (or as configured).*

### 2. Frontend Setup (Next.js)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (e.g., API base URL) in a `.env.local` file.
4. Run the development server:
   ```bash
   npm run dev
   ```
   *The web application will be accessible at `http://localhost:3000`.*

---
*Developed for internship demonstration. Built focusing on Clean Architecture principles, scalable frontend state management, and modern best practices.*
