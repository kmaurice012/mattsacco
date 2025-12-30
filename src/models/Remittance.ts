import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IRemittance extends Document {
  _id: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  ownerId: mongoose.Types.ObjectId;
  period: {
    start: Date;
    end: Date;
  };
  grossCollections: number;
  fuelCosts: number;
  maintenanceCosts: number;
  saccoCommission: number;
  driverWages: number;
  netAmount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
  transactionId?: string;
  paidAt?: Date;
  createdAt: Date;
}

const RemittanceSchema = new Schema<IRemittance>(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
      required: [true, 'Vehicle ID is required'],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner ID is required'],
    },
    period: {
      start: {
        type: Date,
        required: [true, 'Period start date is required'],
      },
      end: {
        type: Date,
        required: [true, 'Period end date is required'],
      },
    },
    grossCollections: {
      type: Number,
      required: [true, 'Gross collections is required'],
      min: 0,
      default: 0,
    },
    fuelCosts: {
      type: Number,
      required: [true, 'Fuel costs is required'],
      min: 0,
      default: 0,
    },
    maintenanceCosts: {
      type: Number,
      required: [true, 'Maintenance costs is required'],
      min: 0,
      default: 0,
    },
    saccoCommission: {
      type: Number,
      required: [true, 'SACCO commission is required'],
      min: 0,
      default: 0,
    },
    driverWages: {
      type: Number,
      required: [true, 'Driver wages is required'],
      min: 0,
      default: 0,
    },
    netAmount: {
      type: Number,
      required: [true, 'Net amount is required'],
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Indexes for efficient querying
RemittanceSchema.index({ vehicleId: 1, 'period.start': -1 });
RemittanceSchema.index({ ownerId: 1, status: 1 });
RemittanceSchema.index({ status: 1, createdAt: -1 });

const Remittance: Model<IRemittance> = mongoose.models.Remittance || mongoose.model<IRemittance>('Remittance', RemittanceSchema);

export default Remittance;
