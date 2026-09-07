import { useState } from 'react';
import { Mail, MessageSquare, Building2, Send, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', planInterest: 'Enterprise' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      success('Inquiry received!', 'Our enterprise solutions team will respond within 12 business hours.');
      setForm({ name: '', email: '', company: '', message: '', planInterest: 'Enterprise' });
    }, 800);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold">
            <Mail className="h-3.5 w-3.5" />
            Direct Support & Enterprise Sales
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Let's Talk About Your <br />
            <span className="gradient-text">AI SaaS Growth</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Need custom model fine-tuning, dedicated cloud throughput, or have questions about purchasing the template on Codester? We're here to help.
          </p>

          <div className="space-y-4 pt-4">
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Direct Email Support</div>
                <div className="text-sm font-bold text-white font-mono">support@example.com</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Codester Support SLA</div>
                <div className="text-sm font-bold text-white font-mono">24/7 Priority Assistance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-300 max-w-sm mx-auto">
                  Thank you for reaching out. We have logged your request and our engineer will reach out shortly.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Send Us a Message</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Company / Project</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Plan of Interest</label>
                    <select
                      value={form.planInterest}
                      onChange={(e) => setForm({ ...form, planInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/80 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Starter">Starter Plan ($19/mo)</option>
                      <option value="Pro">Pro Plan ($49/mo)</option>
                      <option value="Enterprise">Enterprise Custom SLA ($199/mo)</option>
                      <option value="Codester Template">Codester Template Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">Message / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project requirements..."
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" isLoading={loading}>
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
