/* eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Helper to generate random date within last N days
function randomDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date;
}

// Helper to generate random time
function randomTime() {
  const date = new Date();
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date;
}

// Define schemas directly here to avoid import issues
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'admin', 'owner', 'driver', 'conductor'], required: true },
  saccoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sacco' },
  vehicleIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  isActive: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });

const saccoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['active', 'suspended', 'inactive'], default: 'active' },
  subscriptionPlan: { type: String, default: 'basic' },
  subscriptionExpiry: Date,
  commissionRate: { type: Number, default: 10 }
}, { timestamps: true });

const vehicleSchema = new mongoose.Schema({
  saccoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sacco', required: true },
  registrationNumber: { type: String, required: true, unique: true },
  make: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  year: { type: Number, required: true },
  capacity: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  route: { type: String, required: true },
  status: { type: String, enum: ['active', 'maintenance', 'inactive'], default: 'active' },
  insuranceExpiry: Date,
  inspectionExpiry: Date
}, { timestamps: true });

const tripSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conductorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  route: { type: String, required: true },
  passengers: { type: Number, required: true },
  fareCollected: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash', 'mpesa', 'other'], required: true },
  tripDate: { type: Date, default: Date.now },
  startTime: { type: Date, default: Date.now },
  endTime: Date
}, { timestamps: { createdAt: true, updatedAt: false } });

const fuelRecordSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  cost: { type: Number, required: true },
  odometerReading: { type: Number, required: true },
  station: { type: String, required: true },
  receiptPhoto: String,
  date: { type: Date, default: Date.now }
}, { timestamps: { createdAt: true, updatedAt: false } });

const maintenanceRecordSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  type: { type: String, enum: ['scheduled', 'repair', 'breakdown'], required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  serviceProvider: { type: String, required: true },
  parts: [String],
  receiptPhotos: [String],
  date: { type: Date, default: Date.now }
}, { timestamps: { createdAt: true, updatedAt: false } });

const remittanceSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  period: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  grossCollections: { type: Number, default: 0 },
  fuelCosts: { type: Number, default: 0 },
  maintenanceCosts: { type: Number, default: 0 },
  saccoCommission: { type: Number, default: 0 },
  driverWages: { type: Number, default: 0 },
  netAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  paymentMethod: String,
  transactionId: String,
  paidAt: Date
}, { timestamps: { createdAt: true, updatedAt: false } });

const saccoSettingsSchema = new mongoose.Schema({
  saccoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sacco', required: true, unique: true },
  commissionRate: { type: Number, default: 10 },
  driverDailyWage: { type: Number, default: 1000 },
  conductorDailyWage: { type: Number, default: 800 },
  remittanceSchedule: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: { createdAt: false, updatedAt: true } });

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  saccoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sacco' },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  changes: { type: mongoose.Schema.Types.Mixed, default: {} },
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: false });

// Create models
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Sacco = mongoose.models.Sacco || mongoose.model('Sacco', saccoSchema);
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
const FuelRecord = mongoose.models.FuelRecord || mongoose.model('FuelRecord', fuelRecordSchema);
const MaintenanceRecord = mongoose.models.MaintenanceRecord || mongoose.model('MaintenanceRecord', maintenanceRecordSchema);
const Remittance = mongoose.models.Remittance || mongoose.model('Remittance', remittanceSchema);
const SaccoSettings = mongoose.models.SaccoSettings || mongoose.model('SaccoSettings', saccoSettingsSchema);
const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Sacco.deleteMany({}),
      Vehicle.deleteMany({}),
      Trip.deleteMany({}),
      FuelRecord.deleteMany({}),
      MaintenanceRecord.deleteMany({}),
      Remittance.deleteMany({}),
      SaccoSettings.deleteMany({}),
      AuditLog.deleteMany({}),
    ]);
    console.log('Existing data cleared');

    // Hash password
    const hashedPassword = await bcrypt.hash('password', 10);

    // 1. Create Super Admin
    console.log('Creating super admin...');
    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@example.com',
      phone: '+254700000000',
      password: hashedPassword,
      role: 'superadmin',
      isActive: true,
    });
    console.log('Super admin created:', superAdmin.email);

    // 2. Create SACCOs
    console.log('Creating SACCOs...');
    const saccosData = [
      {
        name: 'Nairobi Metro SACCO',
        registrationNumber: 'SACCO/2024/001',
        location: 'Nairobi, Kenya',
        contactPerson: 'James Kamau',
        phone: '+254712345001',
        email: 'info@nairobimetro.com',
        commissionRate: 10,
      },
      {
        name: 'Thika Road SACCO',
        registrationNumber: 'SACCO/2024/002',
        location: 'Thika, Kenya',
        contactPerson: 'Mary Wanjiku',
        phone: '+254712345002',
        email: 'info@thikaroad.com',
        commissionRate: 12,
      },
      {
        name: 'Mombasa Express SACCO',
        registrationNumber: 'SACCO/2024/003',
        location: 'Mombasa, Kenya',
        contactPerson: 'Ali Hassan',
        phone: '+254712345003',
        email: 'info@mombasaexpress.com',
        commissionRate: 11,
      },
    ];

    const saccos = [];
    for (const saccoData of saccosData) {
      const subscriptionExpiry = new Date();
      subscriptionExpiry.setFullYear(subscriptionExpiry.getFullYear() + 1);

      const sacco = await Sacco.create({
        ...saccoData,
        status: 'active',
        subscriptionPlan: 'basic',
        subscriptionExpiry,
        adminId: null,
      });

      // Create SACCO admin
      const admin = await User.create({
        name: `${saccoData.name} Admin`,
        email: saccoData.email.replace('info@', 'admin@'),
        phone: saccoData.phone,
        password: hashedPassword,
        role: 'admin',
        saccoId: sacco._id,
        isActive: true,
      });

      sacco.adminId = admin._id;
      await sacco.save();

      // Create SACCO settings
      await SaccoSettings.create({
        saccoId: sacco._id,
        commissionRate: saccoData.commissionRate,
        driverDailyWage: 1000,
        conductorDailyWage: 800,
        remittanceSchedule: 'daily',
        updatedBy: admin._id,
      });

      saccos.push({ sacco, admin });
      console.log(`SACCO created: ${sacco.name}`);
    }

    // 3. Create Owners, Drivers, Vehicles
    console.log('Creating vehicles, owners, and drivers...');
    const vehiclesPerSacco = 5;
    const driversPerSacco = 3;
    const conductorsPerSacco = 3;

    const routes = [
      'Nairobi CBD - Westlands',
      'Nairobi CBD - Eastleigh',
      'Nairobi CBD - Ngong',
      'Thika - Nairobi',
      'Mombasa - Malindi',
    ];

    const makes = ['Nissan', 'Toyota', 'Isuzu'];
    const models = ['Matatu', 'Mini Bus', 'Bus'];

    for (const { sacco } of saccos) {
      // Create owners
      const owners = [];
      for (let i = 1; i <= vehiclesPerSacco; i++) {
        const owner = await User.create({
          name: `Owner ${i} - ${sacco.name}`,
          email: `owner${i}@${sacco.registrationNumber.toLowerCase()}.com`,
          phone: `+25471234${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          password: hashedPassword,
          role: 'owner',
          saccoId: sacco._id,
          isActive: true,
        });
        owners.push(owner);
      }

      // Create drivers
      const drivers = [];
      for (let i = 1; i <= driversPerSacco; i++) {
        const driver = await User.create({
          name: `Driver ${i} - ${sacco.name}`,
          email: `driver${i}@${sacco.registrationNumber.toLowerCase()}.com`,
          phone: `+25471235${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          password: hashedPassword,
          role: 'driver',
          saccoId: sacco._id,
          isActive: true,
        });
        drivers.push(driver);
      }

      // Create conductors
      const conductors = [];
      for (let i = 1; i <= conductorsPerSacco; i++) {
        const conductor = await User.create({
          name: `Conductor ${i} - ${sacco.name}`,
          email: `conductor${i}@${sacco.registrationNumber.toLowerCase()}.com`,
          phone: `+25471236${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          password: hashedPassword,
          role: 'conductor',
          saccoId: sacco._id,
          isActive: true,
        });
        conductors.push(conductor);
      }

      // Create vehicles
      const vehicles = [];
      for (let i = 0; i < vehiclesPerSacco; i++) {
        const owner = owners[i];
        const driver = drivers[i % driversPerSacco];
        const make = makes[Math.floor(Math.random() * makes.length)];
        const model = models[Math.floor(Math.random() * models.length)];

        const insuranceExpiry = new Date();
        insuranceExpiry.setMonth(insuranceExpiry.getMonth() + 6);

        const inspectionExpiry = new Date();
        inspectionExpiry.setMonth(inspectionExpiry.getMonth() + 3);

        const vehicle = await Vehicle.create({
          saccoId: sacco._id,
          registrationNumber: `K${String.fromCharCode(65 + Math.floor(Math.random() * 3))}${String.fromCharCode(65 + Math.floor(Math.random() * 3))} ${Math.floor(100 + Math.random() * 900)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
          make,
          model,
          year: 2018 + Math.floor(Math.random() * 6),
          capacity: 14,
          ownerId: owner._id,
          driverIds: [driver._id],
          route: routes[Math.floor(Math.random() * routes.length)],
          status: 'active',
          insuranceExpiry,
          inspectionExpiry,
        });

        // Update owner and driver with vehicle ID
        owner.vehicleIds.push(vehicle._id);
        await owner.save();
        driver.vehicleIds.push(vehicle._id);
        await driver.save();

        vehicles.push({ vehicle, owner, driver, conductor: conductors[i % conductorsPerSacco] });
      }

      // Create trips for each vehicle (last 30 days)
      console.log(`Creating trips for ${sacco.name}...`);
      for (const { vehicle, driver, conductor } of vehicles) {
        const tripsPerDay = 3 + Math.floor(Math.random() * 4); // 3-6 trips per day
        const daysBack = 30;

        for (let day = 0; day < daysBack; day++) {
          for (let trip = 0; trip < tripsPerDay; trip++) {
            const tripDate = randomDate(daysBack);
            const startTime = randomTime();
            const endTime = new Date(startTime.getTime() + (1000 * 60 * (30 + Math.random() * 60)));

            await Trip.create({
              vehicleId: vehicle._id,
              driverId: driver._id,
              conductorId: conductor._id,
              route: vehicle.route,
              passengers: 10 + Math.floor(Math.random() * 5),
              fareCollected: 3000 + Math.floor(Math.random() * 4000),
              paymentMethod: Math.random() > 0.3 ? 'mpesa' : 'cash',
              tripDate,
              startTime,
              endTime,
            });
          }
        }
      }

      // Create fuel records
      console.log(`Creating fuel records for ${sacco.name}...`);
      for (const { vehicle, driver } of vehicles) {
        const fuelRecordsCount = 10 + Math.floor(Math.random() * 10);
        for (let i = 0; i < fuelRecordsCount; i++) {
          await FuelRecord.create({
            vehicleId: vehicle._id,
            driverId: driver._id,
            amount: 30 + Math.floor(Math.random() * 20),
            cost: 4500 + Math.floor(Math.random() * 3000),
            odometerReading: 50000 + Math.floor(Math.random() * 100000),
            station: ['Shell', 'Total', 'Kenol', 'Rubis'][Math.floor(Math.random() * 4)],
            date: randomDate(30),
          });
        }
      }

      // Create maintenance records
      console.log(`Creating maintenance records for ${sacco.name}...`);
      for (const { vehicle } of vehicles) {
        const maintenanceCount = 3 + Math.floor(Math.random() * 3);
        for (let i = 0; i < maintenanceCount; i++) {
          await MaintenanceRecord.create({
            vehicleId: vehicle._id,
            type: ['scheduled', 'repair', 'breakdown'][Math.floor(Math.random() * 3)],
            description: [
              'Oil change and service',
              'Brake pad replacement',
              'Tire rotation',
              'Engine repair',
              'Transmission service',
            ][Math.floor(Math.random() * 5)],
            cost: 5000 + Math.floor(Math.random() * 20000),
            serviceProvider: ['QuickFix Auto', 'Metro Garage', 'City Motors'][Math.floor(Math.random() * 3)],
            parts: ['Brake pads', 'Oil filter', 'Tires'],
            date: randomDate(60),
          });
        }
      }

      // Create remittances
      console.log(`Creating remittances for ${sacco.name}...`);
      for (const { vehicle, owner } of vehicles) {
        const remittanceCount = 5;
        for (let i = 0; i < remittanceCount; i++) {
          const endDate = randomDate(30);
          const startDate = new Date(endDate);
          startDate.setDate(startDate.getDate() - 1);

          const grossCollections = 15000 + Math.floor(Math.random() * 10000);
          const fuelCosts = 3000 + Math.floor(Math.random() * 2000);
          const maintenanceCosts = Math.random() > 0.7 ? 5000 + Math.floor(Math.random() * 5000) : 0;
          const saccoCommission = grossCollections * (sacco.commissionRate / 100);
          const driverWages = 1000;
          const netAmount = grossCollections - fuelCosts - maintenanceCosts - saccoCommission - driverWages;

          await Remittance.create({
            vehicleId: vehicle._id,
            ownerId: owner._id,
            period: { start: startDate, end: endDate },
            grossCollections,
            fuelCosts,
            maintenanceCosts,
            saccoCommission,
            driverWages,
            netAmount,
            status: Math.random() > 0.3 ? 'completed' : 'pending',
            paymentMethod: 'mpesa',
            transactionId: `MP${Math.floor(Math.random() * 1000000000)}`,
            paidAt: Math.random() > 0.3 ? endDate : undefined,
          });
        }
      }
    }

    // Create audit logs
    console.log('Creating audit logs...');
    const auditActions = [
      'created_vehicle',
      'updated_vehicle',
      'created_trip',
      'created_fuel_record',
      'created_maintenance_record',
      'created_remittance',
      'updated_remittance',
    ];

    for (let i = 0; i < 50; i++) {
      const { sacco, admin } = saccos[Math.floor(Math.random() * saccos.length)];
      await AuditLog.create({
        userId: admin._id,
        saccoId: sacco._id,
        action: auditActions[Math.floor(Math.random() * auditActions.length)],
        entityType: ['vehicle', 'trip', 'fuel', 'maintenance', 'remittance'][Math.floor(Math.random() * 5)],
        entityId: new mongoose.Types.ObjectId(),
        changes: { sample: 'data' },
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        timestamp: randomDate(30),
      });
    }

    console.log('\n=== Seed Data Created Successfully ===\n');
    console.log('Login Credentials:');
    console.log('-------------------');
    console.log('Super Admin:');
    console.log('  Email: superadmin@example.com');
    console.log('  Password: password');
    console.log('');
    saccos.forEach(({ sacco, admin }) => {
      console.log(`${sacco.name} Admin:`);
      console.log(`  Email: ${admin.email}`);
      console.log(`  Password: password`);
      console.log('');
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
