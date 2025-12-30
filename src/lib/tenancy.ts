import { FilterQuery } from 'mongoose';

/**
 * Adds SACCO filtering to a MongoDB query for multi-tenant data isolation
 * Super admins can see all data, other users only see their SACCO's data
 */
export function addSaccoFilter<T>(
  baseFilter: FilterQuery<T>,
  userRole: string,
  userSaccoId: string | null
): FilterQuery<T> {
  // Super admin sees everything
  if (userRole === 'superadmin') {
    return baseFilter;
  }

  // Other users only see their SACCO's data
  return {
    ...baseFilter,
    saccoId: userSaccoId,
  } as FilterQuery<T>;
}

/**
 * Adds vehicle ownership filtering to a query
 * Owners can only see their own vehicles
 */
export function addOwnershipFilter<T>(
  baseFilter: FilterQuery<T>,
  userRole: string,
  userId: string,
  userSaccoId: string | null
): FilterQuery<T> {
  // Super admin sees everything
  if (userRole === 'superadmin') {
    return baseFilter;
  }

  // SACCO admin sees all vehicles in their SACCO
  if (userRole === 'admin') {
    return {
      ...baseFilter,
      saccoId: userSaccoId,
    } as FilterQuery<T>;
  }

  // Owners only see their own vehicles
  if (userRole === 'owner') {
    return {
      ...baseFilter,
      ownerId: userId,
    } as FilterQuery<T>;
  }

  // Drivers see vehicles they're assigned to
  if (userRole === 'driver' || userRole === 'conductor') {
    return {
      ...baseFilter,
      driverIds: userId,
    } as FilterQuery<T>;
  }

  return baseFilter;
}

/**
 * Validates if a user can access a specific SACCO's data
 */
export function canAccessSaccoData(
  userRole: string,
  userSaccoId: string | null,
  targetSaccoId: string
): boolean {
  // Super admin can access all SACCOs
  if (userRole === 'superadmin') {
    return true;
  }

  // Other users can only access their own SACCO
  return userSaccoId === targetSaccoId;
}

/**
 * Validates if a user can modify a specific resource
 */
export function canModifyResource(
  userRole: string,
  userSaccoId: string | null,
  resourceSaccoId: string
): boolean {
  // Super admin can modify everything
  if (userRole === 'superadmin') {
    return true;
  }

  // SACCO admin can modify resources in their SACCO
  if (userRole === 'admin' && userSaccoId === resourceSaccoId) {
    return true;
  }

  return false;
}
