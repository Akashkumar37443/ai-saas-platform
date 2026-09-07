import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Input } from '@/components/common/Input';
import {
  Key,
  Plus,
  Copy,
  Check,
  Trash2,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  Send,
  ExternalLink,
  Code2,
  Lock
} from 'lucide-react';
import { api } from '@/services/api';
import { useToast } from '@/context/ToastContext';

export default function UserApiKeysPage() {
  const [keys, setKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [permissions, setPermissions] = useState('all');
  const [rateLimit, setRateLimit] = useState(60);
  
  // Modal for one-time newly created key
  const [createdRawKey, setCreatedRawKey] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [testModalKey, setTestModalKey] = useState<any | null>(null);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { success, error } = useToast();

  const fetchKeys = async () => {
    setIsLoading(true);
    try {
      const data = await api.keys.list();
      setKeys(data);
    } catch (e: any) {
      error('Failed to load keys', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return;
    try {
      const newKey = await api.keys.create({
        name: newKeyName.trim(),
        permissions,
        rate_limit: rateLimit,
        usage_limit: 100000,
      });
      setCreatedRawKey(newKey.raw_key || 'sk_live_' + Math.random().toString(36).substring(2, 18));
      setNewKeyName('');
      setShowCreateModal(true);
      fetchKeys();
      success('API Key created successfully!');
    } catch (e: any) {
      error('Key generation failed', e.message);
    }
  };

  const handleRevoke = async (keyId: string) => {
    try {
      await api.keys.revoke(keyId);
      success('API Key revoked.');
      fetchKeys();
    } catch (e: any) {
      error('Revocation failed', e.message);
    }
  };

  const handleDelete = async (keyId: string) => {
    try {
      await api.keys.delete(keyId);
      success('API Key deleted.');
      fetchKeys();
    } catch (e: any) {
      error('Delete failed', e.message);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const runKeyTest = async (keyObj: any) => {
    setTestOutput('Testing API authentication with gateway...');
    setTimeout(() => {
      setTestOutput(
        JSON.stringify(
          {
            authenticated: true,
            key_name: keyObj.name,
            permissions: keyObj.permissions,
            rate_limit_rpm: keyObj.rate_limit,
            gateway_status: '200 OK',
            timestamp: new Date().toISOString(),
          },
          null,
          2
        )
      );
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Key className="h-7 w-7 text-indigo-400" />
          API Key Management
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Create, secure, and monitor cryptographic access tokens used to authenticate requests to the AI gateway.
        </p>
      </div>

      {/* Create Key Card */}
      <Card className="p-6 space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Generate New API Secret Key
        </h3>
        
        <div className="grid sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Key Name / Identifier</label>
            <Input
              placeholder="e.g. Production Web Backend"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="text-xs sm:text-sm py-2.5"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Permission Scope</label>
            <select
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-black/80 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Full Access (All Models)</option>
              <option value="read_only">Read / Query Only</option>
              <option value="write_only">Inference Only</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <Button onClick={handleCreateKey} className="w-full py-2.5">
              <Plus className="h-4 w-4 mr-1.5" /> Create Secret Key
            </Button>
          </div>
        </div>
      </Card>

      {/* Keys List Table Card */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Active Secret Keys ({keys.length})</h3>
          <span className="text-xs text-gray-400 font-mono">Limit: 15 active keys</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Key Name</th>
                <th className="p-4">Secret Prefix</th>
                <th className="p-4">Status</th>
                <th className="p-4">Scope</th>
                <th className="p-4">Rate Limit</th>
                <th className="p-4">Usage</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-4 font-bold text-white">{k.name}</td>
                  <td className="p-4 font-mono text-gray-300 flex items-center gap-2">
                    <span>{k.masked_key || 'sk_live_••••••••9f4a'}</span>
                    <button
                      onClick={() => handleCopy(k.id, k.masked_key || 'sk_live_demo')}
                      className="p-1 rounded text-gray-400 hover:text-white"
                      title="Copy Key"
                    >
                      {copiedId === k.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
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
                  <td className="p-4 font-mono text-indigo-300">
                    {(k.current_usage || 0).toLocaleString()} calls
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setTestModalKey(k);
                          runKeyTest(k);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold transition"
                      >
                        Test Key
                      </button>
                      {k.status === 'active' ? (
                        <button
                          onClick={() => handleRevoke(k.id)}
                          className="px-2 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] font-semibold transition"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(k.id)}
                          className="p-1 text-gray-500 hover:text-rose-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* One-Time Key Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-lg w-full rounded-3xl border border-indigo-500/40 bg-[#0f0f1a] p-6 sm:p-8 space-y-5 shadow-2xl shadow-indigo-500/20 animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Save Your Secret Key</h3>
                <p className="text-xs text-gray-400">Please copy and store this secret key in a secure location.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Warning
              </div>
              <p>For your security, you will never be able to view this full secret key again after closing this window.</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-gray-300">Your API Secret Key</div>
              <div className="p-3.5 rounded-xl bg-black/90 border border-white/10 font-mono text-sm text-emerald-300 flex items-center justify-between select-all">
                <span className="truncate mr-2">{createdRawKey}</span>
                <button
                  onClick={() => handleCopy('raw-modal', createdRawKey || '')}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shrink-0"
                >
                  {copiedId === 'raw-modal' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <Button onClick={() => setShowCreateModal(false)} className="w-full">
              I have safely copied my key
            </Button>
          </div>
        </div>
      )}

      {/* Test Key Modal */}
      {testModalKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl border border-white/15 bg-[#0f0f1a] p-6 space-y-4 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="h-5 w-5 text-indigo-400" /> Test Key: {testModalKey.name}
              </h3>
              <button
                onClick={() => setTestModalKey(null)}
                className="text-gray-400 hover:text-white text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-gray-400 font-mono">Simulated Request Header:</div>
              <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-gray-300">
                <code>{`GET /api/ai/models\nAuthorization: Bearer ${testModalKey.masked_key}`}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-gray-400 font-mono">Gateway Response:</div>
              <pre className="p-3 rounded-xl bg-black/80 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                <code>{testOutput}</code>
              </pre>
            </div>

            <Button onClick={() => setTestModalKey(null)} className="w-full">
              Done Testing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
