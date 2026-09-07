import { Outlet, Navigate } from 'react-router-dom';
import { UserSidebar } from '@/components/user/UserSidebar';
import { UserHeader } from '@/components/user/UserHeader';
import { useAuth } from '@/context/AuthContext';

export default function UserLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200">
      <UserSidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <UserHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
