import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IBuyerRequirement } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Search,
  Filter,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  Clock
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { user } = useAuth();
  const [requirements, setRequirements] = useState<IBuyerRequirement[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  // Offer modal state
  const [activeReq, setActiveReq] = useState<IBuyerRequirement | null>(null);
  const [offerPrice, setOfferPrice] = useState<number>(2800);
  const [offerQty, setOfferQty] = useState<number>(50);
  const [offerMsg, setOfferMsg] = useState<string>('Grade A Shivam Hybrid harvested in Chandragiri. Ready for immediate pickup.');
  const [submittingOffer, setSubmittingOffer] = useState(false);

  const loadRequirements = async () => {
    setLoading(true);
    try {
      const res = await api.getBuyerRequirements({ crop: selectedCrop });
      setRequirements(res.requirements);
    } catch (err) {
      console.warn('Error loading buyer requirements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequirements();
  }, [selectedCrop]);

  const handleSendOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReq) return;
    setSubmittingOffer(true);
    try {
      await api.createOffer({
        lotId: 'LOT-2026-TOM-001',
        buyerId: activeReq.buyerId,
        buyerCompany: activeReq.buyerCompany,
        offeredPrice: Number(offerPrice),
        quantity: Number(offerQty),
        unit: activeReq.unit,
        crop: activeReq.crop,
        paymentTerms: activeReq.paymentTerms,
        transportResponsibility: activeReq.transportProvided ? 'BUYER_ARRANGED' : 'FARMER_DELIVERY',
        deliveryDate: '2026-09-17'
      });
      setActiveReq(null);
      alert('Digital Offer submitted to buyer with simulated escrow backing!');
    } catch (err: any) {
      alert(err.message || 'Failed to submit offer');
    } finally {
      setSubmittingOffer(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              Verified Corporate Demand
            </span>
            <span className="text-xs text-stone-500">Zero Middleman Opacity</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900 mt-1">
            Institutional Buyer Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Direct procurement contracts with verified food processors, supermarket chains, and exporters. All contracts backed by simulated escrow protection.
          </p>
        </div>

        <button
          onClick={() => setSelectedCrop('Tomato')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span>Show Highest Paying Buyers</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-stone-700">Filter Crop:</span>
          {['All', 'Tomato', 'Red Chilli', 'Paddy', 'Cotton', 'Maize'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCrop(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCrop === c
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Showing <strong className="text-stone-800">{requirements.length}</strong> active corporate tenders
        </div>
      </div>

      {/* Requirements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requirements.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Top Badge & Buyer Name */}
            <div className="p-5 border-b border-stone-100 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-blue-700" />
                    <h3 className="font-bold text-base text-stone-900">{req.buyerCompany}</h3>
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">{req.businessType}</div>
                </div>

                {req.isVerified && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-100 text-blue-900 flex items-center gap-0.5 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>VERIFIED GST</span>
                  </span>
                )}
              </div>

              {/* Requirement Summary */}
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-blue-800 font-medium block">Seeking Procurement:</span>
                  <span className="text-sm font-bold text-blue-950">
                    {req.targetQuantity} {req.unit} of {req.crop}
                  </span>
                  <span className="text-[10px] text-blue-700 block">Grade: {req.qualityGradeRequired}</span>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-stone-500 block">Offered Budget:</span>
                  <span className="text-lg font-black text-emerald-800">
                    ₹{req.targetPricePerUnit.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-stone-500 block">/{req.unit}</span>
                </div>
              </div>
            </div>

            {/* Specifications & Reliability */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-xs text-stone-600">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Payment Reliability:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {req.reliabilityRating}% On-Time
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Logistics Transport:</span>
                  <span className="font-semibold text-stone-800">
                    {req.transportProvided ? '✅ Buyer Arranges Truck' : 'Farmer Delivery to Hub'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Escrow Protection:</span>
                  <span className="font-bold text-blue-900">100% Locked Prior to Dispatch</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Destination Plant:</span>
                  <span className="text-stone-800 font-medium">{req.destinationHub}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => {
                    setActiveReq(req);
                    setOfferPrice(req.targetPricePerUnit);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Submit Digital Offer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Submission Modal */}
      {activeReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase">Direct Procurement Bid</span>
                <h3 className="font-bold text-base text-stone-900">Offer to {activeReq.buyerCompany}</h3>
              </div>
              <button
                onClick={() => setActiveReq(null)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Your Quantity ({activeReq.unit})
                  </label>
                  <input
                    type="number"
                    required
                    value={offerQty}
                    onChange={(e) => setOfferQty(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Price per {activeReq.unit} (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 focus:ring-2 focus:ring-blue-600 text-emerald-800"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                <span>Total Contract Value:</span>
                <span className="font-black text-sm text-stone-900">
                  ₹{(offerPrice * offerQty).toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Message / Quality Confirmation
                </label>
                <textarea
                  rows={2}
                  value={offerMsg}
                  onChange={(e) => setOfferMsg(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  Once the buyer approves, funds will be locked in simulated escrow prior to vehicle dispatch.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setActiveReq(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingOffer}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
                >
                  {submittingOffer ? 'Submitting...' : 'Submit Digital Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
