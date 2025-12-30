import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IFuelRecord extends Document {
  _id: string;
  vehicleId: mongoose.Types.ObjectId;
  driverId: mongoose.Types.ObjectId;
  amount: number;
  cost: number;
  odometerReading: number;
  station: string;
  receiptPhoto?: string;
  date: Date;
  createdAt: Date;
}

const FuelRecordSchema = new Schema<IFuelRecord>(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle ID is required'],
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Driver ID is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Fuel amount (liters) is required'],
      min: 0,
    },
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      min: 0,
    },
    odometerReading: {
      type: Number,
      required: [true, 'Odometer reading is required'],
      min: 0,
    },
    station: {
      type: String,
      required: [true, 'Station name is required'],
      trim: true,
    },
    receiptPhoto: {
      type: String,
      trim: true,
    },
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
FuelRecordSchema.index({ vehicleId: 1, date: -1 });
FuelRecordSchema.index({ driverId: 1, date: -1 });
FuelRecordSchema.index({ date: -1 });

const FuelRecord: Model<IFuelRecord> = mongoose.models.FuelRecord || mongoose.model<IFuelRecord>('FuelRecord', FuelRecordSchema);

export default FuelRecord;
