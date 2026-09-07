import { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I run this template locally after purchasing on Codester?',
      answer:
        'Simply extract the zip archive and run 2 commands: "npm install && npm run dev" for the React frontend, and "pip install -r backend/requirements.txt && python backend/run.py" for the FastAPI backend! A zero-config SQLite database and built-in Smart Mock AI engine are configured automatically out of the box.',
    },
    {
      question: 'Do I need paid OpenAI or Anthropic API keys for the demo to work?',
      answer:
        'No! The template includes an intelligent built-in Mock Inference Engine that generates realistic streaming text completions, syntax-highlighted code, and image artwork without spending a penny. If you want to use real OpenAI/Claude/Groq/Gemini models, simply add your keys to the backend ".env" file.',
    },
    {
      question: 'Can I use PostgreSQL instead of SQLite in production?',
      answer:
        'Yes! The FastAPI backend uses SQLAlchemy 2.0 ORM. Simply change "DATABASE_URL" in "backend/.env" to your PostgreSQL connection string (e.g., postgresql://user:password@localhost:5432/saas_db) and all tables will automatically initialize.',
    },
    {
      question: 'How do I connect Stripe for recurring subscription payments?',
      answer:
        'The frontend and backend schemas include complete subscription tiers, invoice histories, and webhook slots. You can plug in your Stripe publishable and secret keys to activate automatic recurring billing via Stripe Checkout or customer portals.',
    },
    {
      question: 'Is this template fully mobile responsive and customizable?',
      answer:
        'Yes, 100%! Built with TailwindCSS and React 18, all components are modular and mobile-first. You can change the primary color palette in "tailwind.config.js" with one hex code and update branding in "src/components/landing/Navbar.tsx".',
    },
    {
      question: 'Where can I deploy this AI SaaS platform?',
      answer:
        'The frontend can be deployed in 1 click to Netlify, Vercel, or Cloudflare Pages (with preconfigured netlify.toml and redirects). The FastAPI backend can be deployed to Render, Railway, Fly.io, DigitalOcean, or any VPS with our included Dockerfile and docker-compose.yml.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 relative bg-[#0a0a0f]/95 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? <span className="gradient-text">We Have Answers</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Everything you need to know about setting up, customizing, and scaling your AI SaaS platform.
          </p>

          {/* FAQ Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search questions (e.g. database, setup, API)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-200 text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-md"
            />
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition"
                >
                  <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
