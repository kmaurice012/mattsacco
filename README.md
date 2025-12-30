# MataSacco Manager - Multi-Tenant Matatu SACCO Management System

A comprehensive full-stack web application for managing multiple Matatu (public transport) SACCOs in Kenya. The system handles fare collection, expense tracking, automated remittance calculations, and provides platform-wide analytics for SACCO management.

## Features

### Multi-Tenant Architecture
- **Platform-Level Management**: One system serving multiple SACCOs
- **Data Isolation**: Complete separation of SACCO data with role-based access control
- **Hierarchical Roles**: Super Admin → SACCO Admin → Owners → Drivers/Conductors

### Super Admin Module
- **SACCO Management**: Create, configure, suspend, and manage multiple SACCOs
- **Platform Dashboard**: System-wide analytics and metrics
- **User Oversight**: Manage all users across all SACCOs
- **Audit Logs**: Comprehensive activity tracking and compliance
- **System Configuration**: Global settings and commission rates

### SACCO Admin Features
- **Fleet Management**: Add/remove vehicles, assign drivers
- **Dashboard**: SACCO-specific analytics and performance metrics
- **Financial Reports**: Revenue, expenses, and profitability tracking
- **Remittance Approval**: Review and approve owner payments
- **User Management**: Manage drivers, conductors, and vehicle owners

### Fare Collection & Trip Management
- **Trip Recording**: Route, passengers, fare amount, payment method
- **Multiple Payment Methods**: Cash, M-PESA, other digital payments
- **Daily Summaries**: Total trips, passengers, revenue breakdowns
- **Real-time Tracking**: Monitor collections across all vehicles

### Expense Tracking
- **Fuel Management**: Track purchases, consumption, efficiency (Ksh/km)
- **Maintenance Records**: Scheduled service, repairs, breakdowns
- **Receipt Management**: Upload and store receipt photos
- **Cost Analytics**: Vehicle-specific expense analysis

### Automated Remittance System
- **Smart Calculations**: Gross collections - (fuel + maintenance + commission + wages) = net remittance
- **Flexible Schedules**: Daily, weekly, or monthly remittances
- **Payment Tracking**: Pending, completed, failed status
- **M-PESA Integration Ready**: Placeholder for payment gateway

### Role-Based Dashboards
- **Super Admin**: Platform overview, all SACCOs, system health
- **SACCO Admin**: Fleet performance, financial summaries
- **Vehicle Owner**: Earnings, expenses, profit trends
- **Driver/Conductor**: Daily trips, performance metrics

## Technology Stack

- **Frontend**: Next.js 14+ with App Router, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with JWT and bcrypt
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Charts**: Recharts (ready for Phase 2)

## Project Structure

```
matasacco-manager/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes
│   │   │   ├── auth/              # Authentication
│   │   │   ├── saccos/            # SACCO CRUD
│   │   │   ├── superadmin/        # Super admin endpoints
│   │   │   ├── vehicles/          # Vehicle management
│   │   │   ├── trips/             # Trip recording
│   │   │   └── users/             # User management
│   │   ├── superadmin/            # Super admin pages
│   │   │   ├── dashboard/         # Platform dashboard
│   │   │   ├── saccos/            # SACCO management
│   │   │   └── users/             # User management
│   │   ├── admin/                 # SACCO admin pages
│   │   ├── owner/                 # Owner pages
│   │   ├── driver/                # Driver pages
│   │   ├── login/                 # Login page
│   │   └── unauthorized/          # Access denied page
│   ├── components/
│   │   ├── layout/                # Layout components
│   │   └── ui/                    # Reusable UI components
│   ├── lib/
│   │   ├── mongodb.ts            # Database connection
│   │   ├── auth.ts               # Auth utilities
│   │   ├── tenancy.ts            # Multi-tenant helpers
│   │   └── audit.ts              # Audit logging
│   ├── models/                    # Mongoose models
│   │   ├── User.ts
│   │   ├── Sacco.ts
│   │   ├── Vehicle.ts
│   │   ├── Trip.ts
│   │   ├── FuelRecord.ts
│   │   ├── MaintenanceRecord.ts
│   │   ├── Remittance.ts
│   │   ├── SaccoSettings.ts
│   │   ├── AuditLog.ts
│   │   └── SystemSettings.ts
│   ├── types/                     # TypeScript definitions
│   └── middleware.ts              # Route protection
├── scripts/
│   └── seed.ts                    # Database seeding script
└── .env.local                     # Environment variables

```

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Clone the repository**
```bash
cd matasacco-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/matasacco?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# App Configuration
NODE_ENV=development
```

4. **Seed the database** (creates sample data for 3 SACCOs)
```bash
npm run seed
```

This will create:
- 1 Super Admin
- 3 SACCOs (Nairobi Metro, Thika Road, Mombasa Express)
- 3 SACCO Admins (one per SACCO)
- 15 Vehicles (5 per SACCO)
- Multiple owners, drivers, and conductors
- 100+ trip records
- 50+ fuel records
- 20+ maintenance records
- 15+ remittances
- 50+ audit log entries

5. **Run the development server**
```bash
npm run dev
```

6. **Open the application**

Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

After running the seed script, use these credentials to log in:

### Super Admin (Full Platform Access)
- **Email**: superadmin@example.com
- **Password**: password

### SACCO Admins
- **Nairobi Metro SACCO**
  - Email: admin@nairobimetro.com
  - Password: password

- **Thika Road SACCO**
  - Email: admin@thikaroad.com
  - Password: password

- **Mombasa Express SACCO**
  - Email: admin@mombasaexpress.com
  - Password: password

## User Roles & Permissions

