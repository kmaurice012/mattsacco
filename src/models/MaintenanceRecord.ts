import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IMaintenanceRecord extends Document {
  _id: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  type: 'scheduled' | 'repair' | 'breakdown';
  description: string;
  cost: number;
  serviceProvider: string;
  parts: string[];
  receiptPhotos: string[];
  date: Date;
  createdAt: Date;
}

const MaintenanceRecordSchema = new Schema<IMaintenanceRecord>(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle ID is required'],
    },
    type: {
      type: String,
      enum: ['scheduled', 'repair', 'breakdown'],
      required: [true, 'Maintenance type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: 0,
    },
    serviceProvider: {
      type: String,
      required: [true, 'Service provider is required'],
      trim: true,
    },
    parts: [{
      type: String,
      trim: true,
    }],
    receiptPhotos: [{
      type: String,
      trim: true,
    }],
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Indexes for efficient querying
MaintenanceRecordSchema.index({ vehicleId: 1, date: -1 });
MaintenanceRecordSchema.index({ type: 1, date: -1 });
MaintenanceRecordSchema.index({ date: -1 });

const MaintenanceRecord: Model<IMaintenanceRecord> = mongoose.models.MaintenanceRecord || mongoose.model<IMaintenanceRecord>('MaintenanceRecord', MaintenanceRecordSchema);

export default MaintenanceRecord;
