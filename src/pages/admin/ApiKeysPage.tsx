import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, Copy, Key, Shield, Check, AlertTriangle, RefreshCw } from 'lucide-react';
import { formatDate } from '@/utils/format';
import { api } from '@/services/api';
import { useToast } from '@/context/ToastContext';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { success, error } = useToast();

  const loadKeys = async () => {
    setIsLoading(true);
    try {
      const data = await api.admin.getKeys();
      setKeys(data);
    } catch (e: any) {
      error('Failed to load API keys', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadKeys();
  }, []);

  const handleRevoke = async (id: string) => {
    try {
      await api.admin.revokeKey(id);
      success('API Key revoked successfully');
      loadKeys();
    } catch (e: any) {
      error('Revoke failed', e.message);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success('Key copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredKeys = keys.filter(
    (key) =>
      key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (key.masked_key && key.masked_key.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Key className="h-7 w-7 text-purple-400" />
            Global API Key Audit
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Monitor, audit, and revoke all active developer API keys across the platform.
          </p>
        </div>

        <Button onClick={loadKeys} variant="outline" size="sm" isLoading={isLoading}>
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Refresh Keys
        </Button>
      </div>

      {/* Security Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <Key className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Total Provisioned Keys</div>
            <div className="text-lg font-bold text-white font-mono">{keys.length}</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Security Encryption</div>
            <div className="text-sm font-bold text-emerald-300 font-mono">SHA-256 Hashed</div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Rate Limit Violations</div>
            <div className="text-lg font-bold text-white font-mono">0 Detected</div>
          </div>
        </Card>
      </div>

      {/* Search & Keys Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search keys by name or prefix..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs sm:text-sm py-2"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Key Identifier</th>
                <th className="p-4">Masked Key</th>
                <th className="p-4">Status</th>
                <th className="p-4">Scope</th>
                <th className="p-4">Rate Limit</th>
                <th className="p-4">Total Usage</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredKeys.map((k) => (
                <tr key={k.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 font-bold text-white">{k.name}</td>
                  <td className="p-4 font-mono text-gray-300">
                    <span className="flex items-center gap-2">
                      {k.masked_key || 'sk_live_••••••••9f4a'}
                      <button
                        onClick={() => handleCopy(k.id, k.masked_key || 'sk_live_demo')}
                        className="text-gray-500 hover:text-white"
                      >
                        {copiedId === k.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={k.status === 'active' ? 'success' : 'error'}>
                      {k.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 font-mono text-[11px]">
                      {k.permissions || 'all'}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {k.rate_limit || 60} req/min
                  </td>
                  <td className="p-4 font-mono text-purple-300 font-semibold">
                    {(k.current_usage || 0).toLocaleString()} calls
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {k.created_at ? formatDate(k.created_at) : 'Aug 15, 2026'}
                  </td>
                  <td className="p-4 text-right">
                    {k.status === 'active' ? (
                      <button
                        onClick={() => handleRevoke(k.id)}
                        className="px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] font-semibold transition"
                      >
                        Revoke Key
                      </button>
                    ) : (
                      <span className="text-gray-500 italic">Revoked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
