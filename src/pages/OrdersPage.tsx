import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IOrder } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  FileText,
  Building2,
  Scale
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { user, setIsDemoModalOpen } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState<IOrder | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders();
      setOrders(res.orders);
    } catch (err) {
      console.warn('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleConfirmInspection = async (orderId: string) => {
    try {
      await api.confirmInspection(orderId, {
        actualWeight: 50.2,
        verifiedGrade: 'Grade A',
        inspectionRemarks: 'All 50 crates inspected. Grade A confirmed. Zero spoilage.'
      });
      alert('Inspection confirmed! Escrow funds marked ready for deterministic release.');
      await loadOrders();
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  const handleReleaseEscrow = async (orderId: string) => {
    try {
      await api.releaseEscrow(orderId);
      alert('Simulated Settlement completed! ₹1,36,400 credited to Ramesh Naidu (SBI A/C ending ...4092).');
      await loadOrders();
    } catch (err: any) {
      alert(err.message || 'Action failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>SIMULATED ESCROW — Prototype</span>
            </span>
            <span className="text-xs text-stone-500">Conditional Settlement Protocol</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900 mt-1">
            Orders & Escrow Settlements
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Buyer funds are locked in <strong>SIMULATED ESCROW — Prototype</strong> when the contract is signed. Funds are deterministically released via <strong>Simulated Settlement</strong> upon delivery verification and quality inspection.
          </p>
        </div>

        <button
          onClick={() => setIsDemoModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all self-start sm:self-auto"
        >
          <span>⚡ Step Through 20-Step Demo</span>
        </button>
      </div>

      {/* Escrow Trust Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs">
        <div className="space-y-1">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
            SIMULATED ESCROW — Prototype (Locked)
          </span>
          <div className="font-heading font-black text-2xl text-amber-600">
            ₹1,40,000
          </div>
          <p className="text-[11px] text-stone-500">Secured pending delivery verification</p>
        </div>

        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-stone-100 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
            Simulated Settlement to Farmers
          </span>
          <div className="font-heading font-black text-2xl text-emerald-800">
            ₹4,25,000
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">100% Simulated Direct Settlement</p>
        </div>

        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-stone-100 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-xs text-stone-500 font-bold uppercase tracking-wider">
            Payment Default Rate
          </span>
          <div className="font-heading font-black text-2xl text-blue-900">
            0.0%
          </div>
          <p className="text-[11px] text-stone-500">Full buyer funds locked before truck dispatch</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        <h3 className="font-bold text-base text-stone-900">Active Contracts & Orders ({orders.length})</h3>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-400 transition-all space-y-4 p-6"
          >
            {/* Header row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-500">
                    {order.orderNumber || order.orderId}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 uppercase">
                    SIMULATED ESCROW: {order.escrowStatus}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-stone-900 mt-1">
                  {order.quantity} {order.unit} {order.crop} ({order.qualityGrade || 'Grade A'})
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-500 block">Total Contract Value:</span>
                <span className="font-heading font-black text-2xl text-stone-900">
                  ₹{(order.totalAmount || order.totalCropValue || 0).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold block">
                  Net to Farmer: ₹{(order.netFarmerPayout || order.netRealization || 136400).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Stepper Visualization */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                ✓ 1. Agreement
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                ✓ 2. SIMULATED ESCROW — Prototype
              </div>
              <div className={`p-2.5 rounded-xl border font-bold ${
                order.status === 'DELIVERED' || order.status === 'COMPLETED'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                {order.status === 'DELIVERED' || order.status === 'COMPLETED' ? '✓' : '●'} 3. Logistics In Transit
              </div>
              <div className={`p-2.5 rounded-xl border font-bold ${
                order.status === 'COMPLETED'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : order.status === 'DELIVERED'
                  ? 'bg-blue-50 border-blue-200 text-blue-900'
                  : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}>
                {order.status === 'COMPLETED' ? '✓' : '●'} 4. Inspection
              </div>
              <div className={`p-2.5 rounded-xl border font-bold ${
                order.status === 'COMPLETED'
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                  : 'bg-stone-50 border-stone-200 text-stone-500'
              }`}>
                {order.status === 'COMPLETED' ? '✓ Simulated Settlement' : '5. Simulated Settlement'}
              </div>
            </div>

            {/* Logistics & Parties info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block mb-0.5">Farmer / Producer:</span>
                <strong className="text-stone-900 block">{order.farmerName}</strong>
                <span>Pickup: Chandragiri, Chittoor</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Verified Buyer:</span>
                <strong className="text-stone-900 block">{order.buyerCompany}</strong>
                <span>Delivery: Sri City Mega Food Park</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Assigned 3PL Logistics:</span>
                <strong className="text-stone-900 block">
                  {order.logisticsProvider || 'Platform 3PL (Gati Agro Logistics)'} ({order.vehicleNumber || 'AP 04 TT 8821'})
                </strong>
                <span>Driver: {order.driverPhone || '+91 98480 12345'}</span>
              </div>
            </div>

            {/* Actions for Escrow settlement */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-stone-500">
                Current State: <strong className="text-stone-900">{order.status}</strong>
              </div>

              <div className="flex items-center gap-2">
                {order.status !== 'COMPLETED' && (
                  <>
                    <button
                      onClick={() => handleConfirmInspection(order._id)}
                      className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors"
                    >
                      Confirm Weighbridge & Quality
                    </button>
                    <button
                      onClick={() => handleReleaseEscrow(order._id)}
                      className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors"
                    >
                      Trigger Simulated Settlement Release
                    </button>
                  </>
                )}
                {order.status === 'COMPLETED' && (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Simulated Settlement completed (Farmer Bank Account Credited)</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
