export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  createdAt: string
  apiCalls: number
}

export interface ApiKey {
  id: string
  name: string
  key: string
  userId: string
  status: 'active' | 'revoked'
  createdAt: string
  lastUsed: string | null
  usageLimit: number
  currentUsage: number
}

export interface AnalyticsData {
  date: string
  apiCalls: number
  users: number
  revenue: number
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
}

export interface PricingTier {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
}
