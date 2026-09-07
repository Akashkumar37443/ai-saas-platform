import { useState } from 'react';
import {
  MessageSquare,
  Image,
  Code,
  BarChart3,
  Webhook,
  Shield,
  Zap,
  Cpu,
  Layers,
  Sparkles,
  Key,
  CheckCircle2
} from 'lucide-react';

export function Features() {
  const [activeTab, setActiveTab] = useState<'text' | 'code' | 'image' | 'keys' | 'admin'>('text');

  const featureTabs = [
    {
      id: 'text',
      label: 'Multi-Model Chat',
      icon: MessageSquare,
      title: 'Real-Time Streaming Chat & Reasoning',
      description: 'Stream tokens instantly from GPT-4o, Claude 3.5, and Gemini with sub-50ms latency.',
      details: [
        'SSE Streaming protocol for ultra-smooth typing effect',
        'Automatic token usage deduction & rate limiting',
        'Configurable system prompt & temperature controls',
        'Built-in session memory and history logs'
      ],
      preview: {
        title: 'Streaming Assistant Demo',
        snippet: `// Stream response chunk by chunk\nconst source = new EventSource('/api/ai/stream');\nsource.onmessage = (event) => {\n  const token = JSON.parse(event.data).delta;\n  renderToken(token);\n};`
      }
    },
    {
      id: 'code',
      label: 'Code Generator',
      icon: Code,
      title: 'Architectural-Grade Code Synthesizer',
      description: 'Scaffold TypeScript components, async FastAPI routers, and optimized SQL queries.',
      details: [
        'Multi-language support (Python, TypeScript, SQL, Go, Rust)',
        'Syntax-highlighted code output with 1-click copy',
        'Algorithmic complexity & optimization breakdown',
        'Zero-hallucination code structure verification'
      ],
      preview: {
        title: 'Generated Python FastAPI Endpoint',
        snippet: `@router.post("/api/ai/code")\nasync def generate_code(req: CodeRequest):\n    return await ai_service.generate_code(\n        language=req.language,\n        prompt=req.prompt\n    )`
      }
    },
    {
      id: 'image',
      label: 'Image Studio',
      icon: Image,
      title: 'High-Fidelity AI Visual Generation',
      description: 'Generate photorealistic artwork, product mockups, and UI graphics with DALL-E 3.',
      details: [
        'Aspect ratio options (1024x1024, 1792x1024, 1024x1792)',
        'Style presets: Vivid, Natural, Anime, 3D Render',
        'Prompt enhancer and negative prompt controls',
        'Download and CDN asset link generation'
      ],
      preview: {
        title: 'Image API Request Payload',
        snippet: `const image = await ai.image.generate({\n  model: "dall-e-3",\n  prompt: "Futuristic neon AI workspace in 8k",\n  style: "vivid",\n  size: "1024x1024"\n});`
      }
    },
    {
      id: 'keys',
      label: 'API Key Management',
      icon: Key,
      title: 'Enterprise-Grade Key Authentication',
      description: 'Generate, mask, revoke, and meter API keys with individual rate limits and permissions.',
      details: [
        'SHA-256 cryptographic one-way key hashing',
        'Masked preview display (sk_live_•••••••9f4a)',
        'Granular permissions (All, Read-Only, Write-Only)',
        'Real-time rate limiting per minute'
      ],
      preview: {
        title: 'Header Verification Gateway',
        snippet: `// Authenticate via HTTP Header\ncurl -H "X-API-Key: sk_live_abc123456789" \\\n     https://api.yourdomain.com/api/ai/models`
      }
    },
    {
      id: 'admin',
      label: 'Admin Control Center',
      icon: Shield,
      title: 'Full Platform Oversight & Analytics',
      description: 'Manage users, grant credits, track gross revenue, monitor provider costs, and configure AI keys.',
      details: [
        'Live KPI stat cards and revenue charts',
        'User management with search, filter, and balance grants',
        'Provider API key configuration from dashboard',
        'Real-time system health and latency diagnostics'
      ],
      preview: {
        title: 'System Health Status',
        snippet: `{\n  "status": "Healthy (All Systems Operational)",\n  "gateway_latency": "38ms",\n  "database": "SQLite / PostgreSQL Ready",\n  "active_users": 2847\n}`
      }
    }
  ];

  const currentTab = featureTabs.find((t) => t.id === activeTab) || featureTabs[0];

  return (
    <section className="py-24 relative bg-[#0a0a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            Complete Feature Suite
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered For <span className="gradient-text">Production Scale</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Everything you need to run a high-margin AI SaaS: multi-modal studio, API metering, JWT security, and administrative oversight.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {featureTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20'
                    : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/5 border border-white/8'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Showcase Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-indigo-950/20 to-black backdrop-blur-2xl shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentTab.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                {currentTab.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Code / JSON Snippet Box */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-white/10 bg-black/70 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.04] border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono text-gray-400 ml-2">{currentTab.preview.title}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    FastAPI
                  </span>
                </div>
                <div className="p-5 font-mono text-xs sm:text-sm text-gray-200 overflow-x-auto leading-relaxed">
                  <pre>
                    <code>{currentTab.preview.snippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
