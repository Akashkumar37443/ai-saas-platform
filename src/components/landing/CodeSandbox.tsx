import { useState } from 'react';
import { Terminal, Copy, Check, Code2 } from 'lucide-react';

export function CodeSandbox() {
  const [lang, setLang] = useState<'python' | 'typescript' | 'curl' | 'go'>('python');
  const [copied, setCopied] = useState(false);

  const snippets = {
    python: `# 1. Install official SDK: pip install aiplatform-sdk
from aiplatform import AIClient

client = AIClient(api_key="sk_live_your_api_key")

# Stream completions asynchronously
response = client.chat.stream(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Analyze my dataset schema."}],
    temperature=0.7
)

for chunk in response:
    print(chunk.delta, end="", flush=True)`,
    typescript: `// 1. Install official SDK: npm install @aiplatform/sdk
import { AIPlatform } from '@aiplatform/sdk';

const ai = new AIPlatform({ apiKey: 'sk_live_your_api_key' });

// Create real-time streaming completion
const stream = await ai.chat.stream({
  model: 'claude-3-5-sonnet',
  messages: [{ role: 'user', content: 'Generate React 18 component' }]
});

for await (const chunk of stream) {
  process.stdout.write(chunk.delta);
}`,
    curl: `# Direct HTTP inference via FastAPI Gateway
curl -X POST https://api.yourdomain.com/api/ai/chat \\
  -H "Authorization: Bearer sk_live_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello AI Gateway!"}],
    "temperature": 0.7
  }'`,
    go: `package main

import (
    "context"
    "fmt"
    "github.com/aiplatform/go-sdk"
)

func main() {
    client := aiplatform.NewClient("sk_live_your_api_key")
    resp, err := client.CreateChat(context.Background(), &aiplatform.ChatRequest{
        Model: "llama-3-3-70b",
        Prompt: "Scaffold microservice routing in Go",
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(resp.Content)
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[lang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative bg-[#0a0a0f]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4">
            <Code2 className="h-3.5 w-3.5" />
            Developer-First Integration
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ship in <span className="gradient-text">3 Lines of Code</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            SDKs and unified REST endpoints ready for Python, Node.js, cURL, Go, and Ruby.
          </p>
        </div>

        {/* Code Box */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-[#0f0f1a] shadow-2xl overflow-hidden">
          {/* Header tabs */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang('python')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition ${
                  lang === 'python' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setLang('typescript')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition ${
                  lang === 'typescript' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                TypeScript / Node
              </button>
              <button
                onClick={() => setLang('curl')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition ${
                  lang === 'curl' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setLang('go')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition ${
                  lang === 'go' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Go
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>

          {/* Code Viewer */}
          <div className="p-6 overflow-x-auto text-xs sm:text-sm font-mono text-gray-200 leading-relaxed">
            <pre>
              <code>{snippets[lang]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
