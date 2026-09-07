import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Settings, Key, Globe, Save } from 'lucide-react';
import { api } from '@/services/api';
import { useToast } from '@/context/ToastContext';

export default function SettingsPage() {
  const [appName, setAppName] = useState('AI SaaS Platform');
  const [supportEmail, setSupportEmail] = useState('support@example.com');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Provider keys
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    api.admin.getSettings().then((d) => {
      if (d?.general) {
        setAppName(d.general.app_name || 'AI SaaS Platform');
        setSupportEmail(d.general.support_email || 'support@example.com');
        setMaintenanceMode(Boolean(d.general.maintenance_mode));
      }
    });
  }, []);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.admin.updateSettings({
        app_name: appName,
        support_email: supportEmail,
        maintenance_mode: maintenanceMode ? 'true' : 'false',
      });
      success('General platform settings updated!');
    } catch (e: any) {
      error('Failed to update settings', e.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.admin.updateSettings({
        openai_key_configured: Boolean(openaiKey),
        anthropic_key_configured: Boolean(anthropicKey),
        groq_key_configured: Boolean(groqKey),
        gemini_key_configured: Boolean(geminiKey),
      });
      success('AI Provider keys saved successfully!');
    } catch (e: any) {
      error('Failed to save API keys', e.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Settings className="h-7 w-7 text-purple-400" />
          System Settings & AI Providers
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Configure upstream LLM provider keys, application branding, and global system flags.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* General App Branding */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-white/8">
            <Globe className="h-4 w-4 text-indigo-400" /> Platform General Configuration
          </h3>

          <form onSubmit={handleSaveGeneral} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Application Title</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Customer Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white"
              />
            </div>

            <div className="pt-2 flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-black/40">
              <div>
                <div className="text-xs font-bold text-white">Maintenance Mode</div>
                <div className="text-[10px] text-gray-400">Temporarily suspend end-user API inference</div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 bg-white/5 border-white/10"
              />
            </div>

            <Button type="submit" size="sm" className="w-full" isLoading={isSaving}>
              <Save className="h-3.5 w-3.5 mr-1.5" /> Save General Settings
            </Button>
          </form>
        </Card>

        {/* AI Provider Keys */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="h-4 w-4 text-purple-400" /> Upstream AI Provider Keys
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">Mock Fallback: Active</span>
          </div>

          <form onSubmit={handleSaveKeys} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">OpenAI API Key (GPT-4o & DALL-E)</label>
              <input
                type="password"
                placeholder="sk-proj-••••••••••••••••••••••••"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Anthropic API Key (Claude 3.5)</label>
              <input
                type="password"
                placeholder="sk-ant-••••••••••••••••••••••••"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Groq API Key (Ultra-Fast Llama 3)</label>
              <input
                type="password"
                placeholder="gsk_••••••••••••••••••••••••"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Google Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy••••••••••••••••••••••••"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-white font-mono"
              />
            </div>

            <Button type="submit" size="sm" className="w-full" isLoading={isSaving}>
              <Save className="h-3.5 w-3.5 mr-1.5" /> Save AI Provider Keys
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
