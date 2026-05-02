import { Routes, Route } from 'react-router-dom'
import LandingLayout from './pages/landing/LandingLayout'
import HomePage from './pages/landing/HomePage'
import FeaturesPage from './pages/landing/FeaturesPage'
import PricingPage from './pages/landing/PricingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import DashboardPage from './pages/admin/DashboardPage'
import UsersPage from './pages/admin/UsersPage'
import ApiKeysPage from './pages/admin/ApiKeysPage'
import AnalyticsPage from './pages/admin/AnalyticsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="pricing" element={<PricingPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="api-keys" element={<ApiKeysPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  )
}

export default App
