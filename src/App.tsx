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
import PlaygroundPage from './pages/admin/PlaygroundPage'
import BillingPage from './pages/admin/BillingPage'
import SettingsPage from './pages/admin/SettingsPage'
import SecurityPage from './pages/admin/SecurityPage'

// User pages & layout
import UserLayout from './pages/user/UserLayout'
import UserPlaygroundPage from './pages/user/UserPlaygroundPage'
import UserApiKeysPage from './pages/user/UserApiKeysPage'

function App() {
  return (
    <Routes>
      {/* Public Landing Pages */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="pricing" element={<PricingPage />} />
      </Route>

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* User Portal Routes (Logged-in end users) */}
      <Route path="/dashboard" element={<UserLayout />}>
        <Route index element={<UserPlaygroundPage />} />
        <Route path="api-keys" element={<UserApiKeysPage />} />
        <Route path="usage" element={<UserPlaygroundPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="api-keys" element={<ApiKeysPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
