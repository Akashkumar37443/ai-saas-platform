import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { CreditCard, Download, Zap, Shield } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function BillingPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const { success } = useToast();

  const invoices = [
    { id: 'INV-2026-003', date: 'Sep 01, 2026', amount: '$49.00', status: 'Paid', plan: 'Pro Plan' },
    { id: 'INV-2026-002', date: 'Aug 01, 2026', amount: '$49.00', status: 'Paid', plan: 'Pro Plan' },
    { id: 'INV-2026-001', date: 'Jul 01, 2026', amount: '$49.00', status: 'Paid', plan: 'Pro Plan' },
  ];

  const handleSimulatedUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowUpgradeModal(false);
      success('Subscription updated!', `Successfully switched to ${selectedTier.toUpperCase()} plan.`);
    }, 1000);
  };

  const handleDownloadInvoice = (id: string) => {
    success('Invoice downloaded', `Receipt for ${id} saved as PDF.`);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <CreditCard className="h-7 w-7 text-indigo-400" />
          Billing & Subscription Plan
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Manage your subscription tier, view metered usage invoices, and configure payment methods.
        </p>
      </div>

      {/* Current Active Plan Banner */}
      <Card className="border-indigo-500/40 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-black p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-black text-white">Current Active Tier: Pro Plan</span>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-xs sm:text-sm text-gray-300">
              Renews automatically on <strong className="text-white">October 15, 2026</strong> for <strong className="text-white font-mono">$49.00 / month</strong>.
            </p>
            <p className="text-xs text-indigo-300 font-mono">
              500,000 monthly tokens quota • 48,500 tokens remaining in active billing cycle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => setShowUpgradeModal(true)} size="md" className="shadow-lg shadow-indigo-500/20">
              <Zap className="h-4 w-4 mr-1.5" /> Upgrade Subscription
            </Button>
          </div>
        </div>

        {/* Quota Progress bar */}
        <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Quota Consumption</span>
            <span className="font-mono text-emerald-400 font-bold">97% Available</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[97%]" />
          </div>
        </div>
      </Card>

      {/* Payment Method & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Payment Method */}
        <Card className="lg:col-span-5 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-indigo-400" /> Default Payment Method
          </h3>

          <div className="p-4 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center font-bold text-xs text-indigo-300 font-mono">
                VISA
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">•••• •••• •••• 4242</div>
                <div className="text-[10px] text-gray-400">Expires 12/28 • Stripe Auto-Pay</div>
              </div>
            </div>
            <Badge variant="success">Verified</Badge>
          </div>

          <div className="text-xs text-gray-400 leading-relaxed">
            All credit card transactions are encrypted with 256-bit SSL and processed through Stripe.
          </div>
        </Card>

        {/* Invoice History */}
        <Card className="lg:col-span-7 p-0 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Invoice History</h3>
            <span className="text-xs text-gray-400">PDF Receipts</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Invoice ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition">
                    <td className="p-4 font-mono font-bold text-white">{inv.id}</td>
                    <td className="p-4 text-gray-300">{inv.date}</td>
                    <td className="p-4 font-mono text-emerald-400 font-bold">{inv.amount}</td>
                    <td className="p-4">
                      <Badge variant="success">{inv.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(inv.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                        title="Download Receipt"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-xl w-full rounded-3xl border border-indigo-500/40 bg-[#0f0f1a] p-6 sm:p-8 space-y-5 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-400" /> Switch Subscription Tier
              </h3>
              <button onClick={() => setShowUpgradeModal(false)} className="text-gray-400 hover:text-white text-xs">
                ✕ Close
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: 'starter', name: 'Starter', price: '$19/mo', tokens: '100k Tokens' },
                { id: 'pro', name: 'Pro', price: '$49/mo', tokens: '500k Tokens', badge: 'Popular' },
                { id: 'enterprise', name: 'Enterprise', price: '$199/mo', tokens: 'Unlimited Tokens' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTier(t.id)}
                  className={`p-4 rounded-2xl border text-left transition ${
                    selectedTier === t.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white ring-1 ring-indigo-500'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-sm text-white">{t.name}</div>
                  <div className="font-mono text-base font-black text-indigo-300 mt-1">{t.price}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{t.tokens}</div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-gray-300 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-400" /> Instant Token Provisioning
              </div>
              <p>Your subscription changes take effect immediately with pro-rated billing calculation.</p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowUpgradeModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSimulatedUpgrade} size="sm" isLoading={isProcessing}>
                Confirm Upgrade
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
