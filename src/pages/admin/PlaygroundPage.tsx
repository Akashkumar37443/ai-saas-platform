import { useState } from 'react'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Cpu, Send, Sparkles, Zap, Copy, Check } from 'lucide-react'

const models = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', latency: '42ms', maxTokens: 4096 },
  { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', latency: '65ms', maxTokens: 8192 },
  { id: 'dall-e-3', name: 'DALL-E 3', provider: 'OpenAI', latency: '320ms', maxTokens: 1024 },
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral AI', latency: '55ms', maxTokens: 4096 },
]

export default function PlaygroundPage() {
  const [selectedModel, setSelectedModel] = useState('gpt-4o')
  const [prompt, setPrompt] = useState('Write a typescript function to stream AI API completions with low latency.')
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsLoading(true)
    setResponse(null)
    setTimeout(() => {
      setResponse(`// Generated using ${selectedModel} (87ms)
export async function streamCompletion(prompt: string) {
  const response = await fetch('/api/v1/chat', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer sk_live_demo123', 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: '${selectedModel}', prompt, stream: true })
  });
  return response.body;
}`)
      setIsLoading(false)
    }, 800)
  }

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Cpu className="h-7 w-7 text-primary-400" />
            AI Model Playground
          </h1>
          <p className="text-sm text-gray-400 mt-1">Test and prompt all 50+ connected AI models directly from your admin suite</p>
        </div>
        <Badge variant="info" size="md">
          <Zap className="h-3.5 w-3.5 mr-1" /> Multi-Model Testing Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Config */}
        <Card className="lg:col-span-1 space-y-4 p-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Select Model</h3>
          <div className="space-y-2">
            {models.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  selectedModel === m.id
                    ? 'border-primary-500 bg-primary-500/15 text-white shadow-glow'
                    : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{m.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono">{m.provider}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                  <span>Avg: {m.latency}</span>
                  <span>Max Tokens: {m.maxTokens}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Right Prompt Box */}
        <Card className="lg:col-span-2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Input Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
              placeholder="Enter your prompt here..."
            />
            <div className="flex justify-end mt-3">
              <Button onClick={handleGenerate} isLoading={isLoading} size="md">
                <Send className="h-4 w-4 mr-2" /> Execute Prompt
              </Button>
            </div>
          </div>

          {/* Response Box */}
          <div className="border-t border-white/8 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent-400" /> Model Response Output
              </span>
              {response && (
                <button
                  onClick={handleCopy}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
                >
                  {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>

            <div className="p-4 rounded-xl border border-white/8 bg-black/40 min-h-[160px] font-mono text-xs text-green-400 overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="glow-dot" /> Generating response from {selectedModel}...
                </div>
              ) : response ? (
                <pre>{response}</pre>
              ) : (
                <span className="text-gray-600">Click "Execute Prompt" to stream output from {selectedModel}.</span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
