import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Landing pages & Layout
import LandingLayout from './pages/landing/LandingLayout';
import HomePage from './pages/landing/HomePage';
import FeaturesPage from './pages/landing/FeaturesPage';
import PricingPage from './pages/landing/PricingPage';
import DocsPage from './pages/landing/DocsPage';
import ContactPage from './pages/landing/ContactPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';

// User Portal Pages & Layout
import UserLayout from './pages/user/UserLayout';
import UserPlaygroundPage from './pages/user/UserPlaygroundPage';
import UserApiKeysPage from './pages/user/UserApiKeysPage';
import UserTemplatesPage from './pages/user/UserTemplatesPage';
import UserUsagePage from './pages/user/UserUsagePage';

// Admin Panel Pages & Layout
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import UsersPage from './pages/admin/UsersPage';
import ApiKeysPage from './pages/admin/ApiKeysPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import PlaygroundPage from './pages/admin/PlaygroundPage';
import BillingPage from './pages/admin/BillingPage';
import SettingsPage from './pages/admin/SettingsPage';
import SecurityPage from './pages/admin/SecurityPage';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          {/* Public Marketing Landing Pages */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<HomePage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* User Portal Routes (Developer Studio) */}
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserPlaygroundPage />} />
            <Route path="api-keys" element={<UserApiKeysPage />} />
            <Route path="templates" element={<UserTemplatesPage />} />
            <Route path="usage" element={<UserUsagePage />} />
            <Route path="billing" element={<BillingPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Control Center Routes */}
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
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
