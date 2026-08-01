import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Input } from '@/components/common/Input'
import { CreditCard, Download, Building } from 'lucide-react'

const invoices = [
  { id: 'INV-2024-001', date: 'Jan 15, 2024', amount: '$49.00', status: 'Paid', plan: 'Pro Plan' },
  { id: 'INV-2023-012', date: 'Dec 15, 2023', amount: '$49.00', status: 'Paid', plan: 'Pro Plan' },
  { id: 'INV-2023-011', date: 'Nov 15, 2023', amount: '$49.00', status: 'Paid', plan: 'Pro Plan' },
]

export default function BillingPage() {

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <CreditCard className="h-7 w-7 text-primary-400" />
          Billing & Subscriptions
        </h1>
        <p className="text-sm text-gray-400 mt-1">Manage your enterprise subscription, payment methods, and invoice history</p>
      </div>

      {/* Current Active Plan Card */}
      <Card className="border-primary-500/40 bg-gradient-to-r from-primary-600/15 via-accent-600/10 to-transparent p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">Current Plan: Pro Tier</span>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-sm text-gray-400">Renews on February 15, 2024 — $49/month</p>
            <p className="text-xs text-gray-500">50,000 API calls included • 38,420 used this cycle (76%)</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Cancel Plan</Button>
            <Button size="sm">Upgrade Plan</Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 w-[76%]" />
        </div>
      </Card>

      {/* Payment Method & Billing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-accent-400" /> Payment Method
          </h3>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-400 font-mono">
                VISA
              </div>
              <div>
                <div className="text-sm font-semibold text-white font-mono">•••• •••• •••• 4242</div>
                <div className="text-xs text-gray-500">Expires 12/28</div>
              </div>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
          </div>
          <Button variant="outline" className="w-full text-xs" size="sm">+ Add Backup Card</Button>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="h-4 w-4 text-primary-400" /> Billing Info
          </h3>
          <div className="space-y-3">
            <Input label="Company / Billing Name" defaultValue="Acme AI Technologies Inc." />
            <Input label="VAT / Tax ID" defaultValue="US984719284" />
          </div>
        </Card>
      </div>

      {/* Invoice History */}
      <Card>
        <CardHeader className="py-4 border-b border-white/8 flex flex-row items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Invoice History</h3>
          <Button variant="ghost" size="sm" className="text-xs">Download All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div>
                  <div className="text-sm font-semibold text-white">{inv.id}</div>
                  <div className="text-xs text-gray-500">{inv.plan} • {inv.date}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono font-bold text-white">{inv.amount}</span>
                  <Badge variant="success">{inv.status}</Badge>
                  <button className="text-gray-500 hover:text-white transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
