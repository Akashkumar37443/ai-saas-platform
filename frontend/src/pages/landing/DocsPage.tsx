import { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Key, Code2, Sparkles, Send, Zap, BookOpen, Layers } from 'lucide-react';
import { api } from '@/services/api';
import { Button } from '@/components/common/Button';

export function DocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState<'chat' | 'code' | 'image' | 'models'>('chat');
  const [selectedLang, setSelectedLang] = useState<'curl' | 'python' | 'javascript'>('curl');
  const [copied, setCopied] = useState(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const endpoints = [
    {
      id: 'chat',
      method: 'POST',
      path: '/api/ai/chat',
      title: 'Chat Completions',
      desc: 'Generate multi-turn conversational responses with GPT-4o, Claude 3.5, or Gemini.',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_live_your_api_key'
      },
      body: {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: 'Explain distributed systems caching' }],
        temperature: 0.7
      }
    },
    {
      id: 'code',
      method: 'POST',
      path: '/api/ai/code',
      title: 'Code Generation',
      desc: 'Synthesize production-grade code, SQL queries, or TypeScript interfaces.',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_live_your_api_key'
      },
      body: {
        language: 'typescript',
        prompt: 'Build a custom debounce hook with cleanup',
        model: 'gpt-4o'
      }
    },
    {
      id: 'image',
      method: 'POST',
      path: '/api/ai/image',
      title: 'Image Generation',
      desc: 'Generate photorealistic artwork or UI assets using DALL-E 3.',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_live_your_api_key'
      },
      body: {
        prompt: 'A futuristic cyber hacker room in 8k octane render',
        model: 'dall-e-3',
        style: 'vivid',
        size: '1024x1024'
      }
    },
    {
      id: 'models',
      method: 'GET',
      path: '/api/ai/models',
      title: 'List Models',
      desc: 'Retrieve metadata, context sizes, and latency benchmarks for all active models.',
      headers: {
        'Authorization': 'Bearer sk_live_your_api_key'
      },
      body: null
    }
  ];

  const current = endpoints.find((e) => e.id === activeEndpoint) || endpoints[0];

  const handleTestCall = async () => {
    setIsTesting(true);
    setTestResponse(null);
    try {
      if (activeEndpoint === 'chat') {
        const res = await api.ai.chat('gpt-4o', [{ role: 'user', content: 'Explain distributed systems caching' }]);
        setTestResponse(JSON.stringify(res, null, 2));
      } else if (activeEndpoint === 'code') {
        const res = await api.ai.generateCode('typescript', 'Build a custom debounce hook with cleanup');
        setTestResponse(JSON.stringify(res, null, 2));
      } else if (activeEndpoint === 'image') {
        const res = await api.ai.generateImage('A futuristic cyber hacker room in 8k octane render');
        setTestResponse(JSON.stringify(res, null, 2));
      } else {
        const res = await api.ai.getModels();
        setTestResponse(JSON.stringify(res, null, 2));
      }
    } catch (e: any) {
      setTestResponse(JSON.stringify({ error: e.message || 'Error occurred' }, null, 2));
    } finally {
      setIsTesting(false);
    }
  };

  const getCodeSnippet = () => {
    const url = `http://localhost:8000${current.path}`;
    if (selectedLang === 'curl') {
      if (current.method === 'GET') {
        return `curl -X GET "${url}" \\\n  -H "Authorization: Bearer sk_live_your_api_key"`;
      }
      return `curl -X POST "${url}" \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer sk_live_your_api_key" \\\n  -d '${JSON.stringify(current.body, null, 2)}'`;
    }
    if (selectedLang === 'python') {
      if (current.method === 'GET') {
        return `import requests\n\nresponse = requests.get(\n    "${url}",\n    headers={"Authorization": "Bearer sk_live_your_api_key"}\n)\nprint(response.json())`;
      }
      return `import requests\n\npayload = ${JSON.stringify(current.body, null, 4)}\nheaders = {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer sk_live_your_api_key"\n}\n\nresponse = requests.post("${url}", json=payload, headers=headers)\nprint(response.json())`;
    }
    if (selectedLang === 'javascript') {
      if (current.method === 'GET') {
        return `const response = await fetch("${url}", {\n  headers: { "Authorization": "Bearer sk_live_your_api_key" }\n});\nconst data = await response.json();\nconsole.log(data);`;
      }
      return `const response = await fetch("${url}", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer sk_live_your_api_key"\n  },\n  body: JSON.stringify(${JSON.stringify(current.body, null, 2)})\n});\nconst data = await response.json();\nconsole.log(data);`;
    }
    return '';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            Interactive API Reference
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            FastAPI <span className="gradient-text">Gateway Documentation</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base max-w-2xl">
            Integrate AI completions, code generation, and image synthesis with unified REST & SSE streaming endpoints.
          </p>
        </div>

        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition self-start md:self-auto"
        >
          <span>Open Interactive Swagger UI</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-12 gap-8 mt-10">
        {/* Left Sidebar: Endpoints Navigation */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
            Available Endpoints
          </div>
          {endpoints.map((ep) => {
            const isSelected = ep.id === activeEndpoint;
            return (
              <button
                key={ep.id}
                onClick={() => {
                  setActiveEndpoint(ep.id as any);
                  setTestResponse(null);
                }}
                className={`w-full p-3.5 rounded-2xl border text-left transition ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-600/15 text-white ring-1 ring-indigo-500/40 shadow-lg'
                    : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      ep.method === 'POST' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-white font-semibold">{ep.path}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{ep.title}</div>
              </button>
            );
          })}

          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-300 mt-6 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-white">
              <Key className="h-4 w-4 text-indigo-400" /> Authentication
            </div>
            <p className="text-gray-400 leading-relaxed">
              Pass your API key as either <code className="text-indigo-300 font-mono">Authorization: Bearer &lt;key&gt;</code> or <code className="text-indigo-300 font-mono">X-API-Key: &lt;key&gt;</code>.
            </p>
          </div>
        </div>

        {/* Right Content: Interactive Sandbox */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${
                    current.method === 'POST' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {current.method}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white font-mono">{current.path}</h2>
              </div>
              <p className="text-sm text-gray-300 mt-2">{current.desc}</p>
            </div>

            {/* Code Snippet Switcher */}
            <div className="rounded-2xl border border-white/10 bg-black/70 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  {(['curl', 'python', 'javascript'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setSelectedLang(l)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                        selectedLang === l ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/5 transition"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="p-4 font-mono text-xs text-gray-200 overflow-x-auto leading-relaxed">
                <pre>
                  <code>{getCodeSnippet()}</code>
                </pre>
              </div>
            </div>

            {/* Live Test Button & Response Viewer */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Response Tester</h4>
                <Button onClick={handleTestCall} size="sm" isLoading={isTesting}>
                  <Send className="h-3.5 w-3.5 mr-1.5" /> Send Request
                </Button>
              </div>

              {testResponse && (
                <div className="p-4 rounded-2xl bg-black/80 border border-emerald-500/30 text-xs font-mono text-emerald-300 max-h-72 overflow-y-auto leading-relaxed animate-fade-in">
                  <pre>{testResponse}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocsPage;
