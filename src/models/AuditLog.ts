import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IAuditLog extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  saccoId?: mongoose.Types.ObjectId;
  action: string;
  entityType: string;
  entityId: mongoose.Types.ObjectId;
  changes: Record<string, any>;
  ipAddress: string;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    saccoId: {
      type: Schema.Types.ObjectId,
      ref: 'Sacco',
    },
    action: {
      type: String,
      required: [true, 'Action is required'],
      trim: true,
    },
    entityType: {
      type: String,
      required: [true, 'Entity type is required'],
      trim: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Entity ID is required'],
    },
    changes: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      required: [true, 'IP address is required'],
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

// Indexes for efficient querying and filtering
AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ userId: 1, timestamp: -1 });
AuditLogSchema.index({ saccoId: 1, timestamp: -1 });
AuditLogSchema.index({ entityType: 1, entityId: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });

const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLog;
