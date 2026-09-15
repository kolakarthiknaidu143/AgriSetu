import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import {
  Clock,
  Sparkles,
  TrendingUp,
  Warehouse,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  HelpCircle,
  Calendar,
  Languages,
  ShieldAlert
} from 'lucide-react';

export const SaleWindowPage: React.FC = () => {
  const [crop, setCrop] = useState('Tomato');
  const [currentPrice, setCurrentPrice] = useState<number>(2650);
  const [lotQuantity, setLotQuantity] = useState<number>(50);
  const [shelfLifeDays, setShelfLifeDays] = useState<number>(5);
  const [storageCostPerDay, setStorageCostPerDay] = useState<number>(2.2);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>({
    crop: 'Tomato',
    currentPrice: 2650,
    bestEstimatedWindow: '2–3 days',
    timeline: [
      { dayOffset: 0, label: 'Today', expectedPrice: 2650, trend: 'STABLE', arrivalVolumeTrend: 'Normal' },
      { dayOffset: 1, label: 'Tomorrow', expectedPrice: 2680, trend: 'RISING', arrivalVolumeTrend: 'Normal' },
      { dayOffset: 2, label: '+2 Days (Wed)', expectedPrice: 2760, trend: 'RISING', arrivalVolumeTrend: 'Low', isPeak: true },
      { dayOffset: 3, label: '+3 Days (Thu)', expectedPrice: 2720, trend: 'STABLE', arrivalVolumeTrend: 'Normal' },
      { dayOffset: 4, label: '+4 Days (Fri)', expectedPrice: 2580, trend: 'FALLING', arrivalVolumeTrend: 'High' }
    ],
    reasons: {
      marketArrivals: 'Arrival quantities from neighboring mandis are projected to fall by 18% over the next 48 hours.',
      demand: 'Verified processors in Sri City are seeking immediate bulk lots to replenish factory lines.',
      historicalTrend: 'Historical 3-year September mandi records show a consistent mid-week price surge.',
      storageCostImpact: 'Local cold storage at ₹2.20/qtl/day costs only ₹6.60 total for 3 days, well below the expected +₹110/qtl price gain.',
      priceMovement: 'Prices projected to peak between Day 2 and Day 3 afternoon at ₹2,760/qtl.'
    },
    storageAdvice: 'If holding for 2–3 days, keep in ventilated plastic crates at 12–15°C to prevent transit bruising.',
    teluguRecommendation: 'ఉత్తమ విక్రయ సమయం: రాబోయే 2 నుండి 3 రోజులలో. నిల్వ ఖర్చుల కంటే లాభం అధికం.',
    disclaimer: 'AI-generated estimate — actual market prices may vary.'
  });

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await api.recommendSaleWindow({
        crop,
        currentPrice: Number(currentPrice),
        shelfLifeDays: Number(shelfLifeDays),
        storageDailyCost: Number(storageCostPerDay)
      });
      setResult(res);
    } catch (err: any) {
      alert(err.message || 'Failed to calculate sale window');
    } finally {
      setLoading(false);
    }
  };

  // Arbitrage calculations
  const sellNowTotal = currentPrice * lotQuantity;
  const peakPrice = result?.timeline?.find((t: any) => t.isPeak)?.expectedPrice || Math.round(currentPrice * 1.045);
  const storageTotal = storageCostPerDay * 3 * lotQuantity;
  const sellLaterTotal = peakPrice * lotQuantity - storageTotal;
  const netAdvantage = sellLaterTotal - sellNowTotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Smart Timing Engine</span>
          </span>
          <span className="text-xs text-stone-500">Harvest Preservation & Storage Arbitrage</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          Smart Sale-Window Recommendation
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Selling immediately upon harvest often depresses farm profits. Our algorithm analyzes mandi arrival velocity, perishable shelf-life, and cold chain costs to find the optimal day to sell.
        </p>
      </div>

      {/* Hero Recommendation Badge */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-stone-950 uppercase tracking-wide">
              Optimal Selling Window
            </span>
            <span className="text-xs text-emerald-200">Based on APMC terminal velocities</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Best Selling Window: {result.bestEstimatedWindow}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
            Peak expected price of <strong>₹{peakPrice.toLocaleString('en-IN')}/qtl</strong> on Day 2–3. Holding produce in aerated crates or local cold hub yields a net profit boost of <strong>+₹{netAdvantage.toLocaleString('en-IN')}</strong> on 50 quintals.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-right backdrop-blur min-w-[200px]">
          <span className="text-xs text-emerald-200 block">Net Gain after Storage:</span>
          <span className="text-3xl font-black text-amber-300">
            +₹{netAdvantage.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-emerald-300 block mt-0.5">
            After deducting ₹{storageTotal.toLocaleString('en-IN')} storage fee
          </span>
        </div>
      </div>

      {/* 4-Day Timeline Stepper */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-stone-900">
            4-Day Price & Arrival Trajectory
          </h3>
          <span className="text-xs text-stone-500">Mandi Modal Price Projections</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {result.timeline?.map((day: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all space-y-2 ${
                day.isPeak || idx === 2
                  ? 'border-emerald-500 bg-emerald-50/80 shadow-sm ring-2 ring-emerald-400/40'
                  : 'border-stone-200 bg-stone-50/50'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-700">{day.label}</span>
                {idx === 2 && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-600 text-white uppercase">
                    PEAK
                  </span>
                )}
              </div>

              <div className="font-heading font-black text-2xl text-stone-900">
                ₹{day.expectedPrice.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-stone-500">/qtl</span>
              </div>

              <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span>Arrivals:</span>
                  <span className="font-bold text-stone-800">{day.arrivalVolumeTrend}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Trend:</span>
                  <span
                    className={`font-bold ${
                      day.trend === 'RISING'
                        ? 'text-emerald-700'
                        : day.trend === 'FALLING'
                        ? 'text-rose-700'
                        : 'text-stone-600'
                    }`}
                  >
                    {day.trend}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Explanations & Arbitrage Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Detailed Reasons & Storage Advice (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-stone-900">
              Why the Algorithm Recommends Waiting 2–3 Days:
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold mb-0.5">Market Arrivals Velocity:</strong>
                  {result.reasons?.marketArrivals}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold mb-0.5">Corporate & Institutional Demand:</strong>
                  {result.reasons?.demand}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold mb-0.5">Historical Seasonal Pattern:</strong>
                  {result.reasons?.historicalTrend}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-bold mb-0.5">Cold Chain Cost Feasibility:</strong>
                  {result.reasons?.storageCostImpact}
                </div>
              </div>
            </div>

            {/* Storage Advice */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Warehouse className="w-4 h-4 text-blue-700" />
                <span>Physical Storage & Handling Instructions:</span>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                {result.storageAdvice}
              </p>
            </div>

            {/* Telugu Recommendation */}
            {result.teluguRecommendation && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
                <span className="font-bold text-xs text-emerald-900 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-emerald-700" />
                  <span>తెలుగు రైతు సలహా:</span>
                </span>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {result.teluguRecommendation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sell Now vs. Store & Sell Later Comparison (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-base text-stone-900">
              Sell Now vs. Store Arbitrage
            </h3>
            <p className="text-xs text-stone-500">
              Clear financial comparison for 50 quintals harvest
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Option 1: Sell Now */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
              <div className="flex items-center justify-between text-stone-700 font-bold">
                <span>Option A: Sell Immediately (Today)</span>
                <span className="text-stone-500">No Storage</span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-stone-600">50 quintals @ ₹{currentPrice}/qtl:</span>
                <span className="font-bold text-base text-stone-900">
                  ₹{sellNowTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Option 2: Store 3 Days & Sell Later */}
            <div className="p-4 rounded-xl border border-emerald-400 bg-emerald-50/70 space-y-2.5">
              <div className="flex items-center justify-between text-emerald-900 font-bold">
                <span>Option B: Store 3 Days & Sell at Peak</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-200 font-extrabold text-emerald-900">
                  RECOMMENDED
                </span>
              </div>

              <div className="space-y-1.5 text-stone-700">
                <div className="flex items-center justify-between">
                  <span>Gross (50q @ ₹{peakPrice}/qtl):</span>
                  <span className="font-semibold text-stone-900">
                    ₹{(peakPrice * lotQuantity).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-rose-600">
                  <span>Cold Storage Fee (3 days @ ₹2.20/qtl/day):</span>
                  <span>-₹{storageTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-emerald-200 font-bold text-sm text-emerald-900">
                  <span>Net In-Pocket Realization:</span>
                  <span className="text-base font-black">
                    ₹{sellLaterTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Gain Result */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-center space-y-1">
              <span className="text-xs text-amber-900 font-bold uppercase tracking-wider block">
                Additional Net Profit Earned by Waiting:
              </span>
              <span className="font-heading font-black text-2xl text-amber-950 block">
                +₹{netAdvantage.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-amber-800 block">
                For keeping produce in local cold chain for 72 hours
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/90 text-xs text-amber-900 border border-amber-300 flex items-center gap-2 font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <p className="leading-relaxed">AI-generated estimate — actual market prices may vary.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
