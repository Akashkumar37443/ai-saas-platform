import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Settings, Shield, Bell, Key, Database, Save, Check } from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [platformName, setPlatformName] = useState('AI Platform')
  const [supportEmail, setSupportEmail] = useState('support@aiplatform.com')
  const [maxRateLimit, setMaxRateLimit] = useState('1000')
  const [enableAuditLog, setEnableAuditLog] = useState(true)
  const [enableTwoFactor, setEnableTwoFactor] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Settings className="h-7 w-7 text-primary-400" />
            System Settings
          </h1>
          <p className="text-sm text-gray-400 mt-1">Configure global application parameters, security controls, and rate limits</p>
        </div>
        <Button onClick={handleSave} size="md" className="group">
          {saved ? <Check className="h-4 w-4 mr-2 text-green-300" /> : <Save className="h-4 w-4 mr-2" />}
          {saved ? 'Saved Changes!' : 'Save Settings'}
        </Button>
      </div>

      {/* General Settings */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/8 pb-3">
          <Settings className="h-4 w-4 text-primary-400" /> Platform Defaults
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Platform Title"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
          />
          <Input
            label="Support Email Address"
            type="email"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
          />
        </div>
      </Card>

      {/* API & Performance Limits */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/8 pb-3">
          <Database className="h-4 w-4 text-accent-400" /> API Rate Limiting & Quotas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Global Rate Limit (req / min)"
            type="number"
            value={maxRateLimit}
            onChange={(e) => setMaxRateLimit(e.target.value)}
          />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-300 mb-2">Default Model Engine</label>
            <select className="block w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="gpt-4o">GPT-4o (Default)</option>
              <option value="claude-3-5">Claude 3.5 Sonnet</option>
              <option value="mistral-large">Mistral Large</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Security & Audit Toggles */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/8 pb-3">
          <Shield className="h-4 w-4 text-emerald-400" /> Security & Compliance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl border border-white/8 bg-white/[0.02]">
            <div>
              <div className="text-sm font-semibold text-white">Enable Real-Time Audit Logging</div>
              <div className="text-xs text-gray-500">Log all API key modifications and administrative logins</div>
            </div>
            <input
              type="checkbox"
              checked={enableAuditLog}
              onChange={(e) => setEnableAuditLog(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-white/8 bg-white/[0.02]">
            <div>
              <div className="text-sm font-semibold text-white">Enforce 2FA for Admin Accounts</div>
              <div className="text-xs text-gray-500">Require authenticator app codes for all administrator sessions</div>
            </div>
            <input
              type="checkbox"
              checked={enableTwoFactor}
              onChange={(e) => setEnableTwoFactor(e.target.checked)}
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
