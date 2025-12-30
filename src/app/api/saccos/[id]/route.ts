import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Sacco from '@/models/Sacco';
import Vehicle from '@/models/Vehicle';
import User from '@/models/User';
import { getCurrentUser } from '@/lib/auth';
import { canAccessSaccoData } from '@/lib/tenancy';
import { createAuditLog } from '@/lib/audit';

// GET /api/saccos/[id] - Get single SACCO
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { id } = await params;
    const sacco = await Sacco.findById(id).populate('adminId', 'name email phone');

    if (!sacco) {
      return NextResponse.json({ error: 'SACCO not found' }, { status: 404 });
    }

    // Check access permissions
    if (!canAccessSaccoData(user.role, user.saccoId, sacco._id.toString())) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get additional stats
    const vehicleCount = await Vehicle.countDocuments({ saccoId: sacco._id });
    const userCount = await User.countDocuments({ saccoId: sacco._id });

    return NextResponse.json({
      sacco,
      stats: {
        vehicleCount,
        userCount,
      },
    });
  } catch (error: any) {
    console.error('Error fetching SACCO:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/saccos/[id] - Update SACCO (super admin or sacco admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    await dbConnect();

    const { id } = await params;
    const sacco = await Sacco.findById(id);

    if (!sacco) {
      return NextResponse.json({ error: 'SACCO not found' }, { status: 404 });
    }

    // Check permissions
    const canModify = user.role === 'superadmin' ||
                      (user.role === 'admin' && user.saccoId === id);

    if (!canModify) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Store old values for audit
    const oldValues: any = {};
    const allowedFields = [
      'name',
      'location',
      'contactPerson',
      'phone',
      'email',
      'commissionRate',
      'status',
      'subscriptionPlan',
      'subscriptionExpiry',
    ];

    // Only super admin can change status
    if (body.status && user.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Only super admin can change SACCO status' },
        { status: 403 }
      );
    }

    // Update fields
    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        oldValues[field] = sacco[field as keyof typeof sacco];
        (sacco as any)[field] = body[field];
      }
    });

    await sacco.save();

    // Create audit log
    await createAuditLog({
      userId: user.id,
      saccoId: sacco._id.toString(),
      action: 'updated_sacco',
      entityType: 'sacco',
      entityId: sacco._id.toString(),
      changes: {
        before: oldValues,
        after: body,
      },
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      message: 'SACCO updated successfully',
      sacco,
    });
  } catch (error: any) {
    console.error('Error updating SACCO:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/saccos/[id] - Delete SACCO (super admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();

    const { id } = await params;
    const sacco = await Sacco.findById(id);

    if (!sacco) {
      return NextResponse.json({ error: 'SACCO not found' }, { status: 404 });
    }

    // Check if SACCO has vehicles
    const vehicleCount = await Vehicle.countDocuments({ saccoId: sacco._id });

    if (vehicleCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete SACCO with active vehicles. Please remove all vehicles first.' },
        { status: 400 }
      );
    }

    // Delete all users associated with this SACCO
    await User.deleteMany({ saccoId: sacco._id });

    // Delete the SACCO
    await sacco.deleteOne();

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: 'deleted_sacco',
      entityType: 'sacco',
      entityId: sacco._id.toString(),
      changes: {
        name: sacco.name,
        registrationNumber: sacco.registrationNumber,
      },
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      message: 'SACCO deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting SACCO:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
