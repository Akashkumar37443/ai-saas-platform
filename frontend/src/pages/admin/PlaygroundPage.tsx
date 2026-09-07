import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Cpu, Send, Zap, Copy, Check, Sliders, RefreshCw } from 'lucide-react';
import { api } from '@/services/api';
import { useToast } from '@/context/ToastContext';

export default function PlaygroundPage() {
  const [models, setModels] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [systemPrompt, setSystemPrompt] = useState('You are an enterprise AI reasoning assistant.');
  const [userPrompt, setUserPrompt] = useState('Write an architectural proposal for asynchronous inference with Redis and Celery.');
  const [temperature, setTemperature] = useState(0.7);
  
  const [output, setOutput] = useState<string | null>(null);
  const [rawJson, setRawJson] = useState<string | null>(null);
  const [viewRaw, setViewRaw] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    api.ai.getModels().then((data) => setModels(data));
  }, []);

  const handleGenerate = async () => {
    if (!userPrompt.trim()) return;
    setIsLoading(true);
    setOutput(null);
    setRawJson(null);
    const start = Date.now();
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ];
      const res = await api.ai.chat(selectedModel, messages, temperature);
      setOutput(res.content);
      setRawJson(JSON.stringify(res, null, 2));
      setLatency(Date.now() - start);
    } catch (e: any) {
      error('Inference error', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(viewRaw ? rawJson || output : output);
      setCopied(true);
      success('Copied output!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="h-7 w-7 text-purple-400" />
            Admin Model Test Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Test and benchmark all connected LLMs with raw JSON inspection and custom system overrides.
          </p>
        </div>
        <Badge variant="info" size="md">
          <Zap className="h-3.5 w-3.5 mr-1" /> Super Admin Sandbox
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Parameters */}
        <Card className="lg:col-span-4 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-purple-400" /> Model Configuration
            </h3>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300">Selected Model</label>
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {(models.length > 0 ? models : [
                { id: 'gpt-4o', name: 'GPT-4o (Omni)', latency: '42ms' },
                { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', latency: '58ms' },
                { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', latency: '62ms' },
                { id: 'llama-3-3-70b', name: 'Llama 3.3 (70B)', latency: '18ms' }
              ]).map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m.id)}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                    selectedModel === m.id
                      ? 'border-purple-500 bg-purple-500/20 text-white font-semibold'
                      : 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="font-semibold">{m.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono">⚡ {m.latency}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300 font-semibold">Temperature: {temperature}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <label className="block text-xs font-semibold text-gray-300">System Instruction</label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-white/10 bg-black/40 text-xs text-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none font-mono"
            />
          </div>
        </Card>

        {/* Inference Sandbox */}
        <Card className="lg:col-span-8 p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Admin Evaluation Prompt
            </label>
            <textarea
              rows={4}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Enter test prompt..."
              className="w-full p-4 rounded-2xl border border-white/10 bg-black/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-gray-500 font-mono">
                Engine: <strong className="text-purple-400">{selectedModel}</strong>
              </div>
              <Button onClick={handleGenerate} isLoading={isLoading}>
                <Send className="h-4 w-4 mr-2" /> Run Inference Test
              </Button>
            </div>
          </div>

          {/* Response Box */}
          {(output || isLoading) && (
            <div className="pt-4 border-t border-white/8 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewRaw(false)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                      !viewRaw ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Formatted Text
                  </button>
                  <button
                    onClick={() => setViewRaw(true)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                      viewRaw ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Raw JSON Schema
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {latency && (
                    <span className="text-xs font-mono text-emerald-400">⚡ {latency}ms</span>
                  )}
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    Copy
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/80 border border-white/10 text-xs sm:text-sm font-mono text-gray-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-purple-400 animate-pulse">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Executing test payload...
                  </div>
                ) : viewRaw ? (
                  <pre>{rawJson}</pre>
                ) : (
                  output
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
