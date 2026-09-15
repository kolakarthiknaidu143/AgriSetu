import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { language, setIsDemoModalOpen } = useAuth();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-white">AgriSetu</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              AI-powered agricultural market intelligence & digital transaction platform connecting farmers, FPOs, mandis, and institutional processors across India.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold hover:bg-amber-500/30 transition-colors"
              >
                <span>⚡ Run 20-Step Live Demo</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Market Intelligence</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/market-intelligence" className="hover:text-emerald-400 transition-colors">
                  APMC Mandi Prices & Net Realization
                </Link>
              </li>
              <li>
                <Link to="/price-prediction" className="hover:text-emerald-400 transition-colors">
                  Gemini AI Price Prediction
                </Link>
              </li>
              <li>
                <Link to="/sale-window" className="hover:text-emerald-400 transition-colors">
                  Smart Sale-Window Optimization
                </Link>
              </li>
              <li>
                <Link to="/quality-grading" className="hover:text-emerald-400 transition-colors">
                  AI Visual Quality Grading
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Workflows */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Transactions & Escrow</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/marketplace" className="hover:text-emerald-400 transition-colors">
                  Verified Buyer Marketplace
                </Link>
              </li>
              <li>
                <Link to="/buyer-matching" className="hover:text-emerald-400 transition-colors">
                  AI Buyer Compatibility Scoring
                </Link>
              </li>
              <li>
                <Link to="/storage" className="hover:text-emerald-400 transition-colors">
                  Cold Storage & Warehousing
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-emerald-400 transition-colors">
                  Simulated Escrow Protection
                </Link>
              </li>
              <li>
                <Link to="/disputes" className="hover:text-emerald-400 transition-colors">
                  APMC Arbitration & Grievance
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimers & Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Compliance & Transparency</h4>
            <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700/60 text-[11px] text-stone-400 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Simulated Escrow Prototype</span>
              </div>
              <p>
                Platform demonstrates automated conditional release: Buyer confirms delivery & quality inspection before funds are credited.
              </p>
              <p className="text-[10px] text-stone-500">
                AI price predictions are algorithmic estimates based on seasonal arrivals and market momentum. Always inspect physical produce.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div>
            © 2026 AgriSetu Platform. Developed for Indian Agricultural Markets (Andhra Pradesh, Telangana, Karnataka).
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-stone-400">
              Mandi Hubs: Madanapalle • Guntur • Vijayawada • Tirupati
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
