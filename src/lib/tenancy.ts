/**
 * Adds SACCO filtering to a MongoDB query for multi-tenant data isolation
 * Super admins can see all data, other users only see their SACCO's data
 */
export function addSaccoFilter<T>(
  baseFilter: Record<string, any>,
  userRole: string,
  userSaccoId: string | null
): Record<string, any> {
  // Super admin sees everything
  if (userRole === 'superadmin') {
    return baseFilter;
  }

  // Other users only see their SACCO's data
  return {
    ...baseFilter,
    saccoId: userSaccoId,
  };
}

/**
 * Adds vehicle ownership filtering to a query
 * Owners can only see their own vehicles
 */
export function addOwnershipFilter<T>(
  baseFilter: Record<string, any>,
  userRole: string,
  userId: string,
  userSaccoId: string | null
): Record<string, any> {
  // Super admin sees everything
  if (userRole === 'superadmin') {
    return baseFilter;
  }

  // SACCO admin sees all vehicles in their SACCO
  if (userRole === 'admin') {
    return {
      ...baseFilter,
      saccoId: userSaccoId,
    };
  }

  // Owners only see their own vehicles
  if (userRole === 'owner') {
    return {
      ...baseFilter,
      ownerId: userId,
    };
  }

  // Drivers see vehicles they're assigned to
  if (userRole === 'driver' || userRole === 'conductor') {
    return {
      ...baseFilter,
      driverIds: userId,
    };
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
