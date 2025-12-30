import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IVehicle extends Document {
  _id: string;
  saccoId: mongoose.Types.ObjectId;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  capacity: number;
  ownerId: mongoose.Types.ObjectId;
  driverIds: mongoose.Types.ObjectId[];
  route: string;
  status: 'active' | 'maintenance' | 'inactive';
  insuranceExpiry: Date;
  inspectionExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    saccoId: {
      type: Schema.Types.ObjectId,
      ref: 'Sacco',
      required: [true, 'SACCO ID is required'],
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    make: {
      type: String,
      required: [true, 'Make is required'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 1990,
      max: new Date().getFullYear() + 1,
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: 1,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner ID is required'],
    },
    driverIds: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    route: {
      type: String,
      required: [true, 'Route is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'inactive'],
      default: 'active',
    },
    insuranceExpiry: {
      type: Date,
      required: [true, 'Insurance expiry is required'],
    },
    inspectionExpiry: {
      type: Date,
      required: [true, 'Inspection expiry is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for multi-tenant queries and performance
VehicleSchema.index({ saccoId: 1, status: 1 });
VehicleSchema.index({ registrationNumber: 1 });
VehicleSchema.index({ ownerId: 1 });
VehicleSchema.index({ driverIds: 1 });

const Vehicle: Model<IVehicle> = mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);

export default Vehicle;
