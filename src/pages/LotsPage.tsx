import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { ICropLot } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  PlusCircle,
  Search,
  Filter,
  Layers,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Eye,
  Calendar,
  MapPin
} from 'lucide-react';

export const LotsPage: React.FC = () => {
  const { user } = useAuth();
  const [lots, setLots] = useState<ICropLot[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [activeModalLot, setActiveModalLot] = useState<ICropLot | null>(null);

  const loadLots = async () => {
    setLoading(true);
    try {
      const res = await api.getLots({
        crop: selectedCrop,
        status: selectedStatus
      });
      setLots(res.lots);
    } catch (err) {
      console.warn('Error loading lots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLots();
  }, [selectedCrop, selectedStatus]);

  const statusColors: Record<string, string> = {
    'Draft': 'bg-stone-100 text-stone-700',
    'Listed': 'bg-emerald-100 text-emerald-800',
    'Offer Received': 'bg-amber-100 text-amber-900',
    'Offer Accepted': 'bg-blue-100 text-blue-900',
    'In Transit': 'bg-purple-100 text-purple-900',
    'Delivered': 'bg-indigo-100 text-indigo-900',
    'Completed': 'bg-emerald-200 text-emerald-950',
    'Disputed': 'bg-rose-100 text-rose-800'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Traceable Agricultural Batches
            </span>
            <span className="text-xs text-stone-500">Verified Quality & Weight Specifications</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900 mt-1">
            Crop Lots & Produce Registry
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Track all active, negotiated, and completed harvest lots across farmers and FPOs.
          </p>
        </div>

        <Link
          to="/lots/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-md transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create New Crop Lot</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-stone-700">Filter Crop:</span>
          {['All', 'Tomato', 'Chilli', 'Paddy', 'Cotton', 'Maize'].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCrop(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCrop === c
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600"
          >
            <option value="All">All Statuses</option>
            <option value="Listed">Listed</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Offer Accepted">Offer Accepted</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Lots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lots.map((lot) => (
          <div
            key={lot._id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Image Preview */}
            <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
              <img
                src={lot.images[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'}
                alt={lot.crop}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 text-white font-mono backdrop-blur-xs">
                  {lot.lotId}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                  {lot.qualityGrade}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs ${statusColors[lot.status] || 'bg-stone-100 text-stone-700'}`}>
                  {lot.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-lg text-stone-900">
                    {lot.quantity} {lot.unit} of {lot.crop}
                  </h3>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-800">
                      ₹{lot.expectedPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-400">/{lot.unit}</span>
                  </div>
                </div>
                <p className="text-xs text-stone-500 mt-0.5 font-medium">
                  Variety: {lot.variety}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{lot.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Harvested: {lot.harvestDate}</span>
                  </div>
                  {lot.isAggregated && (
                    <div className="text-amber-800 font-semibold text-[11px] pt-1">
                      ⭐ FPO Aggregated from {lot.contributingFarmersCount || 15} farmers
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalLot(lot)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-emerald-800"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quality Specs</span>
                </button>

                <Link
                  to="/buyer-matching"
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                >
                  <span>Find Buyers</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Specs Modal */}
      {activeModalLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="font-mono text-xs text-stone-500 font-bold">{activeModalLot.lotId}</span>
                <h3 className="font-bold text-lg text-stone-900">Quality Inspection Certificate</h3>
              </div>
              <button
                onClick={() => setActiveModalLot(null)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block">Assigned Grade</span>
                <span className="text-sm font-bold text-emerald-800">{activeModalLot.qualityGrade}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block">Visible Defect %</span>
                <span className="text-sm font-bold text-stone-900">{activeModalLot.qualityReport?.defectPercentage || 2.0}%</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block">Caliber / Size</span>
                <span className="text-sm font-bold text-stone-900">{activeModalLot.qualityReport?.size || '55-65mm'}</span>
              </div>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-500 block">Packaging Method</span>
                <span className="text-sm font-bold text-stone-900">{activeModalLot.qualityReport?.packaging || 'Plastic Crates'}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
              <strong className="block font-bold text-emerald-900 mb-1">Quality Assessor Remarks:</strong>
              <p>{activeModalLot.qualityReport?.qualityNotes || 'Harvested at optimum commercial maturity. Healthy fruit skin, zero pest boring detected.'}</p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setActiveModalLot(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
