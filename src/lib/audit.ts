import AuditLog from '@/models/AuditLog';
import dbConnect from './mongodb';

export interface AuditLogParams {
  userId: string;
  saccoId?: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, any>;
  ipAddress?: string;
}

/**
 * Create an audit log entry
 */
export async function createAuditLog(params: AuditLogParams) {
  try {
    await dbConnect();

    const auditLog = await AuditLog.create({
      userId: params.userId,
      saccoId: params.saccoId || null,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      changes: params.changes || {},
      ipAddress: params.ipAddress || 'unknown',
      timestamp: new Date(),
    });

    return auditLog;
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw error - audit logging should not break the main flow
  }
}

/**
 * Get audit logs with filters
 */
export async function getAuditLogs(filters: {
  userId?: string;
  saccoId?: string;
  entityType?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  skip?: number;
}) {
  try {
    await dbConnect();

    const query: any = {};

    if (filters.userId) query.userId = filters.userId;
    if (filters.saccoId) query.saccoId = filters.saccoId;
    if (filters.entityType) query.entityType = filters.entityType;
    if (filters.action) query.action = filters.action;

    if (filters.startDate || filters.endDate) {
      query.timestamp = {};
      if (filters.startDate) query.timestamp.$gte = filters.startDate;
      if (filters.endDate) query.timestamp.$lte = filters.endDate;
    }

    const logs = await AuditLog.find(query)
      .populate('userId', 'name email')
      .populate('saccoId', 'name')
      .sort({ timestamp: -1 })
      .limit(filters.limit || 100)
      .skip(filters.skip || 0);

    const total = await AuditLog.countDocuments(query);

    return {
      logs,
      total,
    };
  } catch (error) {
    console.error('Failed to get audit logs:', error);
    throw error;
  }
}
