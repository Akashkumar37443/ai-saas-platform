import { useState } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'
import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Search, Plus } from 'lucide-react'
import { formatDate } from '@/utils/format'
import type { User } from '@/types'

const mockUsers: User[] = [
  { id: '1', email: 'john@example.com', name: 'John Doe', role: 'user', status: 'active', createdAt: '2024-01-15', apiCalls: 15420 },
  { id: '2', email: 'jane@example.com', name: 'Jane Smith', role: 'admin', status: 'active', createdAt: '2024-01-14', apiCalls: 8930 },
  { id: '3', email: 'bob@example.com', name: 'Bob Johnson', role: 'user', status: 'inactive', createdAt: '2024-01-13', apiCalls: 420 },
  { id: '4', email: 'alice@example.com', name: 'Alice Williams', role: 'user', status: 'active', createdAt: '2024-01-12', apiCalls: 28100 },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Users</h1>
          <p className="text-sm text-gray-400 mt-1">Manage platform registered accounts and permissions</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b border-white/8">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
              <Input
                placeholder="Search users..."
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
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>API Calls</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-semibold text-white">{user.name}</TableCell>
                  <TableCell className="text-gray-300">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'info' : 'default'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'success' : 'error'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300 font-mono">{user.apiCalls.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-400">{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
