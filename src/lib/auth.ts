import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-config';
import { NextResponse } from 'next/server';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return user;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}

export function hasRole(user: any, roles: string[]) {
  return user && roles.includes(user.role);
}

export function isSuperAdmin(user: any) {
  return user && user.role === 'superadmin';
}

export function isSaccoAdmin(user: any) {
  return user && user.role === 'admin';
}

export function canAccessSacco(user: any, saccoId: string) {
  // Super admin can access all SACCOs
  if (isSuperAdmin(user)) {
    return true;
  }

  // Other users can only access their own SACCO
  return user && user.saccoId === saccoId;
}
