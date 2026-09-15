import React, { useState } from 'react';
import { api } from '../services/api';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  Languages
} from 'lucide-react';

export const PricePredictionPage: React.FC = () => {
  const [crop, setCrop] = useState('Tomato');
  const [currentPrice, setCurrentPrice] = useState<number>(2650);
  const [location, setLocation] = useState('Chittoor / Tirupati, AP');
  const [season, setSeason] = useState('Kharif / Rabi Transition');
  const [arrivalTrend, setArrivalTrend] = useState('Declining by 14% at terminal mandis');

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>({
    crop: 'Tomato',
    currentPrice: 2650,
    expectedPriceRange: { min: 2720, max: 2840, currency: '₹', unit: 'quintal' },
    trend: 'RISING',
    confidenceLevel: 88,
    mainFactors: [
      'Madanapalle & Kolar terminal arrivals down by 14% this week',
      'Bulk procurement demand by organized retail & food processors in Sri City',
      'Seasonal moisture variations affecting short-term spot deliveries'
    ],
    recommendation: 'Prices are showing an upward trend. Waiting 2–3 days with proper crate storage is expected to yield higher net realization.',
    teluguSummary: 'ధరలు పెరుగుతున్నాయి. 2-3 రోజుల వ్యవధిలో విక్రయిస్తే అధిక నికర లాభం లభిస్తుంది.',
    isAiGenerated: true,
    disclaimer: 'AI-generated estimate — actual market prices may vary.'
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.predictPrice({
        crop,
        currentPrice: Number(currentPrice),
        location,
        season,
        arrivalTrend
      });
      setPrediction(res);
    } catch (err: any) {
      alert(err.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Gemini 3.8 Flash Agro-Economic Model</span>
          </span>
          <span className="text-xs text-stone-500">Multimodal Market Prediction Engine</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          AI-Powered Crop Price Prediction
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Forecast mandi price trajectories over the next 3 to 7 days using terminal arrivals, historical seasonal elasticities, and buyer demand surges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <BrainCircuit className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-base text-stone-900">Configure Market Parameters</h3>
          </div>

          <form onSubmit={handlePredict} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Crop & Variety
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="Tomato">Tomato (హైబ్రిడ్ టమాటా)</option>
                <option value="Red Chilli">Red Chilli - Teja / Byadgi (మిరప)</option>
                <option value="Paddy">Paddy / Rice (వరి)</option>
                <option value="Cotton">Cotton / Kapas (పత్తి)</option>
                <option value="Maize">Maize / Corn (మొక్కజొన్న)</option>
                <option value="Onion">Onion (ఉల్లిపాయ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Current Mandi Spot Price (₹ per Quintal)
              </label>
              <input
                type="number"
                required
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                District / Production Basin
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Season / Harvest Phase
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="Kharif / Rabi Transition">Kharif / Rabi Transition (Peak Quality)</option>
                <option value="Peak Harvest Window">Peak Harvest Window (High Volume)</option>
                <option value="Late Season Harvest">Late Season Harvest (Scarcity)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Recent Mandi Arrival Signal
              </label>
              <select
                value={arrivalTrend}
                onChange={(e) => setArrivalTrend(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                <option value="Declining by 14% at terminal mandis">Declining arrivals (-14% in Madanapalle/Kolar)</option>
                <option value="Heavy flood of produce arriving daily">Heavy arrivals (+20% supply glut)</option>
                <option value="Steady moderate daily arrivals">Steady normal arrivals</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Analyzing Mandi Signals...' : 'Run Gemini AI Prediction'}</span>
            </button>
          </form>
        </div>

        {/* Right: AI Forecast Results Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {prediction && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-md space-y-6 animate-in fade-in">
              {/* Top Result Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <div className="text-xs text-stone-500 font-semibold">{prediction.crop} 4-Day Forecast</div>
                  <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-950 mt-0.5">
                    {prediction.expectedPriceRange.currency}
                    {prediction.expectedPriceRange.min.toLocaleString('en-IN')} – {prediction.expectedPriceRange.currency}
                    {prediction.expectedPriceRange.max.toLocaleString('en-IN')}
                    <span className="text-sm font-normal text-stone-500"> / {prediction.expectedPriceRange.unit}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>Expected Trend: {prediction.trend}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    AI Confidence Score: <strong className="text-stone-800">{prediction.confidenceLevel}%</strong>
                  </div>
                </div>
              </div>

              {/* Main Explanatory Factors */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Primary Market Drivers Identified by AI:
                </h4>
                <div className="space-y-2">
                  {prediction.mainFactors.map((factor: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Advice & Telugu Advisory */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3">
                <div className="text-xs text-emerald-950 leading-relaxed font-medium">
                  <strong className="block text-emerald-900 font-bold mb-1">Actionable Farmer Advisory:</strong>
                  {prediction.recommendation}
                </div>

                {prediction.teluguSummary && (
                  <div className="p-3 rounded-lg bg-white/80 border border-emerald-300 text-xs text-emerald-900 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-emerald-800 text-[11px]">
                      <Languages className="w-3.5 h-3.5" />
                      <span>తెలుగు రైతు సలహా (Telugu Advisory):</span>
                    </span>
                    <p className="leading-relaxed">{prediction.teluguSummary}</p>
                  </div>
                )}
              </div>

              {/* Mandatory AI Disclaimer */}
              <div className="p-3 rounded-xl bg-amber-50/90 text-xs text-amber-900 border border-amber-300 flex items-center gap-2 font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <p className="leading-relaxed">AI-generated estimate — actual market prices may vary.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
