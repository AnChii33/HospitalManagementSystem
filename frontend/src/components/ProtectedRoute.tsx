// src/components/ProtectedRoute.tsx

'use client'

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode; // Explicitly type the children prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = !!localStorage.getItem('token'); // Adjust this logic based on your authentication mechanism

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); // Redirect to login or home page if not authenticated
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null; // Render children if authenticated
};

export default ProtectedRoute;
