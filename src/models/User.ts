import mongoose, { Schema, Model } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'superadmin' | 'admin' | 'owner' | 'driver' | 'conductor';
  saccoId?: mongoose.Types.ObjectId;
  vehicleIds: mongoose.Types.ObjectId[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'owner', 'driver', 'conductor'],
      required: [true, 'Role is required'],
    },
    saccoId: {
      type: Schema.Types.ObjectId,
      ref: 'Sacco',
      required: function (this: IUser) {
        return this.role !== 'superadmin';
      },
    },
    vehicleIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Vehicle',
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ saccoId: 1, role: 1 });
UserSchema.index({ role: 1 });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
