import { useState, useEffect } from 'react';
import {
  Cpu,
  Send,
  Zap,
  Copy,
  Check,
  Terminal,
  MessageSquare,
  Code,
  Image as ImageIcon,
  Mic,
  Sparkles,
  Sliders,
  Download,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function UserPlaygroundPage() {
  const [activeMode, setActiveMode] = useState<'chat' | 'code' | 'image' | 'audio'>('chat');
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [systemPrompt, setSystemPrompt] = useState('You are an expert full-stack AI engineer and architect.');
  
  // Chat / Text state
  const [prompt, setPrompt] = useState('Build a React hook for fetching streaming AI responses with TypeScript.');
  const [chatOutput, setChatOutput] = useState<string | null>(null);
  
  // Code state
  const [codeLang, setCodeLang] = useState('typescript');
  const [codePrompt, setCodePrompt] = useState('Create a FastAPI background worker for token usage analytics.');
  const [codeOutput, setCodeOutput] = useState<string | null>(null);

  // Image state
  const [imagePrompt, setImagePrompt] = useState('Futuristic neon software developer workstation, 8k octane render, cinematic lighting');
  const [imageStyle, setImageStyle] = useState('vivid');
  const [imageResult, setImageResult] = useState<any | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [tokensUsed, setTokensUsed] = useState<number | null>(null);

  const { user, refreshUser } = useAuth();
  const { success, error } = useToast();

  const handleGenerateChat = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setChatOutput(null);
    const start = Date.now();
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ];
      const res = await api.ai.chat(selectedModel, messages, temperature);
      setChatOutput(res.content);
      setLatency(Date.now() - start);
      setTokensUsed(res.tokens_used);
      refreshUser();
    } catch (err: any) {
      error('Generation failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!codePrompt.trim()) return;
    setIsLoading(true);
    setCodeOutput(null);
    const start = Date.now();
    try {
      const res = await api.ai.generateCode(codeLang, codePrompt, selectedModel);
      setCodeOutput(res.code);
      setLatency(Date.now() - start);
      setTokensUsed(res.tokens_used);
      refreshUser();
    } catch (err: any) {
      error('Code generation failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsLoading(true);
    setImageResult(null);
    const start = Date.now();
    try {
      const res = await api.ai.generateImage(imagePrompt, 'dall-e-3', imageStyle);
      setImageResult(res);
      setLatency(Date.now() - start);
      refreshUser();
    } catch (err: any) {
      error('Image generation failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const modelsList = [
    { id: 'gpt-4o', name: 'GPT-4o (Omni)', latency: '42ms', context: '128k' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', latency: '58ms', context: '200k' },
    { id: 'gemini-1-5-pro', name: 'Gemini 1.5 Pro', latency: '62ms', context: '1M' },
    { id: 'llama-3-3-70b', name: 'Llama 3.3 (70B)', latency: '18ms', context: '128k' },
    { id: 'dall-e-3', name: 'DALL-E 3 HD', latency: '320ms', context: '1024x1024' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="h-7 w-7 text-indigo-400" />
            Developer AI Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Prompt flagship models, generate production code, synthesize artwork, and test API endpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="success" size="md">
            <Zap className="h-3.5 w-3.5 mr-1 text-yellow-300" />
            {user?.credits_remaining ? user.credits_remaining.toLocaleString() : '48,500'} Tokens Remaining
          </Badge>
        </div>
      </div>

      {/* Studio Mode Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
        <button
          onClick={() => setActiveMode('chat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeMode === 'chat'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="h-4 w-4" /> Text & Chat
        </button>
        <button
          onClick={() => setActiveMode('code')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeMode === 'code'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Code className="h-4 w-4" /> Code Generator
        </button>
        <button
          onClick={() => setActiveMode('image')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
            activeMode === 'image'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <ImageIcon className="h-4 w-4" /> Image Studio
        </button>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Settings Sidebar */}
        <Card className="lg:col-span-4 p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-indigo-400" /> Model Parameters
            </h3>
            <span className="text-[10px] font-mono text-gray-500">Gateway v1.0</span>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-300">Active Foundation Model</label>
            <div className="space-y-1.5">
              {modelsList.map((m) => {
                const isSelected = selectedModel === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/20 text-white font-semibold shadow-md'
                        : 'border-white/5 bg-white/[0.01] text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-[10px] text-gray-500">Latency: {m.latency}</div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                      {m.context}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300 font-semibold">Temperature (Creativity)</span>
              <span className="font-mono text-indigo-300">{temperature}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>0.0 (Precise)</span>
              <span>1.0 (Creative)</span>
            </div>
          </div>

          {/* System Instructions */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <label className="block text-xs font-semibold text-gray-300">System Instruction</label>
            <textarea
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-white/10 bg-black/40 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none font-mono"
            />
          </div>
        </Card>

        {/* Right Main Playground Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {/* MODE 1: CHAT / TEXT */}
          {activeMode === 'chat' && (
            <Card className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  User Prompt / Instruction
                </label>
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your instruction or questions for the AI model..."
                  className="w-full p-4 rounded-2xl border border-white/10 bg-black/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-500 font-mono">
                    Model: <strong className="text-indigo-400">{selectedModel}</strong>
                  </div>
                  <Button onClick={handleGenerateChat} isLoading={isLoading}>
                    <Send className="h-4 w-4 mr-2" /> Generate Response
                  </Button>
                </div>
              </div>

              {/* Chat Response Output */}
              {(chatOutput || isLoading) && (
                <div className="pt-4 border-t border-white/8 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5 text-indigo-400" /> Response Payload
                    </span>
                    <div className="flex items-center gap-3">
                      {latency && (
                        <span className="text-xs font-mono text-emerald-400">
                          ⚡ {latency}ms • {tokensUsed} tokens
                        </span>
                      )}
                      {chatOutput && (
                        <button
                          onClick={() => handleCopy(chatOutput)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                        >
                          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          Copy
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-black/80 border border-white/10 text-xs sm:text-sm font-mono text-gray-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-indigo-400 animate-pulse">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating response tokens...
                      </div>
                    ) : (
                      chatOutput
                    )}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* MODE 2: CODE GENERATION */}
          {activeMode === 'code' && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Target Language:</label>
                <div className="flex gap-2">
                  {['typescript', 'python', 'sql', 'go'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLang(lang)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                        codeLang === lang
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={codePrompt}
                  onChange={(e) => setCodePrompt(e.target.value)}
                  placeholder="Describe the function, component, or algorithm to generate..."
                  className="w-full p-4 rounded-2xl border border-white/10 bg-black/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono resize-none"
                />

                <div className="flex justify-end mt-3">
                  <Button onClick={handleGenerateCode} isLoading={isLoading}>
                    <Code className="h-4 w-4 mr-2" /> Synthesize Code
                  </Button>
                </div>
              </div>

              {/* Code Output */}
              {(codeOutput || isLoading) && (
                <div className="pt-4 border-t border-white/8 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-400">Generated Code ({codeLang})</span>
                    {codeOutput && (
                      <button
                        onClick={() => handleCopy(codeOutput)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        Copy Code
                      </button>
                    )}
                  </div>

                  <div className="p-5 rounded-2xl bg-black/80 border border-white/10 text-xs font-mono text-emerald-300 whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
                    {isLoading ? 'Generating clean syntax...' : codeOutput}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* MODE 3: IMAGE STUDIO */}
          {activeMode === 'image' && (
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Rendering Style:</label>
                <div className="flex gap-2">
                  {['vivid', 'natural', 'anime', '3d'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setImageStyle(style)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                        imageStyle === style
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe the image scene in high detail..."
                  className="w-full p-4 rounded-2xl border border-white/10 bg-black/50 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />

                <div className="flex justify-end mt-3">
                  <Button onClick={handleGenerateImage} isLoading={isLoading}>
                    <ImageIcon className="h-4 w-4 mr-2" /> Render Artwork (500 Credits)
                  </Button>
                </div>
              </div>

              {/* Image Result */}
              {imageResult && (
                <div className="pt-4 border-t border-white/8 space-y-3 animate-fade-in">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                    <img
                      src={imageResult.image_url}
                      alt="AI generated visual"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                      <div className="text-xs text-white font-mono">{imagePrompt}</div>
                      <a
                        href={imageResult.image_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center gap-1 shadow"
                      >
                        <Download className="h-3.5 w-3.5" /> View HD
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
