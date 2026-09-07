import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Star,
  Terminal,
  Copy,
  Check,
  Activity
} from 'lucide-react';
import { Button } from '../common/Button';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export function Hero() {
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [userPrompt, setUserPrompt] = useState('Generate an asynchronous Python API endpoint for streaming AI completions.');
  const [generatedOutput, setGeneratedOutput] = useState<string>(
    `# High-Performance FastAPI AI Endpoint\nfrom fastapi import FastAPI\nfrom fastapi.responses import StreamingResponse\nimport asyncio\n\napp = FastAPI()\n\nasync def stream_generator(prompt: str):\n    for chunk in ["⚡ Connecting to ", "${selectedModel}", " inference engine...", "\\n\\n", "Optimized completion ready in 38ms."]:\n        yield f"data: {chunk}\\n\\n"\n        await asyncio.sleep(0.04)\n\n@app.post("/api/ai/stream")\nasync def stream_endpoint(prompt: str):\n    return StreamingResponse(stream_generator(prompt), media_type="text/event-stream")`
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [latency, setLatency] = useState(38);
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleTestInference = async () => {
    setIsGenerating(true);
    const start = Date.now();
    try {
      const res = await api.ai.chat(selectedModel, [{ role: 'user', content: userPrompt }]);
      setGeneratedOutput(res.content);
      setLatency(Math.max(28, Date.now() - start));
    } catch {
      setGeneratedOutput(
        `// Stream generated from ${selectedModel} (FastAPI Gateway)\n` +
        `export async function runAIService() {\n` +
        `  const res = await fetch('/api/ai/stream', {\n` +
        `    method: 'POST',\n` +
        `    body: JSON.stringify({ prompt: "${userPrompt.replace(/"/g, '\\"')}" })\n` +
        `  });\n` +
        `  return res;\n` +
        `}`
      );
      setLatency(42);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuickLogin = async (role: 'user' | 'admin') => {
    await demoLogin(role);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  const stats = [
    { value: '99.99%', label: 'Uptime SLA', icon: '🔒' },
    { value: '<38ms', label: 'Average Latency', icon: '⚡' },
    { value: '50+', label: 'Flagship Models', icon: '🤖' },
    { value: '10M+', label: 'Daily API Calls', icon: '📡' },
  ];

  const modelOptions = [
    { id: 'gpt-4o', label: 'GPT-4o (Omni)' },
    { id: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
    { id: 'gemini-1-5-pro', label: 'Gemini 1.5 Pro' },
    { id: 'llama-3-3-70b', label: 'Llama 3.3 (70B)' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#0a0a0f]">
      {/* Dynamic ambient gradient glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="orb w-[650px] h-[650px] -top-40 -left-40 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
        />
        <div
          className="orb w-[550px] h-[550px] top-1/4 -right-32 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(217,70,239,0.18) 0%, transparent 70%)', animationDelay: '2s' }}
        />
        <div
          className="orb w-[400px] h-[400px] bottom-10 left-1/3 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)', animationDelay: '4s' }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold text-indigo-300">
                FastAPI + React 18 Production Template
              </span>
              <span className="text-gray-400 text-xs">•</span>
              <span className="text-yellow-400 flex items-center gap-1 text-xs font-semibold">
                <Star className="h-3 w-3 fill-current" /> 5.0 Rated
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              The Ultimate <br />
              <span className="gradient-text">AI SaaS Starter Kit</span> <br />
              For Rapid Launch.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Connect to <strong className="text-white">50+ AI models</strong> with an ultra-fast Python FastAPI backend, rich developer studio, token metering, API key lifecycle management, and full admin control.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
              <Link to="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group shadow-xl shadow-indigo-500/25">
                  Launch Your Platform
                  <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/docs" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Terminal className="h-4 w-4 mr-1.5 text-indigo-400" />
                  View API Docs
                </Button>
              </Link>
            </div>

            {/* 1-Click Instant Demo Launchers */}
            <div className="pt-2 border-t border-white/8">
              <div className="text-xs text-gray-400 mb-2.5 font-medium flex items-center justify-center lg:justify-start gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Try Live Demo with 1-Click:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <button
                  onClick={() => handleQuickLogin('user')}
                  className="px-3.5 py-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <span>🧑</span> Developer Studio Demo
                </button>
                <button
                  onClick={() => handleQuickLogin('admin')}
                  className="px-3.5 py-1.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <span>🛡️</span> Admin Dashboard Demo
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive AI Sandbox Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl border border-white/15 bg-white/[0.03] backdrop-blur-2xl p-5 sm:p-6 shadow-2xl shadow-indigo-950/40">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 ml-2">fastapi-gateway.ai</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-[11px] font-mono border border-emerald-500/30 flex items-center gap-1">
                    <Activity className="h-3 w-3 animate-pulse" /> {latency}ms
                  </span>
                </div>
              </div>

              {/* Model Selector Bar */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {modelOptions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      selectedModel === m.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Interactive Prompt Input */}
              <div className="mt-3.5 space-y-2">
                <div className="relative">
                  <textarea
                    rows={2}
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Enter an instruction or prompt to test..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-black/40 text-gray-200 text-xs sm:text-sm font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  <button
                    onClick={handleTestInference}
                    disabled={isGenerating}
                    className="absolute right-2.5 bottom-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1 shadow transition"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    {isGenerating ? 'Running...' : 'Run Test'}
                  </button>
                </div>
              </div>

              {/* Live Output Screen */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <Terminal className="h-3.5 w-3.5 text-indigo-400" /> Response Output
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="max-h-56 overflow-y-auto p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {generatedOutput}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-sm text-center lg:text-left hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
                <span>{s.icon}</span>
                <span className="gradient-text">{s.value}</span>
              </div>
              <div className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
