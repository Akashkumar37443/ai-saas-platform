import { Card, CardHeader, CardContent } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, Lock } from 'lucide-react'

const auditLogs = [
  { id: 'LOG-8812', action: 'API Key Created', user: 'admin@example.com', ip: '192.168.1.1', time: '12 mins ago', level: 'info' },
  { id: 'LOG-8811', action: 'Admin Session Login', user: 'admin@example.com', ip: '192.168.1.1', time: '1 hour ago', level: 'info' },
  { id: 'LOG-8810', action: 'Rate Limit Warning', user: 'user@example.com', ip: '45.33.21.9', time: '3 hours ago', level: 'warning' },
  { id: 'LOG-8809', action: 'Password Change Request', user: 'sarah@cyberdyne.io', ip: '172.56.2.88', time: '6 hours ago', level: 'info' },
]

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-emerald-400" />
            Security & Audit Logs
          </h1>
          <p className="text-sm text-gray-400 mt-1">Real-time threat monitoring, SOC 2 compliance, and audit trail</p>
        </div>
        <Badge variant="success" size="md">
          <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> SOC 2 Type II Compliant
        </Badge>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 border-emerald-500/30 bg-emerald-500/5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">SSL / TLS 1.3</div>
              <div className="text-xs text-gray-400">256-bit Encryption Active</div>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-primary-500/30 bg-primary-500/5">
          <div className="flex items-center gap-3">
            <Lock className="h-8 w-8 text-primary-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">DDoS Shield</div>
              <div className="text-xs text-gray-400">Cloudflare Edge Defense</div>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-amber-500/30 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-amber-400 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">Threat Prevention</div>
              <div className="text-xs text-gray-400">0 Security Alerts Detected</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardHeader className="py-4 border-b border-white/8 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">System Audit Trail</h3>
          </div>
          <Button variant="outline" size="sm" className="text-xs">Export CSV</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{log.action}</span>
                    <Badge variant={log.level === 'warning' ? 'warning' : 'info'}>{log.level}</Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    User: {log.user} • IP: <span className="font-mono">{log.ip}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-mono">{log.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
