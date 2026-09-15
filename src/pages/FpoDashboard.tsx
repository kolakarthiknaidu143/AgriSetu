import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ICropLot, IOffer, IOrder } from '../types';
import {
  Users,
  Layers,
  TrendingUp,
  PlusCircle,
  ShieldCheck,
  Building2,
  DollarSign,
  ArrowRight,
  Warehouse,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const FpoDashboard: React.FC = () => {
  const { user, setIsDemoModalOpen } = useAuth();
  const [lots, setLots] = useState<ICropLot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLots().then((res) => {
      setLots(res.lots);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              FPO Collective Aggregator Hub
            </span>
            <span className="text-xs text-stone-300">
              Rayalaseema Kisan Producer Co. • 45 Member Farmers
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Namaste, {user?.name || 'Venkatesh Rao (FPO Manager)'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
            Aggregated harvest pooling gives smallholder farmers +14% collective bargaining power with institutional corporate processors.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all"
          >
            <span>⚡ 20-Step Live Walkthrough</span>
          </button>
          <Link
            to="/lots/create"
            className="px-4 py-2.5 rounded-xl bg-white text-stone-900 text-xs sm:text-sm font-bold shadow-md hover:bg-stone-100 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-emerald-700" />
            <span>+ Pool Aggregated Lot</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold">Registered Member Farmers</span>
          <div className="font-heading font-black text-2xl text-stone-900">45 Active</div>
          <p className="text-[11px] text-emerald-700 font-semibold">Chittoor & Annamayya clusters</p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs text-amber-900 font-bold">Total Aggregated Volume</span>
          <div className="font-heading font-black text-2xl text-amber-950">320 Quintals</div>
          <p className="text-[11px] text-amber-800">Tomato, Chilli & Maize pooled</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs space-y-1">
          <span className="text-xs text-emerald-800 font-bold">Volume Premium Achieved</span>
          <div className="font-heading font-black text-2xl text-emerald-950">+₹220/qtl</div>
          <p className="text-[11px] text-emerald-700 font-semibold">Higher than individual farmgate rates</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold">Escrow Settlements Distributed</span>
          <div className="font-heading font-black text-2xl text-stone-900">₹8,96,000</div>
          <p className="text-[11px] text-stone-500">Credited to member farmer bank accounts</p>
        </div>
      </div>

      {/* Aggregated Lots & Member Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-900">Pooled FPO Harvest Lots</h3>
            <Link to="/lots" className="text-xs font-bold text-amber-800 hover:underline">
              View all →
            </Link>
          </div>

          <div className="space-y-3">
            {lots.slice(0, 3).map((lot) => (
              <div
                key={lot._id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-stone-500 font-bold">{lot.lotId}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        {lot.contributingFarmersCount || 15} Smallholders
                      </span>
                    </div>
                    <div className="font-bold text-sm text-stone-900 mt-1">
                      {lot.quantity} {lot.unit} of {lot.crop} ({lot.qualityGrade})
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-black text-base text-emerald-800">
                      ₹{lot.expectedPrice.toLocaleString('en-IN')}/{lot.unit}
                    </span>
                    <span className="text-[10px] text-stone-500 block">Target Realization</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200">
                  <span className="text-stone-500">Location: {lot.location}</span>
                  <Link to="/buyer-matching" className="font-bold text-emerald-700 hover:underline">
                    Match Institutional Buyers →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Member Payout Automation */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-base text-stone-900">Direct Farmer Payout Ledger</h3>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            When institutional buyers release escrow funds to the FPO virtual account, AgriSetu calculates individual farmer contributions and triggers instant split settlements via UPI / IMPS.
          </p>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <div className="flex items-center justify-between font-semibold text-stone-800">
              <span>Lot LOT-2026-TOM-001 (50q):</span>
              <span>₹1,40,000</span>
            </div>
            <div className="flex items-center justify-between text-stone-500">
              <span>FPO Aggregation Fee (2.5%):</span>
              <span>-₹3,500</span>
            </div>
            <div className="flex items-center justify-between font-bold text-emerald-800 pt-1 border-t border-stone-200">
              <span>Net Distributed to 15 Farmers:</span>
              <span>₹1,36,500</span>
            </div>
          </div>

          <button
            onClick={() => alert('Automated payment distribution report generated for Rayalaseema FPO audit.')}
            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors"
          >
            Download Member Audit Statement (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
