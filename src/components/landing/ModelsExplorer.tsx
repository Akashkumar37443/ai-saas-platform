import { useState } from 'react';
import { Cpu, Zap, Check, ArrowUpRight, Shield, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ModelsExplorer() {
  const models = [
    {
      id: 'gpt-4o',
      name: 'GPT-4o (Omni)',
      provider: 'OpenAI',
      badge: 'Most Popular',
      category: 'Multi-Modal Flagship',
      context: '128,000 Tokens',
      latency: '42ms',
      cost: '$0.005 / 1k tokens',
      strengths: ['Complex Reasoning', 'Multi-Turn Chat', 'Vision & Audio Ingestion', 'JSON Mode'],
      speedRating: 94,
      accuracyRating: 98,
    },
    {
      id: 'claude-3-5',
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      badge: 'Best for Coding',
      category: 'Engineering & Logic',
      context: '200,000 Tokens',
      latency: '58ms',
      cost: '$0.003 / 1k tokens',
      strengths: ['Software Architecture', 'Deep Code Refactoring', 'Long-Document Synthesis', 'Zero Hallucination'],
      speedRating: 90,
      accuracyRating: 99,
    },
    {
      id: 'gemini-1-5',
      name: 'Gemini 1.5 Pro',
      provider: 'Google',
      badge: '1M Context',
      category: 'Massive Document Ingestion',
      context: '1,000,000 Tokens',
      latency: '62ms',
      cost: '$0.0035 / 1k tokens',
      strengths: ['Repository-Wide Ingestion', 'Multi-Hour Video Processing', 'Cross-Lingual Search'],
      speedRating: 88,
      accuracyRating: 96,
    },
    {
      id: 'llama-3-3',
      name: 'Llama 3.3 (70B)',
      provider: 'Meta / Groq',
      badge: 'Blazing Fast',
      category: 'Open Weights & Low Cost',
      context: '128,000 Tokens',
      latency: '18ms',
      cost: '$0.0008 / 1k tokens',
      strengths: ['Sub-20ms TTFT', 'High-Volume Batch Inference', 'Edge Deployable', 'Cost-Effective'],
      speedRating: 99,
      accuracyRating: 93,
    },
    {
      id: 'dall-e-3',
      name: 'DALL-E 3 HD',
      provider: 'OpenAI',
      badge: 'Creative Art',
      category: 'Visual Synthesis',
      context: '1024x1024 to 1792x1024',
      latency: '320ms',
      cost: '$0.040 / image',
      strengths: ['Prompt Fidelity', 'Photorealistic Text In-Image', 'Artistic Styles', 'HD Upscaling'],
      speedRating: 82,
      accuracyRating: 97,
    },
    {
      id: 'whisper-v3',
      name: 'Whisper v3 Large',
      provider: 'OpenAI',
      badge: 'Speech & Audio',
      category: 'Voice Recognition',
      context: 'Up to 25MB Audio',
      latency: '85ms',
      cost: '$0.006 / minute',
      strengths: ['99+ Languages', 'Automatic Translation', 'Timestamp Alignment', 'Noise Filtering'],
      speedRating: 95,
      accuracyRating: 98,
    },
  ];

  const [selectedId, setSelectedId] = useState('gpt-4o');
  const activeModel = models.find((m) => m.id === selectedId) || models[0];

  return (
    <section id="models" className="py-24 relative bg-[#0a0a0f]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            Unified Model Gateway
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Connect to the World's Best <br />
            <span className="gradient-text">AI Foundation Models</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Switch between state-of-the-art LLMs with a single parameter change. No rewriting client code.
          </p>
        </div>

        {/* Model Grid / Interactive Selector */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Models Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {models.map((m) => {
              const isSelected = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-600/15 text-white shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                      : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">{m.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-mono">
                        {m.provider}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">{m.category}</div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      ⚡ {m.latency}
                    </span>
                    <span className="text-[10px] text-gray-500">{m.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Model Card Inspector */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-indigo-950/20 to-black/60 backdrop-blur-2xl shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white">{activeModel.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                      {activeModel.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{activeModel.category} • Provider: {activeModel.provider}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Pricing</div>
                  <div className="text-base font-mono font-bold text-white mt-0.5">{activeModel.cost}</div>
                </div>
              </div>

              {/* Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-b border-white/10">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/8">
                  <div className="text-[11px] text-gray-400 font-medium">Context Window</div>
                  <div className="text-sm font-bold text-white mt-1 font-mono">{activeModel.context}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/8">
                  <div className="text-[11px] text-gray-400 font-medium">TTFT Latency</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1 font-mono">⚡ {activeModel.latency}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/8 col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-gray-400 font-medium">Accuracy Benchmark</div>
                  <div className="text-sm font-bold text-indigo-400 mt-1 font-mono">{activeModel.accuracyRating}% Score</div>
                </div>
              </div>

              {/* Key Strengths */}
              <div className="py-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Core Capabilities</h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activeModel.strengths.map((st, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-200">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example SDK Usage */}
              <div className="pt-4">
                <div className="text-xs font-mono text-gray-400 mb-2">SDK Invocation Example</div>
                <pre className="p-4 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-gray-300 overflow-x-auto">
                  <code>{`// Call ${activeModel.name} via FastAPI Gateway
const response = await ai.chat.create({
  model: "${activeModel.id}",
  messages: [{ role: "user", content: "Analyze architectural tradeoffs..." }]
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
