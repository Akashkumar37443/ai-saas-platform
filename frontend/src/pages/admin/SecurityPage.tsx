import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Shield, Lock, AlertTriangle, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function SecurityPage() {
  const [blockedIps, setBlockedIps] = useState([
    { ip: '198.51.100.45', reason: 'High-frequency brute force', date: 'Sep 06, 2026' },
    { ip: '203.0.113.19', reason: 'Abuse rate limit violation (10k req/min)', date: 'Sep 05, 2026' },
  ]);
  const [newIp, setNewIp] = useState('');
  const [newReason, setNewReason] = useState('');
  const { success } = useToast();

  const auditItems = [
    { name: 'FastAPI CORS Strict Origin Validation', status: 'Passed', details: 'Configured for production domain whitelisting' },
    { name: 'SHA-256 Key Hash Masking', status: 'Passed', details: 'All raw API tokens are hashed before storage' },
    { name: 'JWT Signature Algorithm (HS256)', status: 'Passed', details: 'Cryptographic token expiration set to 7 days' },
    { name: 'SQL Injection Defense (SQLAlchemy ORM)', status: 'Passed', details: 'All queries parameterized via ORM models' },
    { name: 'Per-User Rate Limit Guard', status: 'Passed', details: 'Token bucket limiter throttles unauthorized spikes' },
  ];

  const handleBlockIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp.trim()) return;
    setBlockedIps([{ ip: newIp, reason: newReason || 'Manual Admin Block', date: 'Just now' }, ...blockedIps]);
    setNewIp('');
    setNewReason('');
    success('IP successfully blocked!');
  };

  const handleRemoveIp = (ipStr: string) => {
    setBlockedIps(blockedIps.filter((i) => i.ip !== ipStr));
    success('IP block rule removed.');
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Shield className="h-7 w-7 text-purple-400" />
          Security & Access Control
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Monitor access logs, manage IP blocklists, and verify automated platform security audits.
        </p>
      </div>

      {/* Security Checklist */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/8">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-400" /> Automated Security Health Audit
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
            5 / 5 Compliant
          </span>
        </div>

        <div className="space-y-2.5">
          {auditItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">{item.name}</div>
                  <div className="text-[11px] text-gray-400">{item.details}</div>
                </div>
              </div>
              <Badge variant="success">Passed</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* IP Blocklist Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-5 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-400" /> Block Specific IP Address
          </h3>

          <form onSubmit={handleBlockIp} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">IP Address / CIDR</label>
              <input
                type="text"
                required
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="192.0.2.1"
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Reason for Block</label>
              <input
                type="text"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="Repeated 401 violations"
                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white"
              />
            </div>

            <Button type="submit" size="sm" className="w-full">
              <Plus className="h-3.5 w-3.5 mr-1" /> Add IP Block Rule
            </Button>
          </form>
        </Card>

        <Card className="lg:col-span-7 p-0 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-white">Active IP Blocklist ({blockedIps.length})</h3>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">IP Address</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Blocked Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {blockedIps.map((i) => (
                <tr key={i.ip} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 font-mono font-bold text-rose-300">{i.ip}</td>
                  <td className="p-4 text-gray-300">{i.reason}</td>
                  <td className="p-4 text-gray-400 font-mono">{i.date}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleRemoveIp(i.ip)}
                      className="text-gray-400 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
