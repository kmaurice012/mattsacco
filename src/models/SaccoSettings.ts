import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ISaccoSettings extends Document {
  _id: string;
  saccoId: mongoose.Types.ObjectId;
  commissionRate: number;
  driverDailyWage: number;
  conductorDailyWage: number;
  remittanceSchedule: 'daily' | 'weekly' | 'monthly';
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const SaccoSettingsSchema = new Schema<ISaccoSettings>(
  {
    saccoId: {
      type: Schema.Types.ObjectId,
      ref: 'Sacco',
      required: [true, 'SACCO ID is required'],
      unique: true,
    },
    commissionRate: {
      type: Number,
      required: [true, 'Commission rate is required'],
      min: 0,
      max: 100,
      default: 10,
    },
    driverDailyWage: {
      type: Number,
      required: [true, 'Driver daily wage is required'],
      min: 0,
      default: 1000,
    },
    conductorDailyWage: {
      type: Number,
      required: [true, 'Conductor daily wage is required'],
      min: 0,
      default: 800,
    },
    remittanceSchedule: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Updated by user ID is required'],
    },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  }
);

// Index for quick lookups
SaccoSettingsSchema.index({ saccoId: 1 });

const SaccoSettings: Model<ISaccoSettings> = mongoose.models.SaccoSettings || mongoose.model<ISaccoSettings>('SaccoSettings', SaccoSettingsSchema);

export default SaccoSettings;
