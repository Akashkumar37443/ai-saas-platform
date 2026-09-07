import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import {
  Layers,
  Sparkles,
  Code,
  Terminal,
  Database,
  Image as ImageIcon,
  MessageSquare,
  Search,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { useToast } from '@/context/ToastContext';

export function UserTemplatesPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [templates, setTemplates] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { success } = useToast();
  const navigate = useNavigate();

  const categories = ['All', 'Engineering', 'Marketing', 'Data', 'Design', 'Support'];

  useEffect(() => {
    api.ai.getTemplates().then((data) => setTemplates(data));
  }, []);

  const filtered = templates.filter((t) => {
    const matchCat = category === 'All' || t.category.toLowerCase() === category.toLowerCase();
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.prompt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success('Prompt copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunInStudio = (promptText: string) => {
    navigate('/dashboard', { state: { prompt: promptText } });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Layers className="h-7 w-7 text-indigo-400" />
          AI Prompt & Template Library
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Pre-engineered, tested AI prompts optimized for coding, content generation, and system design.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                category === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <Card key={item.id} className="p-6 flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                  {item.category}
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.prompt)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
                  title="Copy Prompt"
                >
                  {copiedId === item.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed min-h-[36px]">
                {item.description}
              </p>

              <div className="p-3 rounded-xl bg-black/50 border border-white/8 text-[11px] font-mono text-gray-300 line-clamp-3">
                "{item.prompt}"
              </div>
            </div>

            <div className="pt-3 border-t border-white/8 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {(item.tags || []).slice(0, 2).map((tag: string, i: number) => (
                  <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleRunInStudio(item.prompt)}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
              >
                Use in Studio <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default UserTemplatesPage;
