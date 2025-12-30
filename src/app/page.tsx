'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (session?.user) {
      // Redirect based on role
      switch (session.user.role) {
        case 'superadmin':
          router.push('/superadmin/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'owner':
          router.push('/owner/dashboard');
          break;
        case 'driver':
        case 'conductor':
          router.push('/driver/dashboard');
          break;
        default:
          router.push('/login');
      }
    }
  }, [session, status, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg">Redirecting...</div>
    </div>
  );
}
