# ✈️ TravelEase Sri Lanka (TravelEaseLK)

TravelEase Sri Lanka is a premium, modern tour booking and travel management platform designed to provide tourists with curated Sri Lankan adventures. Built using C# (.NET Core Clean Architecture) and React/Next.js.

---

## 🏗️ Project Architecture

The project is split into a **Frontend** web app and a **Backend** REST API:

- **`/frontend`**: Next.js (App Router), React, TypeScript, Tailwind CSS, Zustand, and Framer Motion.
- **`/backend`**: ASP.NET Core Web API using Clean Architecture:
  - **`TravelEase.API`**: Presentation layer & Web API Controllers.
  - **`TravelEase.Application`**: Business logic, Services, Interfaces, and DTOs.
  - **`TravelEase.Infrastructure`**: Repository implementations, SQL Server DbContext, and security.
  - **`TravelEase.Domain`**: Core domain entities and models.
- **`/database`**: Database schema creation (`TravelEaseDB.sql`) and initial seed data (`seed-data.sql`).

---

## 🚀 Quick Start Guide

### 1. Database Setup
1. Open your **SQL Server Management Studio (SSMS)** or database tool.
2. Connect to your database server.
3. Run the schema creation script: [TravelEaseDB.sql](file:///c:/Users/ASUS/Videos/New%20folder/TravelEaseLK/database/TravelEaseDB.sql)
4. Run the seed data script: [seed-data.sql](file:///c:/Users/ASUS/Videos/New%20folder/TravelEaseLK/database/seed-data.sql)

### 2. Backend Setup
1. Configure your Connection String in [appsettings.json](file:///c:/Users/ASUS/Videos/New%20folder/TravelEaseLK/backend/TravelEase.API/appsettings.json) under `ConnectionStrings:DefaultConnection`.
2. Launch the backend:
   ```bash
   cd backend
   dotnet restore
   dotnet run --project TravelEase.API/TravelEase.API.csproj
   ```
   The backend API will run on `http://localhost:5000` (or `https://localhost:5001`).

### 3. Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the local Next.js development server:
   ```bash
   npm run dev
   ```
   The client application will run on `http://localhost:3000`.

---

## ✨ Features
- 🌅 **Package Browsing & Searching**: Explore curated Sri Lankan tours filtered by category (nature, beach, heritage, hills).
- 🛒 **Interactive Wishlist**: Add preferred packages to a local client-side wishlist.
- 💳 **Direct Reservation & Payment Verification**: Reserve dates and upload bank transaction receipts for verification.
- 👤 **Customer Dashboard**: Track reservation history, booking statuses, and upload payment slips.
- 🛡️ **Admin Panel**: Complete admin dashboard for managing packages, destinations, customer bookings, and blog posts.

---

## 🖥️ Website Overview & Structure

The web application is structured with intuitive navigation tailored for visitors, registered clients, and system administrators.

### 🌅 Client Portal (Public Pages)
- **Home (`/`)**: A landing page featuring sliding hero banners of iconic Sri Lankan spots (Sigiriya, Ella, Kandy), direct package searches, trending destinations, customer testimonials, and FAQs.
- **Packages (`/packages`, `/packages/[id]`)**: Comprehensive catalog of travel packages. Features search, categories (Beach, Cultural, Nature, Hills), dynamic pricing, details, and reservation capabilities.
- **Destinations (`/destinations`, `/destinations/[id]`)**: Highlighting locations in Sri Lanka with background summaries, history, and associated tour packages.
- **Blogs (`/blogs`, `/blogs/[id]`)**: Travel blogs, guides, and itineraries for tourists visiting Sri Lanka.
- **About (`/about`) & Contact (`/contact`)**: Information about TravelEase, team overview, custom tour requests, and contact forms.
- **Wishlist (`/wishlist`)**: Dynamic wishlist page showing curated and saved trips.

### 👤 Customer Dashboard (`/dashboard`)
- **My Bookings**: Customer workspace to view reservation history, check status updates (Pending, Verified, Active, Cancelled), and upload bank payment transaction slips.
- **Settings**: Simple profile settings to update contact details and preferences.

### 🛡️ Admin Dashboard (`/admin`)
- **Overview Dashboard (`/admin/dashboard`)**: Visual summary of total sales, booking counts, active customers, and recent slip uploads awaiting confirmation.
- **Packages Management (`/admin/packages`)**: View, edit, create, and delete travel packages (title, price, durations, image galleries, and categories).
- **Destinations Management (`/admin/destinations`)**: Add and customize destinations across Sri Lanka.
- **Bookings Verification (`/admin/bookings`)**: Centralized ledger to review bank receipts uploaded by customers, check payment validity, and confirm/update booking statuses.
- **Customer Directory (`/admin/customers`)**: Database view of registered users.
- **Blogs Manager (`/admin/blogs`)**: Full content management editor to write, publish, and delete travel blogs.
