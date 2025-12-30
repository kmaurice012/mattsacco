# MataSacco Manager - User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Super Admin Guide](#super-admin-guide)
3. [SACCO Admin Guide](#sacco-admin-guide)
4. [Vehicle Owner Guide](#vehicle-owner-guide)
5. [Driver/Conductor Guide](#driverconductor-guide)

---

## Getting Started

### Logging In
1. Navigate to the login page
2. Enter your email and password
3. Click "Sign In"
4. You will be redirected to your role-specific dashboard

### First Time Setup
After logging in for the first time:
- Super Admins: Create your first SACCO
- SACCO Admins: Add vehicles and users
- Owners: Review your vehicle(s)
- Drivers: Start recording trips

---

## Super Admin Guide

### Overview
As a Super Admin, you have full access to the entire platform and can manage multiple SACCOs.

### Dashboard Features
- **Total SACCOs**: View count of all registered SACCOs
- **Total Vehicles**: See all vehicles across all SACCOs
- **Total Users**: Monitor all platform users
- **Daily Collections**: Track platform-wide revenue

### Creating a New SACCO

1. **Navigate to SACCO Management**
   - Click "Create New SACCO" on the dashboard
   - Or go to Super Admin → SACCOs → New

2. **Fill in SACCO Information**
   - SACCO Name (e.g., "Nairobi Metro SACCO")
   - Registration Number (e.g., "SACCO/2024/001")
   - Location (e.g., "Nairobi, Kenya")
   - Contact Person
   - Phone and Email

3. **Create SACCO Admin Account**
   - Admin Name
   - Admin Email
   - Admin Phone
   - Admin Password

4. **Configure Settings**
   - Commission Rate (default: 10%)
   - Subscription Plan (Basic/Premium/Enterprise)

5. **Submit**
   - Click "Create SACCO"
   - The SACCO and admin account will be created
   - Admin can now log in with their credentials

### Managing SACCOs

#### Viewing All SACCOs
- Navigate to Super Admin → SACCOs
- View list of all SACCOs with status indicators
- Green badge = Active
- Red badge = Suspended
- Gray badge = Inactive

#### Viewing SACCO Details
- Click "Manage" next to any SACCO
- View:
  - SACCO information
  - Number of vehicles
  - Number of users
  - Subscription status

#### Editing a SACCO
- Click "Edit" on SACCO details page
- Update information as needed
- Only Super Admin can change status

#### Suspending a SACCO
1. Go to SACCO details
2. Click "Edit"
3. Change status to "Suspended"
4. Save changes
- Suspended SACCOs cannot access the system

#### Deleting a SACCO
- Navigate to SACCO details
- Click "Delete"
- Confirm deletion
- **Note**: Cannot delete SACCOs with active vehicles

### Platform Analytics
- **Dashboard**: Real-time platform metrics
- **Audit Logs**: View all system activities
  - Filter by date, user, action type
  - Export for compliance

### Best Practices
- Regularly review audit logs
- Monitor SACCO subscription expiry dates
- Ensure all SACCOs have active admins
- Review platform-wide metrics weekly

---

## SACCO Admin Guide

### Overview
As a SACCO Admin, you manage your specific SACCO's operations, including vehicles, users, and financial reporting.

### Dashboard Features
- **Fleet Overview**: Total vehicles and their status
- **Daily Collections**: Today's revenue
- **Pending Remittances**: Outstanding payments
- **Maintenance Alerts**: Upcoming service needs

### Managing Vehicles

#### Adding a New Vehicle
1. Navigate to Vehicles → Add New
2. Fill in vehicle details:
   - Registration Number (e.g., "KCA 123A")
   - Make (e.g., "Nissan")
   - Model (e.g., "Matatu")
   - Year
   - Capacity (number of seats)
   - Route
   - Insurance Expiry Date
   - Inspection Expiry Date

3. Assign Owner:
   - Select from existing owners
   - Or create new owner account

4. Assign Driver(s):
   - Select primary driver
   - Optionally add backup drivers

5. Submit

#### Viewing Vehicle Details
- Click on any vehicle
- View:
  - Basic information
  - Earnings and expenses
  - Trip history
  - Fuel consumption
  - Maintenance records

#### Editing Vehicle Information
- Click "Edit" on vehicle details page
- Update any information
- Save changes

### Managing Users

#### Adding New Users

**Adding a Vehicle Owner:**
1. Go to Users → Add New
2. Select Role: "Owner"
3. Fill in details:
   - Name
   - Email
   - Phone
   - Password
4. Assign vehicle(s) to owner
5. Submit

**Adding a Driver:**
1. Go to Users → Add New
2. Select Role: "Driver"
3. Fill in details
4. Assign to vehicle(s)
5. Set daily wage (if different from default)
6. Submit

**Adding a Conductor:**
- Same process as driver
- Select Role: "Conductor"

#### Managing User Status
- View all users in Users page
- Toggle "Active/Inactive" status
- Inactive users cannot log in

### Financial Management

#### Approving Remittances
1. Go to Remittances → Pending
2. Review each remittance:
   - Gross collections
   - Fuel costs
   - Maintenance costs
   - SACCO commission
   - Driver wages
   - Net amount to owner

3. Verify amounts are correct
4. Approve or reject
5. Enter payment details if paying

#### Viewing Reports
- Navigate to Reports
- Available reports:
  - Daily collections summary
  - Vehicle performance
  - Owner earnings
  - Expense breakdown
  - Commission summary

### SACCO Settings
1. Go to Settings
2. Configure:
   - Commission rate
   - Driver daily wage
   - Conductor daily wage
   - Remittance schedule (daily/weekly/monthly)
3. Save changes

### Best Practices
- Review pending remittances daily
- Monitor vehicle maintenance schedules
- Keep vehicle information up-to-date
- Regularly check expense records
- Ensure all drivers have valid assignments

---

## Vehicle Owner Guide

### Overview
As a Vehicle Owner, you can track your vehicle's performance, expenses, and earnings.

### Dashboard Features
- **My Vehicles**: List of your vehicles
- **Today's Earnings**: Current day collections
- **Expenses This Month**: Fuel and maintenance costs
- **Pending Remittances**: Money owed to you

### Viewing Vehicle Performance

1. **Select Your Vehicle**
   - Click on vehicle from "My Vehicles" list

2. **View Dashboard**
   - Daily/Weekly/Monthly earnings
   - Fuel consumption trends
   - Maintenance history
   - Net profit calculations

### Tracking Earnings

#### Daily Collections
- View trips recorded by drivers
- See payment methods (Cash/M-PESA)
- Monitor passenger counts
- Track route performance

#### Understanding Remittances
Your remittance is calculated as:
```
Gross Collections
- Fuel Costs
- Maintenance Costs
- SACCO Commission (10-12%)
- Driver/Conductor Wages
= Net Remittance (Your Payment)
```

### Viewing Expenses

#### Fuel Expenses
- View all fuel purchases
- See cost per liter
- Track fuel efficiency
- Monitor odometer readings

#### Maintenance Expenses
- View all service records
- See repair costs
- Track scheduled maintenance
- Review spare parts costs

### Remittance History
1. Go to Remittances
2. View all past payments
3. Filter by:
   - Date range
   - Status (Pending/Completed)
   - Payment method

4. Download statements (if available)

### Best Practices
- Check daily earnings every evening
- Review fuel expenses weekly
- Ensure timely maintenance
- Keep track of insurance/inspection expiry
- Report any discrepancies to SACCO admin

---

## Driver/Conductor Guide

### Overview
As a Driver or Conductor, you record trips, log expenses, and track your performance.

### Dashboard Features
- **Today's Trips**: Number of trips completed
- **Today's Collections**: Total fare collected
- **Assigned Vehicle**: Your current vehicle
- **Performance Metrics**: Your statistics

### Recording a Trip

1. **Navigate to Record Trip**
   - Click "New Trip" on dashboard
   - Or go to Trips → Add New

2. **Fill in Trip Details**
   - Route (pre-filled from vehicle)
   - Start Time
   - End Time
   - Number of Passengers
   - Total Fare Collected

3. **Select Payment Method**
   - Cash
   - M-PESA
   - Other

4. **Submit**
   - Trip is recorded immediately
   - Appears in today's trips

### Recording Fuel Purchases

1. **Navigate to Fuel → Add New**

2. **Fill in Details**
   - Amount (liters)
   - Cost (Ksh)
   - Odometer Reading
   - Station Name
   - Date

3. **Upload Receipt** (optional)
   - Take photo of receipt
   - Upload image

4. **Submit**

### Reporting Maintenance Issues

1. **Navigate to Maintenance → Report Issue**

2. **Select Type**
   - Scheduled maintenance
   - Repair needed
   - Breakdown

3. **Describe Issue**
   - Write clear description
   - Include any warning signs
   - Note when issue started

4. **Upload Photos** (if applicable)

5. **Submit**
   - SACCO admin will be notified
   - You'll be updated on resolution

### Viewing Your Performance

**Daily Statistics:**
- Total trips
- Total passengers
- Total collections
- Average fare per trip

**Monthly Performance:**
- Days worked
- Total trips
- Total revenue generated
- Performance rating (if available)

### Best Practices

#### Before Starting Your Day
- [ ] Check vehicle condition
- [ ] Note odometer reading
- [ ] Ensure you have phone/device charged
- [ ] Review assigned route

#### During the Day
- [ ] Record each trip immediately
- [ ] Keep receipts for all expenses
- [ ] Report any vehicle issues
- [ ] Monitor fuel levels

#### End of Day
- [ ] Record final trip
- [ ] Submit all fuel receipts
- [ ] Check total collections
- [ ] Report any discrepancies

### Tips for Accurate Recording

**Trips:**
- Record trips in real-time
- Don't batch multiple trips together
- Note actual passenger count
- Use correct payment method

**Fuel:**
- Keep all receipts
- Record odometer before filling
- Note station name for verification
- Upload receipt photos

**Maintenance:**
- Report issues immediately
- Don't wait for breakdowns
- Describe problems clearly
- Follow up on repairs

---

## Common Questions

### How do I reset my password?
Contact your SACCO admin to reset your password.

### I can't see my vehicle
Make sure you're assigned to the vehicle by your SACCO admin.

### Remittance amount seems wrong
Check:
1. All trips are recorded
2. All expenses are logged
3. Commission rate is correct
4. Contact SACCO admin if still incorrect

### Can I view other drivers' data?
No, you can only see your own trips and performance.

### How often are remittances paid?
This depends on your SACCO's schedule:
- Daily (most common)
- Weekly
- Monthly

Check with your SACCO admin for specific schedule.

---

## Getting Help

### Technical Issues
1. Check your internet connection
2. Clear browser cache
3. Try a different browser
4. Contact SACCO admin

### Data Discrepancies
1. Review your records
2. Check with conductor/driver
3. Contact SACCO admin
4. Provide specific details (date, trip, amount)

### Account Access
Contact your SACCO admin for:
- Password resets
- Account activation
- Role changes
- Permission issues

---

## Glossary

**SACCO**: Savings and Credit Cooperative Organization

**Remittance**: Payment to vehicle owner after deductions

**Gross Collections**: Total fare collected before any deductions

**Net Amount**: Final payment after all deductions

**Commission**: Percentage taken by SACCO for management

**Tenant**: A SACCO organization on the platform

**Multi-tenant**: System serving multiple SACCOs

---

**Version**: 1.0.0
**Last Updated**: November 2025
