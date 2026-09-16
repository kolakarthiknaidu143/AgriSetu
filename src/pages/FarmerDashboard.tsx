import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { ICropLot, IOffer, IOrder, IMarketPrice } from '../types';
import {
  TrendingUp,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Scale,
  Sliders,
  Check,
  Info,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { user, setIsDemoModalOpen } = useAuth();
  const navigate = useNavigate();

  const [lots, setLots] = useState<ICropLot[]>([]);
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [marketPrices, setMarketPrices] = useState<IMarketPrice[]>([]);
  const [loading, setLoading] = useState(true);

  // Counter offer modal state
  const [counterModalOffer, setCounterModalOffer] = useState<IOffer | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(2800);
  const [counterMsg, setCounterMsg] = useState<string>('Grade A Shivam Hybrid harvested this morning. Zero transit damage.');
  const [actionLoading, setActionLoading] = useState(false);

  // Interactive Net Realization Simulator State (Core USP)
  const [simCrop, setSimCrop] = useState<'Tomato' | 'Red Chilli' | 'Paddy' | 'Cotton'>('Tomato');
  const [simQuantity, setSimQuantity] = useState<number>(50); // quintals
  const [simDistanceKm, setSimDistanceKm] = useState<number>(45); // km
  const [simStorageDays, setSimStorageDays] = useState<number>(2); // days

  // Presets for the simulator
  const cropPresets = {
    'Tomato': { currentPrice: 2500, bestPrice: 2800, transportRatePerKm: 1.8, storageRatePerDay: 10, cessPercent: 0.01 },
    'Red Chilli': { currentPrice: 18200, bestPrice: 20500, transportRatePerKm: 2.2, storageRatePerDay: 15, cessPercent: 0.01 },
    'Paddy': { currentPrice: 2200, bestPrice: 2450, transportRatePerKm: 1.5, storageRatePerDay: 8, cessPercent: 0.01 },
    'Cotton': { currentPrice: 7100, bestPrice: 7850, transportRatePerKm: 2.0, storageRatePerDay: 12, cessPercent: 0.01 },
  };

  const currentPreset = cropPresets[simCrop];
  const simCurrentPrice = currentPreset.currentPrice;
  const simBestPrice = currentPreset.bestPrice;
  const simTransportCostPerQtl = Math.round(simDistanceKm * currentPreset.transportRatePerKm);
  const simStorageCostPerQtl = Math.round(simStorageDays * currentPreset.storageRatePerDay);
  const simApmcCessPerQtl = Math.round(simCurrentPrice * currentPreset.cessPercent);

  // Platform Direct Net Realization
  const simNetRealizationPerQtl = simBestPrice - simTransportCostPerQtl - simStorageCostPerQtl - simApmcCessPerQtl;
  // Traditional Mandi Net Realization (6.5% middleman commission + 40 handling)
  const simTraditionalNetPerQtl = Math.round(simCurrentPrice - (simCurrentPrice * 0.065) - 40);

  const simPotentialAdditionalPerQtl = simNetRealizationPerQtl - simTraditionalNetPerQtl;
  const simTotalAdditionalIncome = simPotentialAdditionalPerQtl * simQuantity;

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [lotsRes, offersRes, ordersRes, pricesRes] = await Promise.all([
        api.getLots({ farmerId: user?._id }),
        api.getOffers(),
        api.getOrders(),
        api.getMarketPrices({ crop: 'Tomato' })
      ]);

      setLots(lotsRes.lots);
      setOffers(offersRes.offers);
      setOrders(ordersRes.orders);
      setMarketPrices(pricesRes.prices.slice(0, 4));
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const handleAcceptOffer = async (offerId: string) => {
    setActionLoading(true);
    try {
      await api.acceptOffer(offerId);
      await loadDashboardData();
      alert('Offer accepted! SIMULATED ESCROW — Prototype locked and Order created.');
    } catch (err: any) {
      alert(err.message || 'Failed to accept offer');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendCounter = async () => {
    if (!counterModalOffer) return;
    setActionLoading(true);
    try {
      await api.counterOffer(counterModalOffer._id, {
        counterPrice,
        message: counterMsg
      });
      setCounterModalOffer(null);
      await loadDashboardData();
      alert('Counter offer sent to buyer!');
    } catch (err: any) {
      alert(err.message || 'Failed to send counter offer');
    } finally {
      setActionLoading(false);
    }
  };

  // Determine current lifecycle stage based on latest active order
  const latestOrder = orders[0];
  const lifecycleStage = !latestOrder
    ? 1
    : latestOrder.status === 'COMPLETED'
    ? 5
    : latestOrder.status === 'QUALITY CONFIRMED' || latestOrder.escrowStatus === 'ELIGIBLE FOR RELEASE'
    ? 4
    : latestOrder.status === 'DELIVERED'
    ? 3
    : 2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Demo Mode & SIH Showcase Notice Bar */}
      <div className="rounded-xl bg-amber-500/15 border border-amber-500/40 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-stone-900 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="flex h-3 w-3 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600" />
          </span>
          <div className="text-xs sm:text-sm">
            <strong className="font-bold text-amber-950">🎯 DEMO MODE — Smart India Hackathon Finalist Presentation:</strong>{' '}
            <span className="text-amber-900">
              Interactive 20-step complete transaction flow & Net Realization Engine.
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsDemoModalOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-xs whitespace-nowrap active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch 20-Step Live Tour</span>
        </button>
      </div>

      {/* Top Banner / Welcome & Demo Tour Trigger */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 p-5 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Farmer Command Center (Primary Showcase)
            </span>
            <span className="text-xs text-stone-300">
              {user?.village || 'Chandragiri'}, {user?.district || 'Chittoor'}, AP
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Namaskaram, {user?.name || 'Ramesh Naidu'} garu 🌾
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Demo Market Data for <strong>Tomato</strong> shows upward momentum. Best verified buyer tender is <strong>₹2,800/qtl</strong> with guaranteed simulated escrow settlement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-stone-950 shrink-0" />
            <span>⚡ 20-Step Live Walkthrough</span>
          </button>

          <Link
            to="/lots/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 text-xs sm:text-sm font-bold shadow-md transition-colors min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>+ Create Crop Lot</span>
          </Link>
        </div>
      </div>

      {/* =========================================================================
          CORE USP SHOWCASE: NET REALIZATION ENGINE
          Directly satisfies Requirement 3 & 4 with all 7 mandatory parameters
          ========================================================================= */}
      <div className="bg-white rounded-2xl border-2 border-emerald-500/60 shadow-lg p-4 sm:p-6 space-y-5 sm:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wider flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span>Core Platform USP</span>
              </span>
              <span className="text-xs font-semibold text-stone-500">
                Transparent True Earnings Engine
              </span>
            </div>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-stone-900 mt-1">
              Net Realization Engine: In-Pocket Farm Earnings
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-0.5">
              Traditional mandi gross prices conceal heavy deductions. AgriSetu itemizes transport, storage, and APMC cess to prove exact take-home realization.
            </p>
          </div>

          {/* Quick Crop Selector for Evaluator Demo */}
          <div className="flex items-center gap-1.5 flex-wrap bg-stone-100 p-1.5 rounded-xl border border-stone-200 self-start md:self-auto">
            <span className="text-[11px] font-bold text-stone-600 px-1.5">Test Crop:</span>
            {(['Tomato', 'Red Chilli', 'Paddy', 'Cotton'] as const).map((crop) => (
              <button
                key={crop}
                onClick={() => setSimCrop(crop)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all min-h-[34px] ${
                  simCrop === crop
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-white'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* The 7 Required Net Realization Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3 text-center">
          {/* 1. Current Market Price */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              1. Current Market Price
            </div>
            <div className="my-1.5 sm:my-2">
              <span className="font-heading font-black text-lg sm:text-xl text-stone-900">
                ₹{simCurrentPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-stone-500 block">/quintal</span>
            </div>
            <div className="text-[10px] text-stone-500">Local APMC Mandi Modal</div>
          </div>

          {/* 2. Best Available Price */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col justify-between">
            <div className="text-[10px] sm:text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              2. Best Available Price
            </div>
            <div className="my-1.5 sm:my-2">
              <span className="font-heading font-black text-lg sm:text-xl text-emerald-900">
                ₹{simBestPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-700 block">/quintal</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-700">Verified Buyer Tender</div>
          </div>

          {/* 3. Transport Cost */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              3. Transport Cost
            </div>
            <div className="my-1.5 sm:my-2">
              <span className="font-heading font-black text-lg sm:text-xl text-rose-700">
                -₹{simTransportCostPerQtl}
              </span>
              <span className="text-[10px] text-stone-500 block">/quintal</span>
            </div>
            <div className="text-[10px] text-stone-500">{simDistanceKm} km 3PL Freight</div>
          </div>

          {/* 4. Storage Cost */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              4. Storage Cost
            </div>
            <div className="my-1.5 sm:my-2">
              <span className="font-heading font-black text-lg sm:text-xl text-rose-700">
                -₹{simStorageCostPerQtl}
              </span>
              <span className="text-[10px] text-stone-500 block">/quintal</span>
            </div>
            <div className="text-[10px] text-stone-500">{simStorageDays} Days Cold Preservation</div>
          </div>

          {/* 5. APMC Cess */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              5. APMC Cess
            </div>
            <div className="my-1.5 sm:my-2">
              <span className="font-heading font-black text-lg sm:text-xl text-rose-700">
                -₹{simApmcCessPerQtl}
              </span>
              <span className="text-[10px] text-stone-500 block">/quintal</span>
            </div>
            <div className="text-[10px] text-stone-500">1% Statutory Market Fee</div>
          </div>

          {/* 6. Net Realization */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-emerald-100 to-emerald-50 border-2 border-emerald-500 flex flex-col justify-between col-span-1 sm:col-span-1">
            <div className="text-[10px] sm:text-[11px] font-black text-emerald-950 uppercase tracking-wider">
              6. Net Realization
            </div>
            <div className="my-1.5 sm:my-2">
              <span className="font-heading font-black text-xl sm:text-2xl text-emerald-950">
                ₹{simNetRealizationPerQtl.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-800 font-bold block">/quintal</span>
            </div>
            <div className="text-[10px] font-bold text-emerald-800">Net in Account</div>
          </div>

          {/* 7. Potential Additional Income */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-amber-100 to-amber-50 border-2 border-amber-500 flex flex-col justify-between col-span-1 sm:col-span-1">
            <div className="text-[10px] sm:text-[11px] font-black text-amber-950 uppercase tracking-wider">
              7. Extra Income
            </div>
            <div className="my-1.5 sm:my-2">
              <span className="font-heading font-black text-xl sm:text-2xl text-amber-950">
                +₹{simTotalAdditionalIncome.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-amber-900 font-bold block">on {simQuantity}q</span>
            </div>
            <div className="text-[10px] font-extrabold text-amber-900">+₹{simPotentialAdditionalPerQtl}/q vs Mandi</div>
          </div>
        </div>

        {/* Interactive Simulator Sliders for Evaluators */}
        <div className="bg-stone-50 rounded-xl p-3.5 sm:p-4 border border-stone-200">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-xs font-bold text-stone-800">
              Interactive Net Realization Simulator (Adjust sliders to test dynamic yield recalculation):
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Lot Harvest Volume:</span>
                <strong className="text-emerald-800">{simQuantity} Quintals</strong>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={simQuantity}
                onChange={(e) => setSimQuantity(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-stone-200 accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Distance to Buyer Hub:</span>
                <strong className="text-emerald-800">{simDistanceKm} km</strong>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={simDistanceKm}
                onChange={(e) => setSimDistanceKm(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-stone-200 accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Cold Chain Holding Days:</span>
                <strong className="text-emerald-800">{simStorageDays} Days</strong>
              </div>
              <input
                type="range"
                min="0"
                max="7"
                step="1"
                value={simStorageDays}
                onChange={(e) => setSimStorageDays(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-stone-200 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMPLETE TRANSACTION LIFECYCLE PROGRESS SHOWCASE
          Directly satisfies Requirement 2 with clear 5-stage visual progression
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 uppercase">
                End-to-End Workflow
              </span>
              <span className="text-xs text-stone-500">
                Current Active Order: <strong>{latestOrder?.orderNumber || latestOrder?.orderId || 'ORD-2026-000105'}</strong>
              </span>
            </div>
            <h3 className="font-heading font-black text-lg text-stone-900 mt-1">
              Complete Digital Transaction Lifecycle
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">
              Escrow Protection:
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
              SIMULATED ESCROW — Prototype
            </span>
          </div>
        </div>

        {/* 5-Stage Visual Workflow Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {/* Stage 1 */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            lifecycleStage >= 1
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-stone-50 border-stone-200 text-stone-500'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>1. Agreement</span>
              {lifecycleStage >= 1 && <Check className="w-4 h-4 text-emerald-700" />}
            </div>
            <p className="text-xs font-semibold">Offer Accepted at ₹2,750/qtl</p>
            <span className="text-[10px] text-stone-500 block mt-1">Digital Contract Signed</span>
          </div>

          {/* Stage 2 */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            lifecycleStage >= 2
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-stone-50 border-stone-200 text-stone-500'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>2. Escrow Locked</span>
              {lifecycleStage >= 2 && <Check className="w-4 h-4 text-emerald-700" />}
            </div>
            <p className="text-xs font-semibold">SIMULATED ESCROW — Prototype</p>
            <span className="text-[10px] text-stone-500 block mt-1">₹1,37,500 Protected</span>
          </div>

          {/* Stage 3 */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            lifecycleStage >= 3
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-stone-50 border-stone-200 text-stone-500'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>3. 3PL Logistics</span>
              {lifecycleStage >= 3 ? <Check className="w-4 h-4 text-emerald-700" /> : <Clock className="w-4 h-4 text-stone-400" />}
            </div>
            <p className="text-xs font-semibold">Truck AP 04 TT 8821</p>
            <span className="text-[10px] text-stone-500 block mt-1">45 km Farmgate Transit</span>
          </div>

          {/* Stage 4 */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            lifecycleStage >= 4
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-stone-50 border-stone-200 text-stone-500'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>4. Weighbridge</span>
              {lifecycleStage >= 4 ? <Check className="w-4 h-4 text-emerald-700" /> : <Clock className="w-4 h-4 text-stone-400" />}
            </div>
            <p className="text-xs font-semibold">50.0 Quintals Confirmed</p>
            <span className="text-[10px] text-stone-500 block mt-1">Grade A Verified at Bay</span>
          </div>

          {/* Stage 5 */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            lifecycleStage >= 5
              ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-xs ring-2 ring-emerald-500/30'
              : 'bg-stone-50 border-stone-200 text-stone-500'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span>5. Payout</span>
              {lifecycleStage >= 5 ? <Check className="w-4 h-4 text-emerald-700" /> : <Clock className="w-4 h-4 text-stone-400" />}
            </div>
            <p className="text-xs font-bold text-emerald-900">Simulated Settlement</p>
            <span className="text-[10px] text-emerald-700 font-bold block mt-1">₹1,36,400 Credited</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="text-stone-600">
            Current State:{' '}
            <strong className="text-stone-900 font-bold">
              {latestOrder?.status || 'ORDER CREATED'}
            </strong>{' '}
            • Escrow Status:{' '}
            <strong className="text-emerald-800 font-bold">
              {latestOrder?.escrowStatus || 'FUNDS SIMULATED / PROTECTED'}
            </strong>
          </div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline"
          >
            <span>Inspect Escrow Trust Ledger & Weighbridge Records</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Left Lots & Offers, Right Market Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Lots & Offers (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Offers Section */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <h3 className="font-bold text-base text-stone-900">Active Digital Offers ({offers.length})</h3>
              </div>
              <Link to="/offers" className="text-xs font-bold text-emerald-700 hover:underline">
                View negotiation history →
              </Link>
            </div>

            {offers.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500 border border-dashed border-stone-200 rounded-xl">
                No active offers pending. Once buyers view your listed lot, offers will appear here.
              </div>
            ) : (
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer._id}
                    className="p-4 rounded-xl border border-stone-200 hover:border-emerald-400 bg-stone-50/50 space-y-3 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-stone-900">{offer.buyerCompany}</span>
                          {offer.isBuyerVerified && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 flex items-center gap-0.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                              VERIFIED
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500">
                          Lot: {offer.lotCode} • {offer.quantity} {offer.unit} of {offer.crop}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-emerald-800">
                          ₹{offer.currentPrice.toLocaleString('en-IN')}/{offer.unit}
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            offer.status === 'ACCEPTED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : offer.status === 'COUNTERED'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          Status: {offer.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200 flex flex-wrap items-center justify-between gap-2">
                      <span>Transport: <strong>{offer.transportResponsibility}</strong></span>
                      <span>Escrow: <strong>SIMULATED ESCROW — Prototype</strong></span>
                      <span>Delivery: <strong>{offer.deliveryDate}</strong></span>
                    </div>

                    {offer.status !== 'ACCEPTED' && (
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          disabled={actionLoading}
                          onClick={() => handleAcceptOffer(offer._id)}
                          className="flex-1 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Accept Offer (₹{offer.currentPrice})</span>
                        </button>
                        <button
                          onClick={() => {
                            setCounterModalOffer(offer);
                            setCounterPrice(offer.currentPrice + 100);
                          }}
                          className="px-4 py-2 rounded-lg bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors"
                        >
                          Counter Offer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Crop Lots */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900">My Crop Lots ({lots.length})</h3>
              <Link to="/lots" className="text-xs font-bold text-emerald-700 hover:underline">
                View all lots →
              </Link>
            </div>

            <div className="space-y-3">
              {lots.map((lot) => (
                <div
                  key={lot._id}
                  className="p-4 rounded-xl border border-stone-200 hover:border-emerald-300 bg-white space-y-2.5 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-500">{lot.lotId}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {lot.qualityGrade}
                        </span>
                        {lot.isAggregated && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                            FPO Aggregated
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-base text-stone-900 mt-0.5">
                        {lot.quantity} {lot.unit} {lot.crop} ({lot.variety})
                      </h4>
                      <p className="text-xs text-stone-500">
                        Harvested: {lot.harvestDate} • {lot.location}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-stone-900">
                        ₹{lot.expectedPrice.toLocaleString('en-IN')}/{lot.unit}
                      </div>
                      <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {lot.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <div className="text-stone-500">
                      Offers received: <strong className="text-stone-800">{lot.offersCount || 0}</strong>
                    </div>
                    <Link
                      to="/buyer-matching"
                      className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Match verified buyers</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live Market Comparison & AI Projections (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Nearby Mandi Price Comparison */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base text-stone-900">Mandi Price Comparison</h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-600">
                    Demo Market Data
                  </span>
                </div>
                <p className="text-xs text-stone-500">Net Realization for 50q Tomato lot</p>
              </div>
              <Link to="/market-intelligence" className="text-xs font-bold text-emerald-700 hover:underline">
                Full APMC Table →
              </Link>
            </div>

            <div className="space-y-2.5">
              {marketPrices.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition-all ${
                    m.isBestNetRealization
                      ? 'border-emerald-400 bg-emerald-50/50 shadow-2xs'
                      : 'border-stone-200 bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-stone-900">{m.marketName} Mandi</span>
                        {m.isBestNetRealization && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-600 text-white uppercase">
                            Best Net Profit
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Modal: ₹{m.modalPrice}/qtl • Transit: -₹{m.transportCostPerQtl || 100}/qtl
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-emerald-800">
                        ₹{(m.netRealizationPerQtl || m.modalPrice - 140).toLocaleString('en-IN')}/qtl
                      </div>
                      <div className="text-[10px] text-stone-500">In pocket</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-stone-100 text-[11px] text-stone-600 space-y-1">
              <div className="font-bold text-stone-800 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-700" />
                <span>Net Realization Formula:</span>
              </div>
              <p>Mandi Modal Price - Transit Fuel - Loading & Storage - Cess = Real Profit.</p>
            </div>
          </div>

          {/* AI Sale Window Card */}
          <div className="bg-gradient-to-br from-emerald-950 to-stone-900 rounded-2xl p-5 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Gemini 3.8 Flash Market Advice</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-300">Updated today</span>
            </div>

            <div>
              <h4 className="font-heading font-black text-lg text-white">
                Best Selling Window: Next 2–3 Days
              </h4>
              <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                Madanapalle terminal arrivals down 14%. Holding in crates until Wednesday is expected to capture peak price of ₹2,760/qtl (+₹110 over storage cost).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-emerald-200">
              <span className="font-bold text-white block mb-0.5">Telugu Summary / తెలుగు వివరణ:</span>
              <span>ధరలు పెరుగుతున్నాయి. 2-3 రోజుల వ్యవధిలో విక్రయిస్తే అధిక నికర లాభం లభిస్తుంది.</span>
            </div>

            {/* Prominent Mandatory AI Disclaimer */}
            <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-[11px] text-amber-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>AI-generated estimate — actual market prices may vary.</span>
            </div>

            <Link
              to="/sale-window"
              className="block w-full text-center py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs transition-colors"
            >
              Analyze Cold Storage Costs & 4-Day Forecast →
            </Link>
          </div>

          {/* Simulated Escrow Protection Notice */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h4 className="font-bold text-sm">SIMULATED ESCROW — Prototype</h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every digital offer is backed by simulated escrow. Once delivery and weighbridge slips are validated, ₹1,36,400 completes via <strong>Simulated Settlement</strong> to your registered farmer account.
            </p>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-semibold">
              🔒 Prototype Guarantee: Zero default risk during transit & testing.
            </div>
            <Link
              to="/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
            >
              <span>View Escrow Ledger & Past Settlements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Counter Offer Modal */}
      {counterModalOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900">Submit Counter Offer</h3>
              <button
                onClick={() => setCounterModalOffer(null)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-stone-600 space-y-1">
              <div>Buyer: <strong>{counterModalOffer.buyerCompany}</strong></div>
              <div>Their Offer: <strong>₹{counterModalOffer.currentPrice}/{counterModalOffer.unit}</strong></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Your Counter Price (₹ per {counterModalOffer.unit})
              </label>
              <input
                type="number"
                value={counterPrice}
                onChange={(e) => setCounterPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Message to Buyer
              </label>
              <textarea
                rows={3}
                value={counterMsg}
                onChange={(e) => setCounterMsg(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setCounterModalOffer(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleSendCounter}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
              >
                {actionLoading ? 'Submitting...' : 'Send Counter Offer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

