import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Zap,
  Shield,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Coins
} from 'lucide-react';
import { api } from '@/services/api';
import { useToast } from '@/context/ToastContext';
import { formatDate } from '@/utils/format';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', plan: 'pro', credits: 50000 });

  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [creditUser, setCreditUser] = useState<any | null>(null);
  const [creditsToAdd, setCreditsToAdd] = useState(25000);

  const { success, error } = useToast();

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await api.admin.getUsers({ search, role: roleFilter, plan: planFilter });
      setUsers(data);
    } catch (e: any) {
      error('Failed to load users', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [search, roleFilter, planFilter]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.admin.createUser(newUser);
      setShowAddModal(false);
      setNewUser({ name: '', email: '', role: 'user', plan: 'pro', credits: 50000 });
      success('User created successfully!');
      loadUsers();
    } catch (e: any) {
      error('Failed to create user', e.message);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      await api.admin.updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      success('User updated successfully!');
      loadUsers();
    } catch (e: any) {
      error('Failed to update user', e.message);
    }
  };

  const handleGrantCredits = async () => {
    if (!creditUser) return;
    try {
      await api.admin.grantCredits(creditUser.id, creditsToAdd);
      setCreditUser(null);
      success(`Granted ${creditsToAdd.toLocaleString()} credits!`);
      loadUsers();
    } catch (e: any) {
      error('Credit grant failed', e.message);
    }
  };

  const handleToggleStatus = async (userObj: any) => {
    try {
      await api.admin.updateUser(userObj.id, { is_active: !userObj.is_active });
      success(`User ${!userObj.is_active ? 'Activated' : 'Suspended'}`);
      loadUsers();
    } catch (e: any) {
      error('Status update failed', e.message);
    }
  };

  const exportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Email,Role,Plan,Credits,Active,Created'].join(',') +
      '\n' +
      users
        .map((u) =>
          [u.id, u.name, u.email, u.role, u.plan, u.credits_remaining, u.is_active, u.created_at].join(',')
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `users_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('Exported users to CSV!');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Users className="h-7 w-7 text-purple-400" />
            User Management & Permissions
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Search, filter, grant token balances, and manage all registered developer accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button onClick={exportCSV} variant="outline" size="sm">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
          </Button>
          <Button onClick={() => setShowAddModal(true)} size="sm">
            <Plus className="h-4 w-4 mr-1.5" /> Add User
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4">
        <div className="grid sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 text-xs sm:text-sm py-2"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/60 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Roles (User & Admin)</option>
              <option value="user">Standard Developers</option>
              <option value="admin">Platform Admins</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/60 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Subscription Plans</option>
              <option value="starter">Starter Plan</option>
              <option value="pro">Pro Plan</option>
              <option value="enterprise">Enterprise Plan</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">User Details</th>
                <th className="p-4">Role</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4">Token Balance</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition">
                  <td className="p-4">
                    <div className="font-bold text-white text-sm">{u.name}</div>
                    <div className="text-[11px] text-gray-400 font-mono">{u.email}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        u.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-white/5 text-gray-300'
                      }`}
                    >
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-mono text-[10px] font-bold">
                      {u.plan ? u.plan.toUpperCase() : 'PRO'}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-emerald-400 font-bold">
                    {(u.credits_remaining || 0).toLocaleString()} tokens
                  </td>
                  <td className="p-4">
                    <Badge variant={u.is_active ? 'success' : 'error'}>
                      {u.is_active ? 'Active' : 'Suspended'}
                    </Badge>
                  </td>
                  <td className="p-4 text-gray-400 font-mono">
                    {formatDate(u.created_at)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setCreditUser(u)}
                        className="px-2.5 py-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 transition"
                        title="Grant Tokens"
                      >
                        <Coins className="h-3 w-3" /> +Credits
                      </button>
                      <button
                        onClick={() => setEditingUser(u)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                        title="Edit User"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(u)}
                        className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition ${
                          u.is_active
                            ? 'text-rose-400 hover:bg-rose-500/10 border border-rose-500/20'
                            : 'text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20'
                        }`}
                      >
                        {u.is_active ? 'Ban' : 'Unban'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl border border-white/15 bg-[#0f0f1a] p-6 sm:p-8 space-y-4 shadow-2xl animate-slide-up">
            <h3 className="text-lg font-bold text-white">Add New Platform User</h3>
            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="elena@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/80 text-xs text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Plan</label>
                  <select
                    value={newUser.plan}
                    onChange={(e) => setNewUser({ ...newUser, plan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/80 text-xs text-white"
                  >
                    <option value="starter">Starter</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Initial Token Credits</label>
                <input
                  type="number"
                  value={newUser.credits}
                  onChange={(e) => setNewUser({ ...newUser, credits: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Create User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl border border-white/15 bg-[#0f0f1a] p-6 sm:p-8 space-y-4 shadow-2xl animate-slide-up">
            <h3 className="text-lg font-bold text-white">Edit User: {editingUser.name}</h3>
            <form onSubmit={handleUpdateUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Subscription Plan</label>
                  <select
                    value={editingUser.plan}
                    onChange={(e) => setEditingUser({ ...editingUser, plan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/80 text-xs text-white"
                  >
                    <option value="starter">Starter</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/80 text-xs text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button type="button" variant="outline" size="sm" onClick={() => setEditingUser(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grant Tokens Modal */}
      {creditUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full rounded-3xl border border-emerald-500/30 bg-[#0f0f1a] p-6 space-y-4 shadow-2xl animate-slide-up">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Coins className="h-5 w-5 text-emerald-400" /> Grant Credits to {creditUser.name}
            </h3>
            <p className="text-xs text-gray-400">
              Current balance: <strong className="text-emerald-400 font-mono">{(creditUser.credits_remaining || 0).toLocaleString()} tokens</strong>
            </p>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-300">Tokens to Add</label>
              <div className="grid grid-cols-3 gap-2">
                {[10000, 50000, 100000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setCreditsToAdd(amt)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold border transition ${
                      creditsToAdd === amt
                        ? 'border-emerald-500 bg-emerald-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    +{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setCreditUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleGrantCredits} size="sm">
                Confirm Grant
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
