import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export const DisputesPage: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('ORD-2026-09-001');
  const [issueType, setIssueType] = useState('Quality Grade Discrepancy');
  const [description, setDescription] = useState('Buyer claims lot contains 8% defects while AI inspection certified 2.5%.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-purple-700" />
            <span>Statutory APMC Arbitration Mechanism</span>
          </span>
          <span className="text-xs text-stone-500">Fast-Track Grievance Redressal</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          APMC Dispute Resolution & Escrow Mediation
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          If physical quality or weighbridge measurements differ from the digital contract, our formal APMC mediation panel reviews third-party assessor logs and releases escrow funds fairly.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        {submitted ? (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-emerald-950">Grievance Ticket Registered</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Ticket <strong>DISP-2026-AP-099</strong> has been assigned to the Chittoor APMC Arbitration Officer. Escrow funds will remain safely locked until joint weighbridge verification is complete.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold"
            >
              File Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Order / Contract Number *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Grievance Category *
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white"
              >
                <option value="Quality Grade Discrepancy">Quality Grade Discrepancy (Color/Blemishes)</option>
                <option value="Weighbridge Shortage">Weighbridge Shortage / Net Weight Discrepancy</option>
                <option value="Transit Delay">Severe Transit Delay / Cold Chain Temperature Breach</option>
                <option value="Delayed Inspection">Buyer Refusal to Complete Unloading / Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Detailed Grievance Description & Evidence *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <p>
                Filing an APMC dispute automatically freezes the associated simulated escrow payment until both parties review the weighbridge slip and sample photos.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Submit to APMC Arbitration Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
