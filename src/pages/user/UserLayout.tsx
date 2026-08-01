import { Outlet, Navigate } from 'react-router-dom'
import { UserSidebar } from '@/components/user/UserSidebar'
import { UserHeader } from '@/components/user/UserHeader'

export default function UserLayout() {
  const isAuthenticated = localStorage.getItem('userToken') !== null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 flex flex-col md:flex-row relative">
      <UserSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden bg-dark-900">
        <UserHeader />
        <main className="flex-1 overflow-auto bg-dark-900">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
