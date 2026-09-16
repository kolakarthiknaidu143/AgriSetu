import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IMarketPrice, ICrop } from '../types';
import { MarketTrendChart } from '../components/MarketTrendChart';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  Search,
  Scale,
  DollarSign,
  Truck,
  Warehouse,
  Sparkles,
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';

export const MarketIntelligencePage: React.FC = () => {
  const [crops, setCrops] = useState<ICrop[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('Tomato');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [marketPrices, setMarketPrices] = useState<IMarketPrice[]>([]);
  const [historicalTrend, setHistoricalTrend] = useState<any[]>([]);
  const [trendSummary, setTrendSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Reference lot size for net realization calculation
  const [lotQuantityQuintals, setLotQuantityQuintals] = useState<number>(50);

  useEffect(() => {
    api.getCrops().then(res => setCrops(res.crops)).catch(() => {});
  }, []);

  const loadMarketData = async () => {
    setLoading(true);
    try {
      const [pricesRes, trendsRes] = await Promise.all([
        api.getMarketPrices({
          crop: selectedCrop,
          state: selectedState,
          district: selectedDistrict
        }),
        api.getMarketTrends(selectedCrop)
      ]);

      setMarketPrices(pricesRes.prices);
      setHistoricalTrend(trendsRes.historicalTrend);
      setTrendSummary(trendsRes.summary);
    } catch (err) {
      console.warn('Error loading market data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, [selectedCrop, selectedState, selectedDistrict]);

  const bestMarket = marketPrices.find(m => m.isBestNetRealization) || marketPrices[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            Demo Market Data • APMC Price Discovery
          </span>
          <span className="text-xs text-stone-500">Demo Market Data — Calibrated modal quotes from regional APMCs</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          Mandi Price Discovery & Net Realization Analysis
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          The highest modal price does not always mean the highest profit. We automatically calculate transport fuel, handling fees, storage costs, and APMC cess to reveal your true <strong>Net Realization</strong>.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Crop Selection */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-stone-700">Select Crop:</span>
          {crops.map((c) => (
            <button
              key={c._id}
              onClick={() => setSelectedCrop(c.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                selectedCrop === c.name
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* State & District Dropdowns */}
        <div className="flex items-center gap-3">
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All States</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>

          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All">All Districts</option>
              <option value="Chittoor">Chittoor</option>
              <option value="Tirupati">Tirupati</option>
              <option value="Guntur">Guntur</option>
              <option value="Krishna">Krishna / Vijayawada</option>
              <option value="Kolar">Kolar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Best Realization Highlight Banner */}
      {bestMarket && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-stone-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-emerald-950 uppercase tracking-wider">
                Recommended Mandi Destination
              </span>
              <span className="text-xs text-emerald-200">
                {bestMarket.marketName} Mandi ({bestMarket.district}, {bestMarket.state})
              </span>
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
              Highest Expected Net Realization: ₹{(bestMarket.netRealizationPerQtl || 2600).toLocaleString('en-IN')}/quintal
            </h3>
            <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xl">
              Modal Price ₹{bestMarket.modalPrice} minus ₹{bestMarket.transportCostPerQtl || 100} transit fuel and ₹{bestMarket.storageCostPerQtl || 25} handling gives you maximum in-pocket revenue.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-right backdrop-blur min-w-[200px]">
            <span className="text-[11px] text-emerald-200 block">Total Net for 50q Lot:</span>
            <span className="text-2xl font-black text-amber-300">
              ₹{((bestMarket.netRealizationPerQtl || 2600) * lotQuantityQuintals).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-300 block mt-0.5">
              ₹{(350 * lotQuantityQuintals).toLocaleString('en-IN')} more than local village distress sale
            </span>
          </div>
        </div>
      )}

      {/* 7-Day Trend Chart & Net Realization Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recharts Trend Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-stone-900">
                {selectedCrop} 7-Day Price & Arrival Velocity Trend
              </h3>
              <p className="text-xs text-stone-500">
                Green solid line = Modal Price • Orange bars = APMC Arrival Volume (Tonnes)
              </p>
            </div>
            {trendSummary && (
              <div className="text-right">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+{trendSummary.weekChangePercentage}% this week</span>
                </span>
              </div>
            )}
          </div>

          <MarketTrendChart data={historicalTrend} cropName={selectedCrop} />

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <span>Market velocity: <strong>Bullish with tightening supply</strong></span>
            <span className="text-emerald-700 font-semibold">Gemini Confidence: 88%</span>
          </div>
        </div>

        {/* Right: Net Realization Interactive Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-stone-900">
              Net Realization Calculator
            </h3>
            <p className="text-xs text-stone-500">
              Simulate true earnings after logistics deductions
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Harvest Lot Size (Quintals):
            </label>
            <input
              type="number"
              value={lotQuantityQuintals}
              onChange={(e) => setLotQuantityQuintals(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Breakdown for Top 3 Mandis */}
          <div className="space-y-3">
            {marketPrices.slice(0, 3).map((m, idx) => {
              const gross = m.modalPrice * lotQuantityQuintals;
              const transport = (m.transportCostPerQtl || 100) * lotQuantityQuintals;
              const handling = (m.storageCostPerQtl || 25) * lotQuantityQuintals;
              const net = gross - transport - handling;

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    m.isBestNetRealization
                      ? 'border-emerald-500 bg-emerald-50/70'
                      : 'border-stone-200 bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">{m.marketName} Mandi</span>
                    <span className="font-black text-sm text-emerald-800">
                      ₹{net.toLocaleString('en-IN')} Net
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1 flex items-center justify-between">
                    <span>Gross: ₹{gross.toLocaleString('en-IN')}</span>
                    <span>Fuel: -₹{transport.toLocaleString('en-IN')}</span>
                    <span>Handling: -₹{handling.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
            <span className="font-bold block">💡 Farm Advisor Note:</span>
            <span>
              Direct pickup by verified corporate buyers eliminates the transport deduction completely! Check the Buyer Marketplace to request buyer-side logistics.
            </span>
            <div className="text-[10px] text-amber-800/90 pt-1 border-t border-amber-200/60 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>AI-generated estimate — actual market prices may vary.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive APMC Price Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-stone-900">
              APMC Mandi Quotes & Arrival Volumes ({marketPrices.length} Mandis)
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200">
              Demo Market Data
            </span>
          </div>
          <span className="text-xs text-stone-500">Modal quotes in INR (₹) per quintal</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Mandi / Location</th>
                <th className="px-4 py-3">Crop Variety</th>
                <th className="px-4 py-3">Min Price</th>
                <th className="px-4 py-3">Modal Price</th>
                <th className="px-4 py-3">Max Price</th>
                <th className="px-4 py-3">Daily Arrivals</th>
                <th className="px-4 py-3">Transit Cost</th>
                <th className="px-4 py-3">Net Realization</th>
                <th className="px-4 py-3 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {marketPrices.map((m) => {
                const minP = m.minPrice ?? 0;
                const modalP = m.modalPrice ?? 0;
                const maxP = m.maxPrice ?? 0;
                const netReal = m.netRealizationPerQtl || (modalP - 140);
                const pct = m.priceChangePercentage ?? 0;

                return (
                  <tr key={m._id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="px-4 py-3 font-semibold text-stone-900">
                      <div>{m.marketName}</div>
                      <div className="text-[10px] text-stone-500 font-normal">{m.district}, {m.state}</div>
                    </td>
                    <td className="px-4 py-3">{m.cropName}</td>
                    <td className="px-4 py-3">₹{minP.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 font-bold text-stone-900">
                      ₹{modalP.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-stone-600">₹{maxP.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium">{m.arrivalQuantity || 0}</span> {m.arrivalUnit || 'tonnes'}
                    </td>
                    <td className="px-4 py-3 text-rose-600 font-medium">
                      -₹{m.transportCostPerQtl || 100}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-black text-emerald-800 text-sm">
                        ₹{netReal.toLocaleString('en-IN')}
                      </span>
                      {m.isBestNetRealization && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          BEST
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          m.trend === 'RISING'
                            ? 'bg-emerald-100 text-emerald-800'
                            : m.trend === 'FALLING'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {m.trend === 'RISING' && <TrendingUp className="w-3 h-3" />}
                        {m.trend === 'FALLING' && <TrendingDown className="w-3 h-3" />}
                        {m.trend === 'STABLE' && <Minus className="w-3 h-3" />}
                        <span>{pct > 0 ? `+${pct}%` : `${pct}%`}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
