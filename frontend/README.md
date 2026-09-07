# AI SaaS Platform Template

A modern, responsive React template for AI/ML service platforms.

## Features

### Landing Pages
- **Home**: Hero section with code demo, stats, CTAs
- **Features**: 9 feature cards with icons
- **Pricing**: 3-tier pricing table

### Admin Panel
- **Dashboard**: Stats cards, usage charts, revenue analytics
- **Users**: User management with search and filters
- **API Keys**: Key management with usage tracking
- **Analytics**: Detailed usage and cost breakdown

## Project Structure

```
src/
├── components/
│   ├── common/          # Button, Card, Input, Badge, Table
│   ├── landing/         # Navbar, Footer, Hero, Features, Pricing
│   └── dashboard/       # Sidebar, StatCard, Chart
├── pages/
│   ├── landing/         # LandingLayout, HomePage, FeaturesPage, PricingPage
│   └── admin/           # AdminLayout, DashboardPage, UsersPage, ApiKeysPage, AnalyticsPage
├── types/               # TypeScript interfaces
├── utils/               # cn, format helpers
└── styles/              # Tailwind CSS
```

## Routes

- `/` - Landing home
- `/features` - Features page
- `/pricing` - Pricing page
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/api-keys` - API key management
- `/admin/analytics` - Analytics

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
