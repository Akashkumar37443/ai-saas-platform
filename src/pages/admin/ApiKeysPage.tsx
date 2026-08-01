import { useState } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Search, Plus, Copy, Trash2, Key } from 'lucide-react'
import { formatDate } from '@/utils/format'
import type { ApiKey } from '@/types'

const mockApiKeys: ApiKey[] = [
  { id: '1', name: 'Production API', key: 'sk_live_xxxxxxxxxxxxx', userId: '1', status: 'active', createdAt: '2024-01-15', lastUsed: '2024-01-19', usageLimit: 100000, currentUsage: 45230 },
  { id: '2', name: 'Development API', key: 'sk_test_xxxxxxxxxxxxx', userId: '1', status: 'active', createdAt: '2024-01-14', lastUsed: '2024-01-19', usageLimit: 50000, currentUsage: 12340 },
  { id: '3', name: 'Old API Key', key: 'sk_old_xxxxxxxxxxxxxx', userId: '2', status: 'revoked', createdAt: '2024-01-10', lastUsed: '2024-01-12', usageLimit: 10000, currentUsage: 10000 },
]

export default function ApiKeysPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredKeys = mockApiKeys.filter(key =>
    key.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Key className="h-7 w-7 text-accent-400" />
            API Keys
          </h1>
          <p className="text-sm text-gray-400 mt-1">Create, revoke, and monitor API key usage across the platform</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Create New Key
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b border-white/8">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
              <Input
                placeholder="Search API keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-semibold text-white">{apiKey.name}</TableCell>
                  <TableCell className="font-mono text-sm text-gray-400">{apiKey.key}</TableCell>
                  <TableCell>
                    <Badge variant={apiKey.status === 'active' ? 'success' : 'error'}>
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${apiKey.usageLimit > 0 ? (apiKey.currentUsage / apiKey.usageLimit) * 100 : 0}%`,
                            background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 font-mono">
                        {apiKey.usageLimit > 0 ? ((apiKey.currentUsage / apiKey.usageLimit) * 100).toFixed(0) : 0}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{apiKey.lastUsed ? formatDate(apiKey.lastUsed) : 'Never'}</TableCell>
                  <TableCell className="text-gray-400">{formatDate(apiKey.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-white transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
