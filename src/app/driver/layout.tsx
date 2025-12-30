'use client';

import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
