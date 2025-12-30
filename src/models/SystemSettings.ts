import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ISystemSettings extends Document {
  _id: mongoose.Types.ObjectId;
  platformCommission: number;
  maintenanceMode: boolean;
  allowedFileTypes: string[];
  maxFileSize: number;
  emailSettings: Record<string, any>;
  smsSettings: Record<string, any>;
  updatedBy: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const SystemSettingsSchema = new Schema<ISystemSettings>(
  {
    platformCommission: {
      type: Number,
      required: [true, 'Platform commission is required'],
      min: 0,
      max: 100,
      default: 5,
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    allowedFileTypes: [{
      type: String,
      trim: true,
    }],
    maxFileSize: {
      type: Number,
      default: 5242880, // 5MB in bytes
      min: 0,
    },
    emailSettings: {
      type: Schema.Types.Mixed,
      default: {},
    },
    smsSettings: {
      type: Schema.Types.Mixed,
      default: {},
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

const SystemSettings: Model<ISystemSettings> = mongoose.models.SystemSettings || mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);

export default SystemSettings;
