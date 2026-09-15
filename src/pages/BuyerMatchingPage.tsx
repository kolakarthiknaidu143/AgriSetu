import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ICropLot } from '../types';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  TrendingUp,
  Truck,
  ArrowRight,
  CheckCircle2,
  Filter,
  Layers,
  Award
} from 'lucide-react';

export const BuyerMatchingPage: React.FC = () => {
  const [lots, setLots] = useState<ICropLot[]>([]);
  const [selectedLotId, setSelectedLotId] = useState<string>('');
  const [matchedBuyers, setMatchedBuyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getLots().then((res) => {
      setLots(res.lots);
      if (res.lots.length > 0) {
        setSelectedLotId(res.lots[0]._id);
      }
    }).catch(() => {});
  }, []);

  const loadMatches = async () => {
    if (!selectedLotId) return;
    setLoading(true);
    try {
      const res = await api.getMatchedBuyers(selectedLotId);
      setMatchedBuyers(res.matchedBuyers);
    } catch (err) {
      console.warn('Error fetching buyer matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, [selectedLotId]);

  const activeLot = lots.find((l) => l._id === selectedLotId) || lots[0];

  const handleSendDirectOffer = async (buyer: any) => {
    try {
      await api.createOffer({
        lotId: activeLot?.lotId || 'LOT-2026-TOM-001',
        buyerId: buyer.buyerId || 'BUYER-001',
        buyerCompany: buyer.buyerCompany,
        offeredPrice: buyer.targetPricePerUnit,
        quantity: activeLot?.quantity || 50,
        unit: activeLot?.unit || 'quintal',
        crop: activeLot?.crop || 'Tomato',
        paymentTerms: 'SIMULATED_ESCROW_100_PERCENT',
        transportResponsibility: 'BUYER_ARRANGED',
        deliveryDate: '2026-09-17'
      });
      alert(`Direct Offer sent to ${buyer.buyerCompany} with 100% simulated escrow guarantee!`);
    } catch (err: any) {
      alert(err.message || 'Failed to submit offer');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Compatibility Matchmaker</span>
          </span>
          <span className="text-xs text-stone-500">Multi-Parametric Buyer Scoring</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          Smart Buyer Matchmaking
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Instead of waiting for random inquiries, our algorithm evaluates volume capacity, quality grade tolerance, transit distance, and payment promptness to connect your lot with top-paying buyers.
        </p>
      </div>

      {/* Lot Selector Banner */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            Select Your Harvest Lot to Match:
          </label>
          <select
            value={selectedLotId}
            onChange={(e) => setSelectedLotId(e.target.value)}
            className="text-sm font-bold px-3 py-2 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 focus:ring-2 focus:ring-emerald-600"
          >
            {lots.map((l) => (
              <option key={l._id} value={l._id}>
                {l.lotId} — {l.quantity} {l.unit} {l.crop} ({l.qualityGrade})
              </option>
            ))}
          </select>
        </div>

        {activeLot && (
          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-stone-500 block">Expected Farmgate Price:</span>
              <span className="text-base font-black text-emerald-800">
                ₹{activeLot.expectedPrice.toLocaleString('en-IN')}/{activeLot.unit}
              </span>
            </div>
            <div className="text-right border-l border-stone-200 pl-4">
              <span className="text-stone-500 block">Location:</span>
              <span className="font-bold text-stone-900">{activeLot.location}</span>
            </div>
          </div>
        )}
      </div>

      {/* Matched Buyers List */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-stone-900">
          Ranked Compatible Buyers ({matchedBuyers.length} Evaluated)
        </h3>

        {loading ? (
          <div className="p-12 text-center text-xs text-stone-500">
            Running compatibility scoring across registered institutional buyers...
          </div>
        ) : matchedBuyers.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500 bg-white rounded-2xl border border-dashed border-stone-200">
            No buyers found for this crop and grade combination. Try selecting a different lot.
          </div>
        ) : (
          <div className="space-y-4">
            {matchedBuyers.map((buyer, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-white border transition-all shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                  idx === 0
                    ? 'border-emerald-500 ring-2 ring-emerald-400/40 bg-emerald-50/20'
                    : 'border-stone-200 hover:border-blue-400'
                }`}
              >
                {/* Left info */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading font-black text-xl text-stone-900">
                      {buyer.buyerCompany}
                    </span>
                    {buyer.isVerified && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-900 flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3 text-blue-700" />
                        <span>VERIFIED BUYER</span>
                      </span>
                    )}
                    {idx === 0 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-400 text-stone-950 uppercase">
                        TOP COMPATIBILITY MATCH
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600">
                    {buyer.businessType} • Destination Plant: <strong>{buyer.destinationHub}</strong>
                  </p>

                  {/* Matching Factors Pill Bar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <div className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium">
                      Grade Required: <strong className="text-stone-900">{buyer.qualityGradeRequired}</strong>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium">
                      Volume: <strong className="text-stone-900">{buyer.targetQuantity} {buyer.unit}</strong>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                      Reliability: <strong className="text-emerald-950">{buyer.reliabilityRating}%</strong>
                    </div>
                    <div className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-medium">
                      Transport: <strong className="text-blue-950">{buyer.transportProvided ? 'Buyer Truck' : 'Farmer Delivery'}</strong>
                    </div>
                  </div>
                </div>

                {/* Right score and action */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 w-full lg:w-auto shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-stone-100">
                  <div className="text-left lg:text-right">
                    <div className="inline-flex items-center gap-1 text-sm font-black text-emerald-800">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>{buyer.matchScore || 95}% Match Score</span>
                    </div>
                    <div className="text-lg font-black text-stone-900 mt-0.5">
                      ₹{buyer.targetPricePerUnit.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-stone-500"> / {buyer.unit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendDirectOffer(buyer)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Send Digital Offer</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