### Super Admin
- ✅ Create and manage all SACCOs
- ✅ View platform-wide analytics
- ✅ Access all SACCO data
- ✅ Manage all users
- ✅ View comprehensive audit logs
- ✅ Configure global settings

### SACCO Admin
- ✅ Manage their SACCO's vehicles and users
- ✅ View SACCO-specific reports
- ✅ Approve remittances
- ✅ Configure SACCO settings
- ❌ Cannot access other SACCOs' data
- ❌ Cannot create new SACCOs

### Vehicle Owner
- ✅ View their vehicle(s) performance
- ✅ Track earnings and expenses
- ✅ View remittance history
- ❌ Cannot modify vehicle assignments
- ❌ Cannot access other owners' data

### Driver/Conductor
- ✅ Record trips and fare collections
- ✅ Log fuel purchases
- ✅ Report maintenance issues
- ✅ View their performance metrics
- ❌ Cannot view financial summaries
- ❌ Cannot access other drivers' data

## Multi-Tenant Security

### Data Isolation
- All database queries are filtered by SACCO ID
- Users can only access data from their SACCO (except Super Admin)
- Middleware enforces tenant boundaries on all routes

### Audit Logging
- Critical actions are automatically logged
- Tracks user ID, SACCO ID, action type, and changes
- IP address and timestamp recorded
- Super Admin can view all audit logs

### Role-Based Access Control (RBAC)
- Routes protected by middleware
- API endpoints validate user permissions
- Frontend conditionally renders based on role

## API Routes

### Authentication
- `POST /api/auth/[...nextauth]` - Login/logout

### SACCOs (Super Admin Only)
- `GET /api/saccos` - List all SACCOs
- `POST /api/saccos` - Create new SACCO
- `GET /api/saccos/[id]` - Get SACCO details
- `PUT /api/saccos/[id]` - Update SACCO
- `DELETE /api/saccos/[id]` - Delete SACCO

### Super Admin
- `GET /api/superadmin/stats` - Platform-wide statistics

### Vehicles (Tenant-scoped)
- `GET /api/vehicles` - List vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/vehicles/[id]` - Get vehicle details
- `PUT /api/vehicles/[id]` - Update vehicle
- `DELETE /api/vehicles/[id]` - Delete vehicle

### Trips (Tenant-scoped)
- `GET /api/trips` - List trips
- `POST /api/trips` - Record new trip
- `GET /api/trips/[id]` - Get trip details

### More endpoints following the same pattern...

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment

### MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Whitelist your application's IP address
3. Create a database user
4. Copy the connection string to `.env.local`

### Vercel Deployment (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
```env
MONGODB_URI=<your-production-mongodb-uri>
NEXTAUTH_SECRET=<strong-random-secret>
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```

## Development Roadmap

### Phase 1 (MVP - Completed) ✅
- ✅ Multi-tenant architecture
- ✅ Super admin module
- ✅ SACCO CRUD operations
- ✅ User authentication
- ✅ Basic trip recording
- ✅ Expense tracking
- ✅ Remittance calculations
- ✅ Audit logging

### Phase 2 (In Progress) 🚧
- ⏳ Advanced analytics with charts
- ⏳ PDF report generation
- ⏳ Notification system
- ⏳ SACCO suspension workflows
- ⏳ Enhanced user management

### Phase 3 (Future) 📅
- M-PESA payment integration
- SMS notifications
- Mobile app (React Native)
- Route optimization
- Driver performance ratings
- Subscription billing
- White-label branding

## Architecture Highlights

### Multi-Tenancy Implementation
```typescript
// All queries automatically filtered by SACCO ID
function addSaccoFilter(baseFilter, userRole, userSaccoId) {
  if (userRole === 'superadmin') {
    return baseFilter; // See everything
  }
  return { ...baseFilter, saccoId: userSaccoId }; // Filtered
}
```

### Remittance Calculation
```typescript
const netAmount = grossCollections
  - fuelCosts
  - maintenanceCosts
  - (grossCollections * saccoCommissionRate / 100)
  - driverDailyWage;
```

### Audit Logging
```typescript
await createAuditLog({
  userId: user.id,
  saccoId: sacco._id,
  action: 'created_vehicle',
  entityType: 'vehicle',
  entityId: vehicle._id,
  changes: { before: {}, after: vehicleData },
  ipAddress: req.ip,
});
```

## Testing

### Manual Testing Checklist
- [ ] Super admin can create SACCOs
- [ ] SACCO admin cannot access other SACCOs
- [ ] Drivers can only record trips for assigned vehicles
- [ ] Owners can only view their own vehicles
- [ ] Audit logs capture all critical actions
- [ ] Remittances calculate correctly
- [ ] Multi-tenant data isolation works

### Run the Seed Script
```bash
npm run seed
```
This populates the database with realistic test data.

## Troubleshooting

### MongoDB Connection Issues
- Verify MONGODB_URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Authentication Not Working
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Data Not Showing
- Run `npm run seed` to populate database
- Check MongoDB connection
- Verify user role and permissions

## Contributing

This is an MVP demonstration project. For production use:
1. Add comprehensive error handling
2. Implement rate limiting
3. Add input validation on all forms
4. Set up monitoring and logging
5. Configure backup strategies
6. Implement proper email/SMS services

## License

This project is a demonstration MVP for educational purposes.

## Support

For issues, questions, or contributions:
- Check the documentation above
- Review the code comments
- Test with the provided seed data

## Acknowledgments

- Built with Next.js, MongoDB, and NextAuth
- Inspired by real-world Matatu SACCO operations in Kenya
- Designed for the 2025+ digital payment landscape

---

**Built by:** Claude Code
**Version:** 1.0.0 (MVP)
**Last Updated:** November 2025
