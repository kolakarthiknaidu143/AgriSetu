import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Scale,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileText,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [buyers, setBuyers] = useState<any[]>([
    {
      companyName: 'ABC Foods Ltd',
      businessType: 'Food Processor',
      gstNumber: '37AAACB1029K1Z4',
      status: 'VERIFIED',
      turnover: '₹45 Cr',
      licenseNo: 'APMC/CHTR/2024/098'
    },
    {
      companyName: 'Rayalaseema Agro Exports',
      businessType: 'Agri Exporter',
      gstNumber: '37BBBCD9876E1Z2',
      status: 'PENDING_REVIEW',
      turnover: '₹18 Cr',
      licenseNo: 'APMC/TIRU/2025/112'
    }
  ]);

  const [disputes, setDisputes] = useState<any[]>([
    {
      disputeId: 'DISP-2026-004',
      orderNumber: 'ORD-2026-08-992',
      raisedBy: 'Krishna Farmers FPO',
      counterParty: 'Guntur Spice Traders',
      issue: 'Moisture difference claimed at weighbridge (11.2% vs 10.0%)',
      amountInEscrow: '₹84,000',
      status: 'UNDER_ARBITRATION',
      filingDate: '2026-09-12'
    }
  ]);

  const handleVerifyBuyer = (companyName: string) => {
    setBuyers(
      buyers.map((b) =>
        b.companyName === companyName ? { ...b, status: 'VERIFIED' } : b
      )
    );
    alert(`${companyName} verified with APMC trading credentials!`);
  };

  const handleResolveDispute = (disputeId: string) => {
    setDisputes(
      disputes.map((d) =>
        d.disputeId === disputeId ? { ...d, status: 'RESOLVED_SETTLED' } : d
      )
    );
    alert(`Dispute ${disputeId} resolved! Settlement order issued to escrow agent.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-stone-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-purple-300" />
              <span>APMC Mandi Administrator</span>
            </span>
            <span className="text-xs text-stone-300">Agricultural Marketing Board, Andhra Pradesh</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Market Yard Regulatory Oversight
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/80 max-w-xl">
            Real-time APMC price audit, buyer licensing verification, dispute arbitration, and simulated escrow compliance.
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-right backdrop-blur">
          <span className="text-xs text-purple-200 block">Monthly Digital Volume:</span>
          <span className="text-2xl font-black text-amber-300">₹4.2 Crore</span>
          <span className="text-[10px] text-purple-200 block mt-0.5">100% electronic clearing</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold">Active Mandis Reporting</span>
          <div className="font-heading font-black text-2xl text-stone-900">45 Hubs</div>
          <p className="text-[11px] text-emerald-700 font-semibold">Daily e-NAM sync active</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold">Verified Corporate Buyers</span>
          <div className="font-heading font-black text-2xl text-purple-950">128 Verified</div>
          <p className="text-[11px] text-stone-500">GST & APMC licensed</p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs space-y-1">
          <span className="text-xs text-amber-900 font-bold">Pending Buyer Verifications</span>
          <div className="font-heading font-black text-2xl text-amber-950">3 In Review</div>
          <p className="text-[11px] text-amber-800">Physical factory audit pending</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs space-y-1">
          <span className="text-xs text-emerald-800 font-bold">Grievance Resolution Rate</span>
          <div className="font-heading font-black text-2xl text-emerald-950">99.2%</div>
          <p className="text-[11px] text-emerald-700 font-semibold">&lt; 48 hours arbitration</p>
        </div>
      </div>

      {/* Buyer Verification Queue & Dispute Arbitration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Buyer Verification Queue */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-stone-900">
            Institutional Buyer Verification Queue
          </h3>

          <div className="space-y-3">
            {buyers.map((b, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900">{b.companyName}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    GSTIN: {b.gstNumber} • Type: {b.businessType} • License: {b.licenseNo}
                  </div>
                </div>

                {b.status !== 'VERIFIED' ? (
                  <button
                    onClick={() => handleVerifyBuyer(b.companyName)}
                    className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors shrink-0"
                  >
                    Approve Buyer Credentials
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active License</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dispute Resolution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-700" />
            <h3 className="font-bold text-base text-stone-900">APMC Grievance Arbitration</h3>
          </div>

          <div className="space-y-3">
            {disputes.map((d) => (
              <div
                key={d.disputeId}
                className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-2.5 text-xs text-stone-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-purple-950">{d.disputeId}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                    {d.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div>Claimant: <strong>{d.raisedBy}</strong></div>
                  <div>Counter-party: <strong>{d.counterParty}</strong></div>
                  <div>Issue: <strong>{d.issue}</strong></div>
                  <div>Escrow Under Hold: <strong className="text-stone-900">{d.amountInEscrow}</strong></div>
                </div>

                {d.status !== 'RESOLVED_SETTLED' && (
                  <button
                    onClick={() => handleResolveDispute(d.disputeId)}
                    className="w-full py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors mt-2"
                  >
                    Execute APMC Arbitration Settlement
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
