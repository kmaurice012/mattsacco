import mongoose, { Schema, Model, Document } from 'mongoose';

export interface ITrip extends Document {
  _id: mongoose.Types.ObjectId;
  vehicleId: mongoose.Types.ObjectId;
  driverId: mongoose.Types.ObjectId;
  conductorId?: mongoose.Types.ObjectId;
  route: string;
  passengers: number;
  fareCollected: number;
  paymentMethod: 'cash' | 'mpesa' | 'other';
  tripDate: Date;
  startTime: Date;
  endTime?: Date;
  createdAt: Date;
}

const TripSchema = new Schema<ITrip>(
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
    conductorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    route: {
      type: String,
      required: [true, 'Route is required'],
      trim: true,
    },
    passengers: {
      type: Number,
      required: [true, 'Number of passengers is required'],
      min: 0,
    },
    fareCollected: {
      type: Number,
      required: [true, 'Fare collected is required'],
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'mpesa', 'other'],
      required: [true, 'Payment method is required'],
    },
    tripDate: {
      type: Date,
      required: [true, 'Trip date is required'],
      default: Date.now,
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Indexes for efficient querying
TripSchema.index({ vehicleId: 1, tripDate: -1 });
TripSchema.index({ driverId: 1, tripDate: -1 });
TripSchema.index({ tripDate: -1 });

const Trip: Model<ITrip> = mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);

export default Trip;
