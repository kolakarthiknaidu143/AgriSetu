import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Truck,
  Warehouse,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  Award,
  ChevronRight,
  Sprout
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { language, demoLogin, setIsDemoModalOpen } = useAuth();
  const navigate = useNavigate();
  const [topPrices, setTopPrices] = useState<any[]>([]);

  useEffect(() => {
    api.getMarketPrices({ crop: 'Tomato' }).then(res => {
      setTopPrices(res.prices.slice(0, 3));
    }).catch(() => {});
  }, []);

  const handleQuickDemo = async (role: 'farmer' | 'fpo' | 'buyer' | 'admin') => {
    await demoLogin(role);
    navigate(`/${role}`);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 pb-14 sm:pb-20 bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-40 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Agricultural Intelligence & Simulated Escrow</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-white">
                Sell Smarter.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">
                  Earn Better.
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                AI-powered market intelligence, price trend prediction, and verified institutional buyer matchmaking. Stop distress selling—maximize your net farm realization with digital contracts and simulated escrow safety.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all hover:scale-102 active:scale-98 min-h-[48px]"
                >
                  <Sparkles className="w-5 h-5 text-stone-950 shrink-0" />
                  <span>Launch 20-Step Live Demo</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <Link
                  to="/market-intelligence"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur transition-colors min-h-[48px]"
                >
                  <BarChart3 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span>Explore Mandi Prices</span>
                </Link>
              </div>

              {/* Persona Quick Launch Buttons */}
              <div className="pt-4 border-t border-emerald-800/60">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block mb-2">
                  Instant One-Click Persona Test:
                </span>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleQuickDemo('farmer')}
                    className="px-3 py-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-medium border border-emerald-600/50 transition-colors min-h-[40px] text-center"
                  >
                    👨‍🌾 Farmer
                  </button>
                  <button
                    onClick={() => handleQuickDemo('fpo')}
                    className="px-3 py-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-medium border border-emerald-600/50 transition-colors min-h-[40px] text-center"
                  >
                    🏢 FPO Aggregator
                  </button>
                  <button
                    onClick={() => handleQuickDemo('buyer')}
                    className="px-3 py-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-medium border border-emerald-600/50 transition-colors min-h-[40px] text-center"
                  >
                    🏭 Verified Buyer
                  </button>
                  <button
                    onClick={() => handleQuickDemo('admin')}
                    className="px-3 py-2 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-medium border border-emerald-600/50 transition-colors min-h-[40px] text-center"
                  >
                    ⚖️ APMC Admin
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero Live Market Card */}
            <div className="lg:col-span-5">
              <div className="bg-stone-900/90 rounded-2xl border border-emerald-500/30 p-4 sm:p-6 shadow-2xl backdrop-blur space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Demo Market Data • Andhra Pradesh
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">Today</span>
                </div>

                {/* Mandi Cards */}
                <div className="space-y-2.5">
                  {topPrices.length === 0 ? (
                    <div className="text-xs text-stone-400 py-4 text-center">Loading APMC quotes...</div>
                  ) : (
                    topPrices.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-between hover:border-emerald-500/50 transition-all gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-stone-400 truncate">{p.marketName} Mandi</div>
                          <div className="text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
                            <span>{p.cropName}</span>
                            <span className="text-[10px] text-emerald-400 font-semibold px-1 rounded bg-emerald-950/60">
                              +{p.priceChangePercentage}%
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            Arrivals: {p.arrivalQuantity} {p.arrivalUnit}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-base sm:text-lg font-black text-amber-400">
                            ₹{p.modalPrice.toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-stone-400">/qtl</span>
                          </div>
                          <div className="text-[11px] text-emerald-300 font-medium">
                            Net: ₹{(p.netRealizationPerQtl || p.modalPrice - 140).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* AI Opportunity Callout */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950 to-stone-900 border border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>AI Recommendation for Tomato Farmers:</span>
                  </div>
                  <p className="text-xs text-emerald-100 leading-relaxed">
                    Madanapalle arrivals down 14%. <strong>Hold harvest 2–3 days</strong> in shaded crates; expected gain is +₹110/qtl over storage expense.
                  </p>
                  <p className="text-[10px] text-amber-300/80 pt-0.5">
                    AI-generated estimate — actual market prices may vary.
                  </p>
                </div>

                <Link
                  to="/sale-window"
                  className="block text-center text-xs text-emerald-400 font-semibold hover:underline py-1"
                >
                  View full 4-day sale window forecast →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 bg-white rounded-2xl p-4 sm:p-6 shadow-xl border border-stone-200">
          <div className="text-center p-2 sm:p-3">
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-800">45+</div>
            <div className="text-xs text-stone-500 font-medium mt-1">APMC Mandis Tracked</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Demo Market Data</div>
          </div>
          <div className="text-center p-2 sm:p-3 border-l border-stone-100">
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-800">₹300+</div>
            <div className="text-xs text-stone-500 font-medium mt-1">Average Price Upside / Qtl</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+₹15,000 extra per 50q lot</div>
          </div>
          <div className="text-center p-2 sm:p-3 border-t md:border-t-0 md:border-l border-stone-100">
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-800">98.6%</div>
            <div className="text-xs text-stone-500 font-medium mt-1">Payment Reliability</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Verified Corporate Buyers</div>
          </div>
          <div className="text-center p-2 sm:p-3 border-t md:border-t-0 border-l border-stone-100">
            <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-800">100%</div>
            <div className="text-xs text-stone-500 font-medium mt-1">SIMULATED ESCROW — Prototype</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Simulated Settlement</div>
          </div>
        </div>
      </section>

      {/* Core Platform Pillars / Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            End-to-End Agri Value Chain
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-stone-900">
            Everything a Farmer & FPO Needs to Win
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Eliminate traditional middleman opacity with transparent price discovery, automated digital contracts, route-optimized logistics, and reliable escrow settlements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">1. Mandi Price Intelligence</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Compare prices across Madanapalle, Guntur, Vijayawada, and Tirupati. Auto-calculates net realization deducting transit fuel, loading fees, and mandi cess.
            </p>
            <Link to="/market-intelligence" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline">
              Compare APMC prices →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">2. AI Price & Sale-Window</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Powered by Gemini 3.8 Flash. Analyzes seasonal supply curves and mandi arrival velocities to recommend the exact day to sell for maximum profit.
            </p>
            <Link to="/sale-window" className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline">
              Check 4-day sale window →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">3. Verified Corporate Buyers</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Connect directly with institutional buyers (food processors, retail chains, exporters). Each buyer undergoes GST and Mandi Administrator verification.
            </p>
            <Link to="/marketplace" className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline">
              Explore active buyer requirements →
            </Link>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">4. Digital Grading & Quality Vision</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Snap a picture of your harvested harvest. Gemini Vision analyzes color maturity, caliber uniformity, and blemish percentage to suggest AGMARK Grade A/B/C.
            </p>
            <Link to="/quality-grading" className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:underline">
              Test AI quality grading →
            </Link>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center">
              <Warehouse className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">5. Cold Storage & Warehouses</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Browse licensed cold storages in Chittoor, Tirupati, and Guntur. Interactive calculator compares "Sell Now" vs. "Store 3 Days & Sell Later".
            </p>
            <Link to="/storage" className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:underline">
              Calculate cold storage arbitrage →
            </Link>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-stone-900">6. Protected Escrow Settlement</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Buyer funds are secured in simulated escrow upfront upon contract signing. Release occurs instantly upon digital delivery confirmation and inspection.
            </p>
            <Link to="/orders" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline">
              Inspect escrow protection engine →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works 5-Step Flow */}
      <section className="bg-stone-50 py-10 sm:py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-700">
              Simple 5-Step Digital Workflow
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
              From Farmgate Harvest to Guaranteed Payment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-sm text-stone-900">Create Lot</h4>
              <p className="text-xs text-stone-600">
                Farmer or FPO lists crop quantity, variety, harvest date, and expected price.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-sm text-stone-900">AI Price & Window</h4>
              <p className="text-xs text-stone-600">
                AI predicts 4-day mandi trajectory and suggests the most profitable sale window.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-sm text-stone-900">Digital Deal & Escrow</h4>
              <p className="text-xs text-stone-600">
                Receive and counter verified buyer offers. Funds are locked in simulated escrow.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-sm text-stone-900">Logistics & Transit</h4>
              <p className="text-xs text-stone-600">
                3PL truck assigned with driver phone and vehicle tracking to buyer warehouse.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2 sm:col-span-2 lg:col-span-1">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center">
                5
              </div>
              <h4 className="font-bold text-sm text-stone-900">Instant Release</h4>
              <p className="text-xs text-stone-600">
                Buyer confirms quality and weight; escrow automatically credits farmer's bank account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 20-Step Live Tour Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-900 text-white p-6 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black uppercase">
              Interactive Live Walkthrough
            </div>
            <h3 className="font-heading font-black text-xl sm:text-3xl text-white">
              Watch a 50 Quintal Tomato Lot Flow from Farm to Settlement in 20 Steps
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Step through every click: Farmer Ramesh Naidu listing, AI price prediction, counter-negotiation with ABC Foods, logistics dispatch, quality weighbridge inspection, and deterministic escrow release.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 active:bg-stone-200 text-emerald-950 font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Start 20-Step Demo Tour</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
