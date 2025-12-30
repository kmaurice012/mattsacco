# MataSacco Manager - MVP Demo Guide

## Overview

MataSacco Manager is a comprehensive fleet management system designed for SACCO (Savings and Credit Cooperative) organizations in Kenya. The platform helps manage vehicles, trips, fare collection, maintenance, and remittances.

## Quick Start

1. **Start the application:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

2. **Database is pre-seeded with demo data**
   - The database was seeded using `npm run seed` 
   - All users below are already created with password: `password`

---

## User Roles & Demo Accounts

### 1. **Super Admin**
- **Email:** `superadmin@example.com`
- **Password:** `password`
- **Access:** Platform-wide oversight, SACCO management
- **Dashboard:** `/superadmin/dashboard`

**Demo Features to Show:**
- View all SACCOs and their stats
- Create new SACCOs
- Monitor platform-wide revenue and metrics
- Manage SACCO accounts and subscriptions

### 2. **SACCO Admin**
- **Email:** `admin@nairobimetro.com`
- **Password:** `password`
- **Access:** SACCO-level management
- **Dashboard:** `/admin/dashboard`

**Demo Features to Show:**
- View SACCO-specific vehicles and drivers
- Monitor total revenue and vehicle performance
- Manage staff (drivers, conductors, owners)
- View fare collection and maintenance records

### 3. **Vehicle Owner**
- **Email:** `owner1@sacco/2024/001.com`
- **Password:** `password`
- **Access:** View owned vehicles and revenue
- **Dashboard:** `/owner/dashboard`

**Demo Features to Show:**
- Monitor personal vehicles and their performance
- View trip history and fare collections
- Check maintenance schedules
- Track remittances and payouts

### 4. **Driver/Conductor**
- **Email:** `driver1@sacco/2024/001.com`
- **Password:** `password`
- **Access:** Personal trip and fare tracking
- **Dashboard:** `/driver/dashboard`

**Demo Features to Show:**
- View trip history
- Check fare collections
- Monitor performance metrics
- Track remittances

---

## Demo Flow (10-15 minutes)

### Step 1: Login & Role-Based Navigation (2 min)
1. Go to `http://localhost:3000/login`
2. Show that users are redirected to different dashboards based on their role:
   - Superadmin → `/superadmin/dashboard`
   - Admin → `/admin/dashboard`
   - Owner → `/owner/dashboard`
   - Driver → `/driver/dashboard`

**Key Feature:** Role-based redirect system automatically routes users to their appropriate dashboard

### Step 2: Super Admin Dashboard (3 min)
Login as superadmin@example.com

**Show:**
1. Platform statistics:
   - Total SACCOs (3 demo SACCOs)
   - Active vehicles
   - Total revenue
   - Platform trends

2. Click "Create New SACCO" button
   - Show form to onboard new SACCO organizations

3. SACCO list with status indicators

**Talking Points:**
- Centralized platform for managing multiple SACCOs
- Real-time visibility into all operations
- Easy onboarding of new organizations

### Step 3: SACCO Admin Dashboard (3 min)
Login as admin@nairobimetro.com

**Show:**
1. SACCO-specific metrics:
   - Total vehicles managed
   - Revenue overview
   - Driver count
   - Average revenue per vehicle

2. Quick action buttons:
   - Manage Vehicles
   - Manage Staff
   - Fare Collection
   - Remittances

3. Recent vehicles list with status

**Talking Points:**
- Dedicated dashboard for SACCO administrators
- Comprehensive vehicle fleet overview
- Easy access to all critical functions

### Step 4: Vehicle Owner Dashboard (2 min)
Login as owner1@sacco/2024/001.com

**Show:**
1. Personal fleet metrics
   - Number of vehicles owned
   - Total revenue from all vehicles
   - Trip statistics
   - Revenue per vehicle

2. My Vehicles section
   - List of owned vehicles with status
   - Vehicle details (registration, make, model, route)

**Talking Points:**
- Owners can monitor their investment returns
- Clear visibility into vehicle performance
- Track revenue streams

### Step 5: Driver Dashboard (2 min)
Login as driver1@sacco/2024/001.com

**Show:**
1. Performance metrics:
   - Total trips made
   - Total passengers transported
   - Total fares collected
   - Average fare per trip

2. Recent Trips:
   - Trip details with dates
   - Passenger counts
   - Fare amounts
   - Payment methods (MPesa/Cash)

**Talking Points:**
- Drivers have visibility into their performance
- Encourages accountability and transparency
- Easy tracking of personal earnings

---

## Key Features to Highlight

### 1. **Role-Based Access Control**
- Middleware automatically protects routes
- Users can only access data relevant to their role
- Clear separation of concerns

### 2. **Real-Time Dashboards**
- Dashboards pull live data from MongoDB
- Dynamic calculation of statistics
- Responsive design for desktop and mobile

### 3. **Seed Data**
- Pre-populated with 3 realistic SACCOs
- 5 vehicles per SACCO with owner and driver assignments
- 30 days of trip and fuel records
- Realistic revenue and maintenance data

