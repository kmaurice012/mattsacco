import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sacco from '@/models/Sacco';
import User from '@/models/User';
import SaccoSettings from '@/models/SaccoSettings';
import { getCurrentUser } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';
import bcrypt from 'bcryptjs';

// GET /api/saccos - Get all SACCOs (super admin only) or user's SACCO
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    let saccos;

    if (user.role === 'superadmin') {
      // Super admin sees all SACCOs
      saccos = await Sacco.find()
        .populate('adminId', 'name email phone')
        .sort({ createdAt: -1 });
    } else {
      // Other users see only their SACCO
      saccos = await Sacco.find({ _id: user.saccoId })
        .populate('adminId', 'name email phone');
    }

    return NextResponse.json({ saccos });
  } catch (error: any) {
    console.error('Error fetching SACCOs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/saccos - Create new SACCO (super admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      registrationNumber,
      location,
      contactPerson,
      phone,
      email,
      adminEmail,
      adminName,
      adminPhone,
      adminPassword,
      commissionRate,
      subscriptionPlan,
      subscriptionExpiry,
    } = body;

    await dbConnect();

    // Check if SACCO with same registration number exists
    const existingSacco = await Sacco.findOne({ registrationNumber });
    if (existingSacco) {
      return NextResponse.json(
        { error: 'SACCO with this registration number already exists' },
        { status: 400 }
      );
    }

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create SACCO first (without adminId)
    const sacco = await Sacco.create({
      name,
      registrationNumber,
      location,
      contactPerson,
      phone,
      email,
      status: 'active',
      commissionRate: commissionRate || 10,
      subscriptionPlan: subscriptionPlan || 'basic',
      subscriptionExpiry: subscriptionExpiry || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      adminId: null, // Temporary, will update after creating admin user
    });

    // Create admin user
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      phone: adminPhone,
      password: hashedPassword,
      role: 'admin',
      saccoId: sacco._id,
      isActive: true,
    });

    // Update SACCO with admin ID
    sacco.adminId = admin._id;
    await sacco.save();

    // Create default settings for the SACCO
    await SaccoSettings.create({
      saccoId: sacco._id,
      commissionRate: commissionRate || 10,
      driverDailyWage: 1000,
      conductorDailyWage: 800,
      remittanceSchedule: 'daily',
      updatedBy: user.id,
    });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: 'created_sacco',
      entityType: 'sacco',
      entityId: sacco._id.toString(),
      changes: { name, registrationNumber, location },
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      message: 'SACCO created successfully',
      sacco,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating SACCO:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
