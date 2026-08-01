import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Input } from '@/components/common/Input'
import { Key, Plus, Copy, Check, Trash2, Eye } from 'lucide-react'

const initialKeys = [
  { id: '1', name: 'Web Application Key', key: 'sk_live_98a76f...4b21', created: 'Jan 10, 2024', lastUsed: '2 mins ago', status: 'active' },
  { id: '2', name: 'Mobile App Secret', key: 'sk_live_12c34d...9e87', created: 'Jan 04, 2024', lastUsed: '1 hour ago', status: 'active' },
]

export default function UserApiKeysPage() {
  const [keys, setKeys] = useState(initialKeys)
  const [newKeyName, setNewKeyName] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return
    const createdKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk_live_${Math.random().toString(36).substr(2, 8)}...${Math.random().toString(36).substr(2, 4)}`,
      created: 'Just now',
      lastUsed: 'Never',
      status: 'active',
    }
    setKeys([createdKey, ...keys])
    setNewKeyName('')
  }

  const handleCopy = (id: string, secret: string) => {
    navigator.clipboard.writeText(secret)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Key className="h-7 w-7 text-accent-400" />
          My API Keys
        </h1>
        <p className="text-sm text-gray-400 mt-1">Manage secret keys used to authenticate your application with our AI APIs</p>
      </div>

      {/* Create Key Card */}
      <Card className="p-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Create New API Secret Key</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="e.g. Production Backend Service"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            className="flex-1 text-sm"
          />
          <Button onClick={handleCreateKey} className="shrink-0">
            <Plus className="h-4 w-4 mr-1.5" /> Generate Key
          </Button>
        </div>
      </Card>

      {/* Keys List */}
      <Card>
        <CardHeader className="py-4 border-b border-white/8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Secret Keys</h3>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {keys.map((k) => (
              <div key={k.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{k.name}</span>
                    <Badge variant="success">{k.status}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-2">
                    <span>{k.key}</span>
                    <button
                      onClick={() => handleCopy(k.id, k.key)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedId === k.id ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div>Used: <span className="text-gray-300">{k.lastUsed}</span></div>
                  <button
                    onClick={() => setKeys(keys.filter((item) => item.id !== k.id))}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
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
