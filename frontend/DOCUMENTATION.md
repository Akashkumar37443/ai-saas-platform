# AI SaaS Platform — Full Documentation

> A production-ready AI SaaS Platform starter template built with **React 18**, **TypeScript**, **Vite**, and **TailwindCSS**.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Getting Started](#getting-started)
6. [Configuration](#configuration)
7. [Pages & Routes](#pages--routes)
8. [Components Reference](#components-reference)
9. [Admin Panel](#admin-panel)
10. [Customization Guide](#customization-guide)
11. [Deployment](#deployment)
12. [Browser Compatibility](#browser-compatibility)
13. [Changelog](#changelog)
14. [Support](#support)

---

## Overview

The **AI SaaS Platform** template is a complete, professional starter kit for launching an AI-powered SaaS product. It includes a fully designed marketing landing page, a multi-page admin dashboard with analytics, user management, API key management, and authentication pages — all built with modern best practices.

---

## Features

### 🚀 Landing Page
- Animated hero section with stats bar
- Feature showcase grid (9 features)
- 3-tier pricing section (Starter / Pro / Enterprise)
- Full footer with links and newsletter placeholder
- Responsive navigation with mobile menu

### 🔐 Authentication
- Login page with form validation
- Registration page with email/password fields
- Admin login page (separate authentication)

### 📊 Admin Dashboard
- **Dashboard** — KPI stat cards + live area chart + recent activity
- **Users** — Data table with user list, status badges, search/filter
- **API Keys** — API key management with reveal/copy/revoke actions
- **Analytics** — Usage charts, cost analysis, model breakdown table

### 🎨 Design System
- Custom Tailwind color palette (primary blue + accent purple)
- Reusable component library (Button, Card, Input, Table, Badge)
- Google Fonts (Inter) typography
- Smooth transitions and hover effects
- Fully responsive (mobile-first)

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2 | UI Framework |
| TypeScript | 5.2 | Type Safety |
| Vite | 5.0 | Build Tool & Dev Server |
| TailwindCSS | 3.3 | Utility-First CSS |
| React Router DOM | 6.20 | Client-Side Routing |
| Recharts | 2.10 | Data Visualization |
| Lucide React | 0.294 | Icon Library |
| clsx + tailwind-merge | 2.0 | Class Name Utilities |

---

## Folder Structure

```
ai-saas-platform/
├── public/
│   └── _redirects              # Netlify SPA redirect rule
├── src/
│   ├── components/
│   │   ├── common/             # Shared UI components
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Table.tsx
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── Chart.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── StatCard.tsx
│   │   └── landing/            # Landing page sections
│   │       ├── Features.tsx
│   │       ├── Footer.tsx
│   │       ├── Hero.tsx
│   │       ├── Navbar.tsx
│   │       └── Pricing.tsx
│   ├── pages/
│   │   ├── admin/              # Admin panel pages
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminLoginPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   ├── ApiKeysPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   └── UsersPage.tsx
│   │   ├── auth/               # Authentication pages
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   └── landing/            # Public marketing pages
│   │       ├── FeaturesPage.tsx
│   │       ├── HomePage.tsx
│   │       ├── LandingLayout.tsx
│   │       └── PricingPage.tsx
│   ├── styles/
│   │   └── index.css           # Global styles + Tailwind layers
│   ├── types/                  # TypeScript type definitions
│   ├── utils/
│   │   └── cn.ts               # Class name utility (clsx + twMerge)
│   ├── App.tsx                 # Root component with all routes
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── netlify.toml                # Netlify deployment config
└── DOCUMENTATION.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn / pnpm)

### Installation

```bash
# 1. Extract the downloaded zip
unzip ai-saas-platform.zip
cd ai-saas-platform

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on all TypeScript/TSX files |

---

## Configuration

### Colors (tailwind.config.js)

The design system uses two main color palettes that you can customize:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        // Blue palette — change to your brand color
        500: '#3b82f6',
        600: '#2563eb',
        // ...
      },
      accent: {
        // Purple palette — change to your accent color
        500: '#d946ef',
        600: '#c026d3',
        // ...
      }
    }
  }
}
```

To change the brand color, simply update the `primary` hex values to match your brand.

### Fonts

The template uses **Inter** from Google Fonts, loaded via `index.html`. To change the font:

1. Replace the Google Fonts `<link>` tag in `index.html`
2. Update `fontFamily.sans` in `tailwind.config.js`

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Marketing landing page (Hero + Features + Pricing) |
| `/features` | `FeaturesPage` | Full features showcase |
| `/pricing` | `PricingPage` | Pricing tiers page |
| `/login` | `LoginPage` | User login |
| `/register` | `RegisterPage` | User registration |
| `/admin/login` | `AdminLoginPage` | Admin authentication |
| `/admin` | `DashboardPage` | Admin dashboard overview |
| `/admin/users` | `UsersPage` | User management table |
| `/admin/api-keys` | `ApiKeysPage` | API key management |
| `/admin/analytics` | `AnalyticsPage` | Usage analytics & charts |

### Admin Access

**Default credentials** (for demo/development):
- Email: `admin@example.com`
- Password: `admin123`

> ⚠️ **Important**: Replace the hardcoded authentication with a real backend before deploying to production.

---

## Components Reference

### Common Components

#### `<Button>`
```tsx
import { Button } from '@/components/common/Button'

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

**Props:**
| Prop | Type | Default | Options |
|------|------|---------|---------|
| `variant` | string | `'primary'` | `'primary' \| 'outline' \| 'ghost'` |
| `size` | string | `'md'` | `'sm' \| 'md' \| 'lg'` |
| `disabled` | boolean | `false` | — |
| `className` | string | — | Additional CSS classes |

#### `<Card>` / `<CardHeader>` / `<CardContent>`
```tsx
import { Card, CardHeader, CardContent } from '@/components/common/Card'

<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

#### `<Input>`
```tsx
import { Input } from '@/components/common/Input'

<Input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  error="Please enter a valid email"
/>
```

#### `<Badge>`
```tsx
import { Badge } from '@/components/common/Badge'

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Suspended</Badge>
```

#### `<Table>` family
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell><Badge variant="success">Active</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Dashboard Components

#### `<StatCard>`
```tsx
import { StatCard } from '@/components/dashboard/StatCard'

<StatCard
  title="Total Users"
  value={12847}
  change={12.5}
  changeLabel="vs last month"
  isCurrency={false}
/>
```

#### `<Chart>`
```tsx
import { Chart } from '@/components/dashboard/Chart'

const data = [
  { date: 'Week 1', value: 45000 },
  { date: 'Week 2', value: 52000 },
]

<Chart
  title="API Usage Over Time"
  data={data}
  dataKey="value"
  color="#3b82f6"
/>
```

---

## Admin Panel

The admin panel at `/admin` uses localStorage-based token authentication for the demo. Here is how to integrate a real backend:

### Connecting to a Real API

1. **Replace `AdminLoginPage.tsx`** — call your auth API endpoint and store the JWT token:
```tsx
const response = await fetch('/api/auth/admin/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
  headers: { 'Content-Type': 'application/json' },
})
const { token } = await response.json()
localStorage.setItem('adminToken', token)
```

2. **Add an auth guard** — in `AdminLayout.tsx`, verify the token on each route change:
```tsx
const token = localStorage.getItem('adminToken')
if (!token) navigate('/admin/login')
```

3. **Replace mock data** — swap the `mock*` arrays in each page with real API calls using `useEffect` + `fetch`.

---

## Customization Guide

### Changing the Brand Name

Search and replace `AI Platform` throughout the source files:
```bash
grep -r "AI Platform" src/
```

### Adding a New Admin Page

1. Create `src/pages/admin/NewPage.tsx`
2. Add to the navigation in `src/components/dashboard/Sidebar.tsx`:
```tsx
const navigation = [
  // ... existing items
  { name: 'New Page', href: '/admin/new', icon: YourIcon },
]
```
3. Register the route in `src/App.tsx`:
```tsx
<Route path="new" element={<NewPage />} />
```

### Adding a New Landing Section

1. Create `src/components/landing/NewSection.tsx`
2. Import and use it in `src/pages/landing/HomePage.tsx`

### Updating Pricing Plans

Edit the `tiers` array at the top of `src/components/landing/Pricing.tsx` — no other changes needed.

---

## Deployment

### Netlify (Recommended)

The project includes a pre-configured `netlify.toml`:

```bash
# Option 1: Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod

# Option 2: Drag & Drop
npm run build
# Upload the dist/ folder to netlify.com/drop
```

### Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

### GitHub Pages / Any Static Host

```bash
npm run build
# Deploy the contents of dist/ to your host
```

> **Important**: For SPA routing to work on any host, you need to redirect all 404s to `index.html`. The `public/_redirects` file handles this for Netlify automatically.

---

## Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Google Chrome | 90+ |
| Mozilla Firefox | 88+ |
| Microsoft Edge | 90+ |
| Safari | 14+ |
| Opera | 76+ |

> Internet Explorer is **not** supported.

---

## Changelog

### v1.0.0 — Initial Release
- ✅ Landing page (Hero, Features, Pricing, Footer, Navbar)
- ✅ Authentication pages (Login, Register)
- ✅ Admin authentication
- ✅ Admin Dashboard with KPIs and chart
- ✅ Users management page
- ✅ API Keys management page
- ✅ Analytics page with dual charts and model breakdown
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ TypeScript throughout
- ✅ Netlify deployment config

---

## Support

If you have questions or need help customizing the template, please:

1. Check this documentation first
2. Leave a comment on the product page
3. Contact via the Codester messaging system

**Response time**: Within 24–48 hours on business days.

---

*Built with ❤️ using React, TypeScript, and TailwindCSS.*
