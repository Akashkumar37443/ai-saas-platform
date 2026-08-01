import { useState } from 'react'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { Cpu, Send, Sparkles, Zap, Copy, Check, Terminal } from 'lucide-react'

const userModels = [
  { id: 'gpt-4o', name: 'GPT-4o', latency: '42ms', tokens: '128k' },
  { id: 'claude-3-5', name: 'Claude 3.5 Sonnet', latency: '65ms', tokens: '200k' },
  { id: 'dall-e-3', name: 'DALL-E 3', latency: '320ms', tokens: '1024px' },
]

export default function UserPlaygroundPage() {
  const [selectedModel, setSelectedModel] = useState('gpt-4o')
  const [prompt, setPrompt] = useState('Build a React hook for fetching streaming AI responses.')
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setIsLoading(true)
    setResponse(null)
    setTimeout(() => {
      setResponse(`// Response from ${selectedModel} (Pro Plan Token quota applied)
export function useAIStream(prompt: string) {
  const [data, setData] = useState('');
  useEffect(() => {
    const source = new EventSource(\`/api/stream?q=\${encodeURIComponent(prompt)}\`);
    source.onmessage = (e) => setData((prev) => prev + e.data);
    return () => source.close();
  }, [prompt]);
  return data;
}`)
      setIsLoading(false)
    }, 700)
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
            Developer AI Studio
          </h1>
          <p className="text-sm text-gray-400 mt-1">Prompt models, build code snippets, and generate AI completions</p>
        </div>
        <Badge variant="success" size="md">
          <Zap className="h-3.5 w-3.5 mr-1" /> 38,420 Credits Remaining
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 p-5 space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Available Models</h3>
          {userModels.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                selectedModel === m.id
                  ? 'border-primary-500 bg-primary-500/15 text-white shadow-glow'
                  : 'border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between font-semibold text-sm">
                {m.name}
                <span className="text-[10px] text-gray-500 font-mono">{m.tokens}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Latency: {m.latency}</div>
            </button>
          ))}
        </Card>

        <Card className="lg:col-span-2 p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Prompt Input</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm"
            />
            <div className="flex justify-end mt-3">
              <Button onClick={handleGenerate} isLoading={isLoading}>
                <Send className="h-4 w-4 mr-2" /> Generate Output
              </Button>
            </div>
          </div>

          <div className="border-t border-white/8 pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-accent-400" /> Output Stream
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
                  <div className="glow-dot" /> Streaming output...
                </div>
              ) : response ? (
                <pre>{response}</pre>
              ) : (
                <span className="text-gray-600">Enter a prompt and click Generate Output.</span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
