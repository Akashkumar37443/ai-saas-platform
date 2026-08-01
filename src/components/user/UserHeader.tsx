import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/common/Input'

export function UserHeader() {
  return (
    <header
      className="sticky top-0 z-10 border-b border-white/8 backdrop-blur-xl"
      style={{ background: 'rgba(10,10,15,0.85)' }}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <div className="w-10 md:hidden" />

        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
            <Input
              placeholder="Search AI docs, API keys, models..."
              className="pl-10 text-sm py-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/8 transition-all">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary-500" />
          </button>

          <div className="w-px h-6 bg-white/10" />

          <div className="flex items-center gap-3 pl-1">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xs shadow-glow">
              AT
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-white">Akash Thakur</p>
              <p className="text-xs text-primary-400 font-medium">Pro Plan Member</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
