import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import {
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Truck,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';

const DEMO_STEPS = [
  {
    step: 1,
    title: 'Farmer Authentication & Session',
    action: 'Farmer Ramesh Naidu logs into the AgriSetu platform.',
    role: 'farmer',
    route: '/farmer',
    badge: 'Step 1: Auth & Profile',
    technical: 'JWT issued for Ramesh Naidu (Chittoor District, AP).'
  },
  {
    step: 2,
    title: 'Crop Lot Creation',
    action: 'Farmer creates Tomato lot (50 quintals Shivam Hybrid, Grade A).',
    role: 'farmer',
    route: '/farmer',
    badge: 'Step 2: Lot Creation',
    technical: 'Lot ID generated: LOT-2026-000101 with initial "Draft" / "Listed" status.'
  },
  {
    step: 3,
    title: 'Demo Market Data — APMC Comparison',
    action: 'Platform displays demo market prices & net realizations across regional APMCs.',
    role: 'farmer',
    route: '/market-intelligence',
    badge: 'Step 3: Demo Market Data',
    technical: 'Madanapalle ₹2,720, Guntur ₹2,750, Vijayawada ₹2,650. Transport-adjusted net realization calculated. (Demo Market Data)'
  },
  {
    step: 4,
    title: 'AI Price Trend Prediction',
    action: 'Gemini AI analyzes arrivals and predicts upward price momentum (+4.8%). AI-generated estimate — actual market prices may vary.',
    role: 'farmer',
    route: '/price-prediction',
    badge: 'Step 4: AI Prediction',
    technical: 'Arrival velocity is down 14% at regional mandis. Disclaimer: AI-generated estimate — actual market prices may vary.'
  },
  {
    step: 5,
    title: 'Smart Sale-Window Recommendation',
    action: 'Platform recommends selling window: "Best estimated selling window: 2–3 days".',
    role: 'farmer',
    route: '/sale-window',
    badge: 'Step 5: Sale Window',
    technical: 'Projected peak price of ₹2,760/qtl on Day 2-3 out-earns cold storage cost of ₹2.20/qtl/day.'
  },
  {
    step: 6,
    title: 'Intelligent Buyer Matching',
    action: 'AI ranks top verified buyers: ABC Foods Ltd (95% match), FreshMart (88%).',
    role: 'farmer',
    route: '/buyer-matching',
    badge: 'Step 6: Buyer Matching',
    technical: 'Match weighted by required crop, grade compatibility, proximity (< 50 km), and 98.6% reliability.'
  },
  {
    step: 7,
    title: 'Buyer Requirement Matching',
    action: 'Buyer requirement displayed: ABC Foods sourcing 50 tonnes Tomato for Sri City plant.',
    role: 'farmer',
    route: '/marketplace',
    badge: 'Step 7: Buyer Need',
    technical: 'Institutional buyer requirement with guaranteed electronic escrow settlement.'
  },
  {
    step: 8,
    title: 'Lot Submission to Buyer',
    action: 'Farmer submits lot LOT-2026-000101 directly to ABC Foods requirement.',
    role: 'farmer',
    route: '/marketplace',
    badge: 'Step 8: Submission',
    technical: 'Lot status transitions to "Listed" / "Submitted to Requirement".'
  },
  {
    step: 9,
    title: 'Digital Purchase Offer',
    action: 'ABC Foods makes initial digital purchase offer at ₹2,700/quintal.',
    role: 'buyer',
    route: '/offers',
    badge: 'Step 9: Digital Offer',
    technical: 'Offer ID OFF-2026-000101 created with status "PENDING" and 48-hour expiration timer.'
  },
  {
    step: 10,
    title: 'Farmer Counter-Offer',
    action: 'Farmer counters at ₹2,800/quintal citing Grade A quality and falling mandi arrivals.',
    role: 'farmer',
    route: '/offers',
    badge: 'Step 10: Counter Negotiation',
    technical: 'Counter-offer logged in immutable negotiation history; counterparty notified via push alert.'
  },
  {
    step: 11,
    title: 'Offer Acceptance',
    action: 'Buyer accepts negotiated compromise price of ₹2,750/quintal.',
    role: 'buyer',
    route: '/offers',
    badge: 'Step 11: Deal Finalized',
    technical: 'Offer status updated to "ACCEPTED". Lot marked as "Offer Accepted".'
  },
  {
    step: 12,
    title: 'Order Created & SIMULATED ESCROW — Prototype Locked',
    action: 'Order created with unique Transaction ID TXN-2026-000499; SIMULATED ESCROW — Prototype locked.',
    role: 'farmer',
    route: '/orders',
    badge: 'Step 12: Escrow Locked',
    technical: '₹1,37,500 total value protected under SIMULATED ESCROW — Prototype. Funds held safely in platform escrow.'
  },
  {
    step: 13,
    title: 'Logistics Coordination & Vehicle Assigned',
    action: 'Logistics dispatched: Tata 407 (AP 04 TT 8821) assigned with driver S. Koteswara Rao.',
    role: 'farmer',
    route: '/logistics',
    badge: 'Step 13: Logistics',
    technical: 'Logistics record LOG-2026-000101 generated. Route distance 45 km, estimated transit 3.5 hrs.'
  },
  {
    step: 14,
    title: 'Produce Delivery Completed',
    action: 'Delivery completed at ABC Foods Sri City receiving bay; weighbridge matched 50 qtl.',
    role: 'buyer',
    route: '/logistics',
    badge: 'Step 14: Delivered',
    technical: 'Order status updated to "DELIVERED". Logistics timeline marked complete.'
  },
  {
    step: 15,
    title: 'Digital Quality Confirmation',
    action: 'Buyer confirms Grade A specs (90% moisture, 1.8% defect, weighbridge approved).',
    role: 'buyer',
    route: '/orders',
    badge: 'Step 15: Quality Confirmed',
    technical: 'Order status updated to "QUALITY CONFIRMED". Timestamp stamped on record.'
  },
  {
    step: 16,
    title: 'Simulated Escrow Release Conditions Met',
    action: 'All automated conditions met: SIMULATED ESCROW — Prototype transitions to "ELIGIBLE FOR RELEASE".',
    role: 'buyer',
    route: '/orders',
    badge: 'Step 16: Settlement Validated',
    technical: 'Automated escrow rule validated: Quality Confirmed + Weighbridge Slips Validated.'
  },
  {
    step: 17,
    title: 'Simulated Settlement Released to Farmer',
    action: 'Simulated Settlement released automatically: ₹1,36,400 net realization routed to farmer account (Simulated Settlement).',
    role: 'admin',
    route: '/transactions',
    badge: 'Step 17: Escrow Released',
    technical: 'SIMULATED ESCROW — Prototype status updated to "ESCROW RELEASED". Simulated Settlement ledger credit triggered.'
  },
  {
    step: 18,
    title: 'Transaction Marked Completed',
    action: 'Transaction TXN-2026-000499 marked as officially COMPLETED in the ledger.',
    role: 'farmer',
    route: '/transactions',
    badge: 'Step 18: Ledger Completed',
    technical: 'Order status marked "COMPLETED"; Lot marked "Completed".'
  },
  {
    step: 19,
    title: 'Simulated Settlement Finalized',
    action: 'Payment status updated to "SIMULATED SETTLEMENT COMPLETED" with full deduction transparency.',
    role: 'farmer',
    route: '/transactions',
    badge: 'Step 19: Payment Finalized',
    technical: 'Gross ₹1,37,500 - Fee ₹1,100 = ₹1,36,400 Simulated Settlement credited to SBI account •••• 1029.'
  },
  {
    step: 20,
    title: 'Complete Invoice & Transaction History',
    action: 'Farmer views downloadable invoice, APMC cess breakdown, and mutual buyer review.',
    role: 'farmer',
    route: '/transactions',
    badge: 'Step 20: Full History',
    technical: 'End-to-end 20-step lifecycle complete! All records persisted in database.'
  }
];

export const DemoTourModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [serverFeedback, setServerFeedback] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const stepData = DEMO_STEPS[currentStep - 1];

  const executeStep = async (stepNum: number) => {
    setIsExecuting(true);
    try {
      const res = await api.runDemoStep(stepNum);
      setServerFeedback(res.message);
      // Automatically switch to the persona matching this step
      const targetRole = DEMO_STEPS[stepNum - 1].role as any;
      await demoLogin(targetRole);
    } catch (err: any) {
      console.warn('Demo step execution error:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  useEffect(() => {
    if (isDemoModalOpen) {
      executeStep(currentStep);
    }
  }, [currentStep, isDemoModalOpen]);

  useEffect(() => {
    let timer: any;
    if (isPlaying && isDemoModalOpen) {
      timer = setTimeout(() => {
        if (currentStep < 20) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, isDemoModalOpen]);

  if (!isDemoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">Interactive 20-Step Transaction Engine</h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400 text-stone-900 uppercase">
                  Live DB Mutator
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Witness the full end-to-end cycle from crop listing to AI sale-window, offer counter, delivery, and escrow release.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsDemoModalOpen(false);
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-stone-100 border-b border-stone-200 px-5 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-bold text-stone-700 whitespace-nowrap">
              Step {currentStep} of 20:
            </span>
            <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 20) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            {Math.round((currentStep / 20) * 100)}% Completed
          </span>
        </div>

        {/* Step Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              {stepData.badge}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 capitalize">
              Active Persona: <strong className="text-emerald-800 font-bold">{stepData.role.toUpperCase()}</strong>
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Target View: {stepData.route}
            </span>
          </div>

          <div>
            <h4 className="text-lg font-bold text-stone-900">{stepData.title}</h4>
            <p className="text-sm text-stone-700 mt-1 leading-relaxed">{stepData.action}</p>
          </div>

          {/* Real-Time Database Mutation Card */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Database & Ledger Execution:</span>
            </div>
            <p className="text-xs text-emerald-900 font-mono pl-6">{stepData.technical}</p>
            {serverFeedback && (
              <p className="text-[11px] text-emerald-800 font-medium pl-6 border-t border-emerald-200/60 pt-1 mt-1">
                API Response: {serverFeedback}
              </p>
            )}
          </div>

          {/* Quick Jump to Relevant View */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <div className="text-xs text-stone-500">
              Want to see this view on the live screen?
            </div>
            <button
              onClick={() => {
                setIsDemoModalOpen(false);
                setIsPlaying(false);
                navigate(stepData.route);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              <span>Open {stepData.route}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isPlaying
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Autoplay</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto Play (3.5s)</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentStep(1);
                setIsPlaying(false);
              }}
              className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200 transition-colors"
              title="Reset to Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStep === 1}
              onClick={() => {
                setIsPlaying(false);
                setCurrentStep((prev) => Math.max(1, prev - 1));
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 20 ? (
              <button
                disabled={isExecuting}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep((prev) => Math.min(20, prev + 1));
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-900 shadow-xs active:scale-95 transition-all"
              >
                <span>Next Step ({currentStep + 1})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  navigate('/transactions');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs"
              >
                <span>View Final Transaction</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
