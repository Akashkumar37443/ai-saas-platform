import { Features } from '@/components/landing/Features';
import { ModelsExplorer } from '@/components/landing/ModelsExplorer';
import { Shield, Zap, Lock, Cpu, Server, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';

export function FeaturesPage() {
  const securityFeatures = [
    { title: 'End-to-End Encryption', desc: 'TLS 1.3 in transit and AES-256 at rest for all generations and payloads.' },
    { title: 'Zero Data Retention Option', desc: 'Configure zero-logging policies so proprietary prompts are never persisted upstream.' },
    { title: 'SOC 2 & HIPAA Ready', desc: 'Built-in audit trails, role-based access control, and token rate limiting.' },
    { title: 'IP Whitelisting & API Scopes', desc: 'Restrict API key execution to designated CIDR blocks and specific scopes.' },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4">
          <Cpu className="h-3.5 w-3.5" />
          Technical Capabilities & Infrastructure
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Engineered for <span className="gradient-text">High-Throughput AI</span>
        </h1>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
          Explore the underlying architecture, security guarantees, and multi-model gateway powers behind our SaaS template.
        </p>
      </div>

      <Features />
      <ModelsExplorer />

      {/* Security & Architecture Deep-Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-semibold mb-4">
            <Shield className="h-3.5 w-3.5" />
            Enterprise Grade
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Security & Compliance <span className="gradient-text">First</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Protect your customer data with audited token hashing and multi-tenant isolation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-10 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-black text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-white">Ready to deploy this architecture?</h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Get the full source code on Codester with 1-click launch scripts and zero setup required.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button size="lg" className="shadow-xl">
                Get Started Now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
