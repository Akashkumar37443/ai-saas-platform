import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
