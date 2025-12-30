import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ISacco extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  registrationNumber: string;
  location: string;
  contactPerson: string;
  phone: string;
  email: string;
  adminId: mongoose.Types.ObjectId;
  status: 'active' | 'suspended' | 'inactive';
  subscriptionPlan: string;
  subscriptionExpiry: Date;
  commissionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

const SaccoSchema = new Schema<ISacco>(
  {
    name: {
      type: String,
      required: [true, 'SACCO name is required'],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'Registration number is required'],
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    contactPerson: {
      type: String,
      required: [true, 'Contact person is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Admin ID is required'],
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'inactive'],
      default: 'active',
    },
    subscriptionPlan: {
      type: String,
      default: 'basic',
    },
    subscriptionExpiry: {
      type: Date,
      required: [true, 'Subscription expiry is required'],
    },
    commissionRate: {
      type: Number,
      default: 10,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
SaccoSchema.index({ registrationNumber: 1 });
SaccoSchema.index({ status: 1 });

const Sacco: Model<ISacco> = mongoose.models.Sacco || mongoose.model<ISacco>('Sacco', SaccoSchema);

export default Sacco;