### 4. **Authentication**
- NextAuth.js with credentials provider
- Secure password hashing with bcryptjs
- JWT-based sessions
- Automatic login redirect to role-specific dashboard

### 5. **Data Model**
- Hierarchical: SACCO → Vehicles → Trips → Revenue
- Full audit trails with AuditLog model
- Relationship management (owners, drivers, conductors)

---

## Navigation & UI Flow

### Main Entry Points
- **Login:** `http://localhost:3000/login`
- **Home/Redirect:** `http://localhost:3000/` (redirects to appropriate dashboard)

### Role-Specific Routes
- **Superadmin:** `/superadmin/*`
- **Admin:** `/admin/*`
- **Owner:** `/owner/*`
- **Driver:** `/driver/*`

### Public Pages
- **Login:** `/login`
- **Unauthorized:** `/unauthorized`

---

## Demo Data Summary

### SACCOs
1. **Nairobi Metro SACCO** - 10% commission rate
2. **Thika Road SACCO** - 12% commission rate
3. **Mombasa Express SACCO** - 11% commission rate

### Vehicles per SACCO
- 5 vehicles each
- Mix of makes (Nissan, Toyota, Isuzu)
- Various routes in Kenya
- Active status with insurance/inspection dates

### Trip Data
- 30 days of history
- 3-6 trips per vehicle per day
- Realistic passenger counts (10-15)
- Fare range: KES 3,000-7,000 per trip

### Revenue Details
- Fuel costs tracked
- Maintenance records
- SACCO commission calculations
- Driver wages deductions
- Net remittance calculations

---

## Technical Highlights

### Technology Stack
- **Frontend:** Next.js 16, React 19, TypeScript
- **Backend:** Next.js API Routes
- **Database:** MongoDB (Atlas)
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **UI Components:** Custom React components

### Key Components
- `AuthenticatedLayout` - Consistent layout with sidebar and header
- `StatCard` - Display metrics
- `Card` - Content containers
- `Button` - Action buttons
- Role-based session handling

### API Endpoints
- `POST /api/auth/callback/credentials` - Login
- `GET /api/auth/session` - Get current session
- `GET /api/superadmin/stats` - Super admin statistics
- `GET /api/stats` - Admin statistics
- `GET /api/vehicles` - Vehicle listings
- `GET /api/trips` - Trip records
- `GET/POST /api/saccos` - SACCO management

---

## Troubleshooting

### If Login Fails
1. Check that database is connected
2. Verify `.env.local` has valid `MONGODB_URI`
3. Check that seed script was run: `npm run seed`
4. Check server console logs for detailed errors

### If Dashboards Show "Loading..."
1. Check browser console for API errors
2. Verify API endpoints are returning data
3. Check network tab in DevTools
4. Review server logs for backend errors

### If Styles Look Wrong
1. Ensure Tailwind CSS is compiled (`npm run dev`)
2. Clear Next.js cache: `rm -rf .next`
3. Restart dev server

---

## Demo Talking Points

1. **Unified Management Platform**
   - All stakeholders in one system
   - Real-time visibility into operations
   - Automated data collection from trips

2. **Accountability & Transparency**
   - Each role sees their relevant metrics
   - Clear audit trails
   - Performance tracking for drivers

3. **Revenue Management**
   - Automatic commission calculations
   - Remittance tracking
   - Fuel and maintenance cost tracking

4. **Scalability**
   - Designed to support multiple SACCOs
   - Grows with the organization
   - Professional-grade backend (MongoDB + NextAuth)

5. **User Experience**
   - Intuitive role-based navigation
   - Clean, modern UI
   - Mobile-responsive design

---

## Next Steps (Post-MVP)

- Add real-time GPS tracking for vehicles
- Implement payment integration for remittances
- Add detailed reporting and analytics
- Mobile app for drivers
- SMS notifications for alerts
- Advanced scheduling and route optimization

---

## Files to Review Before Demo

- [src/app/page.tsx](src/app/page.tsx) - Home redirect logic
- [src/app/login/page.tsx](src/app/login/page.tsx) - Login flow with role-based redirect
- [src/app/admin/dashboard/page.tsx](src/app/admin/dashboard/page.tsx) - Admin dashboard
- [src/app/owner/dashboard/page.tsx](src/app/owner/dashboard/page.tsx) - Owner dashboard
- [src/app/driver/dashboard/page.tsx](src/app/driver/dashboard/page.tsx) - Driver dashboard
- [src/app/superadmin/dashboard/page.tsx](src/app/superadmin/dashboard/page.tsx) - Superadmin dashboard
- [src/middleware.ts](src/middleware.ts) - Route protection and role checks

---

## Demo Success Criteria

✅ Can login with all 4 role types
✅ Redirected to correct dashboard per role
✅ Dashboards load with live data
✅ Statistics calculate correctly
✅ No console errors
✅ UI is clean and professional-looking
✅ Navigation between pages works smoothly
✅ Can describe the data model and flow

---

**Good luck with your demo!** 🚀
