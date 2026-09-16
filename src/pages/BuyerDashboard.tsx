import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { IBuyerRequirement, IOrder, IOffer, ICropLot } from '../types';
import {
  Building2,
  ShieldCheck,
  PlusCircle,
  Truck,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Clock,
  Warehouse,
  Scale,
  MessageSquare,
  Layers,
  MapPin,
  Sparkles
} from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const { user, setIsDemoModalOpen } = useAuth();
  const [requirements, setRequirements] = useState<IBuyerRequirement[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [availableLots, setAvailableLots] = useState<ICropLot[]>([]);
  const [loading, setLoading] = useState(true);

  // New requirement modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [crop, setCrop] = useState('Tomato');
  const [targetQuantity, setTargetQuantity] = useState<number>(1000);
  const [targetPrice, setTargetPrice] = useState<number>(2800);
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [destinationHub, setDestinationHub] = useState('Sri City Mega Food Park, AP');
  const [transportProvided, setTransportProvided] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [reqsRes, ordersRes, offersRes, lotsRes] = await Promise.all([
        api.getBuyerRequirements({}),
        api.getOrders(),
        api.getOffers().catch(() => ({ offers: [] })),
        api.getLots({ status: 'Listed' }).catch(() => ({ lots: [] }))
      ]);

      // Filter requirements to buyer-relevant data
      const allReqs = reqsRes.requirements || [];
      const buyerReqs = allReqs.filter(
        (r: any) =>
          r.buyerId === user?._id ||
          r.buyerCompany === user?.name ||
          (user?.email?.includes('buyer') && (r.buyerCompany?.includes('ABC') || r.buyerName?.includes('ABC')))
      );
      setRequirements(buyerReqs.length > 0 ? buyerReqs : allReqs.slice(0, 3));

      setOrders(ordersRes.orders || []);
      setOffers(offersRes.offers || []);
      setAvailableLots((lotsRes.lots || []).slice(0, 3));
    } catch (err) {
      console.warn('Buyer dashboard data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createBuyerRequirement({
        buyerCompany: user?.name || 'ABC Foods Ltd',
        crop,
        targetQuantity: Number(targetQuantity),
        unit: 'quintal',
        targetPricePerUnit: Number(targetPrice),
        qualityGradeRequired: qualityGrade,
        destinationHub,
        transportProvided,
        paymentTerms: 'SIMULATED_ESCROW_100_PERCENT'
      });
      setIsModalOpen(false);
      alert('Procurement requirement published to marketplace!');
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Failed to create requirement');
    }
  };

  // Dynamic KPI calculations
  const totalDemandVolume = requirements.reduce(
    (sum, r: any) => sum + (Number(r.targetQuantity || r.quantity) || 0),
    0
  );

  const activeInboundOrders = orders.filter(
    (o) => o.status === 'IN TRANSIT' || o.status === 'ACCEPTED' || o.status === 'CONFIRMED'
  );

  const lockedEscrowAmount = activeInboundOrders.reduce(
    (sum, o) => sum + (Number(o.totalCropValue || o.totalAmount) || 140000),
    0
  );

  const pendingOffersCount = offers.filter((o) => o.status === 'PENDING' || o.status === 'COUNTERED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-stone-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>Verified Institutional Buyer</span>
            </span>
            <span className="text-xs text-stone-300">GSTIN: 37AAACB1029K1Z4 • Sri City</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            {user?.name || 'ABC Foods Ltd (Priya Sharma)'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80 max-w-xl">
            Contract farming and direct farmgate procurement portal. Real-time truck dispatch and weighbridge settlement.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all"
          >
            <span>⚡ 20-Step Live Tour</span>
          </button>
          <Link
            to="/buyer-marketplace"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>🛒 Explore Marketplace Lots</span>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white text-blue-950 text-xs sm:text-sm font-bold shadow-md hover:bg-stone-100 transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-blue-700" />
            <span>+ Post Demand</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold">Active Demand Volume</span>
          <div className="font-heading font-black text-2xl text-stone-900">
            {totalDemandVolume > 0 ? `${totalDemandVolume.toLocaleString('en-IN')} Quintals` : '1,500 Quintals'}
          </div>
          <p className="text-[11px] text-blue-700 font-semibold">Processing batch requirements</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs space-y-1">
          <span className="text-xs text-emerald-900 font-bold">SIMULATED ESCROW — Locked</span>
          <div className="font-heading font-black text-2xl text-emerald-950">
            ₹{lockedEscrowAmount > 0 ? lockedEscrowAmount.toLocaleString('en-IN') : '1,40,000'}
          </div>
          <p className="text-[11px] text-emerald-800">100% conditional hold for Lot 001</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
          <span className="text-xs text-stone-500 font-semibold">Inbound Trucks</span>
          <div className="font-heading font-black text-2xl text-stone-900">
            {activeInboundOrders.length > 0 ? `${activeInboundOrders.length} In Transit` : '1 In Transit'}
          </div>
          <p className="text-[11px] text-stone-500">AP-03-TC-8910 arriving today</p>
        </div>

        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs space-y-1">
          <span className="text-xs text-blue-900 font-bold">Active Purchase Offers</span>
          <div className="font-heading font-black text-2xl text-blue-950">
            {offers.length > 0 ? `${offers.length} Active` : '1 Active'}
          </div>
          <p className="text-[11px] text-blue-800">
            {offers.some((o) => o.status === 'COUNTERED') ? 'Countered — action required' : 'Farmgate negotiations'}
          </p>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-stone-700">Quick Navigation:</span>
          <Link
            to="/buyer-marketplace"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-700 text-white hover:bg-blue-800 transition-colors flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Buyer Marketplace (Browse Produce)</span>
          </Link>
          <Link
            to="/buyer-marketplace?tab=offers"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            <span>My Offers & Negotiations ({offers.length})</span>
          </Link>
          <Link
            to="/orders"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors flex items-center gap-1"
          >
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>Orders & Weighbridge Settlement</span>
          </Link>
        </div>

        <div className="text-xs text-stone-500 font-medium">
          Logged in as: <strong className="text-stone-800">{user?.name || 'ABC Foods Ltd'}</strong>
        </div>
      </div>

      {/* My Active Offers & Negotiations Highlight Card */}
      {offers.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-base text-stone-900">My Recent Purchase Offers & Negotiations</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900">
                {offers.length} Active
              </span>
            </div>

            <Link
              to="/buyer-marketplace?tab=offers"
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>View All Negotiations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.slice(0, 2).map((offer) => (
              <div
                key={offer._id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-extrabold text-stone-800">{offer.offerId}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        offer.status === 'COUNTERED'
                          ? 'bg-amber-200 text-amber-950 font-black'
                          : offer.status === 'ACCEPTED'
                          ? 'bg-emerald-200 text-emerald-950'
                          : 'bg-stone-200 text-stone-800'
                      }`}
                    >
                      {offer.status === 'COUNTERED' ? 'FARMER COUNTERED' : offer.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-stone-900 mt-1">
                    {offer.quantity} {offer.unit} of {offer.crop} ({offer.lotCode})
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Farmer: <strong>{offer.farmerName}</strong> • Quote: ₹{offer.currentPrice}/{offer.unit}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-500">
                    Terms: <strong>{offer.transportResponsibility || 'Buyer Arranged'}</strong>
                  </span>
                  <Link
                    to="/buyer-marketplace?tab=offers"
                    className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                  >
                    <span>Inspect & Respond →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Demands & Inbound Shipments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Procurement Requirements */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-900">My Active Procurement Demands</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              + Add Requirement
            </button>
          </div>

          <div className="space-y-3">
            {requirements.map((req: any) => (
              <div
                key={req._id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">
                      {req.targetQuantity || req.quantity} {req.unit || 'quintal'} of {req.crop}
                    </h4>
                    <p className="text-xs text-stone-500">
                      Grade: {req.qualityGradeRequired || req.requiredGrade || 'Grade A'} • Destination:{' '}
                      {req.destinationHub || req.deliveryLocation || 'Sri City Mega Food Park, AP'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-base text-emerald-800">
                      ₹{Number(req.targetPricePerUnit || req.minPrice || 2800).toLocaleString('en-IN')}/{req.unit || 'qtl'}
                    </span>
                    <span className="text-[10px] text-stone-500 block">Offered Budget</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200">
                  <span className="text-stone-600">
                    Logistics: <strong>{req.transportProvided ? 'Buyer Truck Arranged' : 'Farmer Delivery'}</strong>
                  </span>
                  <Link to="/buyer-marketplace" className="font-bold text-blue-700 hover:underline">
                    Inspect Farmer Lots in Marketplace →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Inbound In-Transit Shipments */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-700" />
            <h3 className="font-bold text-base text-stone-900">Inbound Shipments</h3>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-900">ORD-2026-09-001</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-200 text-blue-900">
                IN TRANSIT
              </span>
            </div>

            <div className="text-xs text-stone-700 space-y-1">
              <div>Produce: <strong>50 quintals Tomato (Grade A)</strong></div>
              <div>Farmer: <strong>Ramesh Naidu (Chandragiri, Chittoor)</strong></div>
              <div>Vehicle: <strong>AP-03-TC-8910 (Venkata Logistics)</strong></div>
              <div>Driver: <strong>9440123456 (Suresh)</strong></div>
            </div>

            <Link
              to="/orders"
              className="block text-center py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors"
            >
              Verify Weighbridge & Trigger Simulated Settlement →
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Lots in Marketplace */}
      {availableLots.length > 0 && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Featured Crop Lots Ready for Procurement</span>
              </h3>
              <p className="text-xs text-stone-500">
                Directly from verified producers with certified quality inspection reports.
              </p>
            </div>

            <Link
              to="/buyer-marketplace"
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
            >
              <span>View All Produce in Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {availableLots.map((lot) => (
              <div
                key={lot._id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-800">{lot.lotId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {lot.qualityGrade}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 mt-1">
                    {lot.crop} ({lot.variety})
                  </h4>
                  <p className="text-xs text-stone-500">
                    {lot.quantity} {lot.unit} • {lot.district}, {lot.state}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span className="font-black text-sm text-emerald-800">
                    ₹{lot.expectedPrice?.toLocaleString('en-IN')}/{lot.unit}
                  </span>
                  <Link
                    to="/buyer-marketplace"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  >
                    Make Offer →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Requirement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base text-stone-900">Post Procurement Requirement</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Crop Type</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white"
                >
                  <option value="Tomato">Tomato (టమాటా)</option>
                  <option value="Red Chilli">Red Chilli (మిరప)</option>
                  <option value="Paddy">Paddy / Rice (వరి)</option>
                  <option value="Cotton">Cotton (పత్తి)</option>
                  <option value="Maize">Maize (మొక్కజొన్న)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Volume (Quintals)</label>
                  <input
                    type="number"
                    required
                    value={targetQuantity}
                    onChange={(e) => setTargetQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Budget (₹ / qtl)</label>
                  <input
                    type="number"
                    required
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 text-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Grade Required</label>
                  <select
                    value={qualityGrade}
                    onChange={(e) => setQualityGrade(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Grade C">Grade C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Logistics Arrangement</label>
                  <select
                    value={transportProvided ? 'yes' : 'no'}
                    onChange={(e) => setTransportProvided(e.target.value === 'yes')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="yes">Buyer Arranges Truck</option>
                    <option value="no">Farmer Delivers to Plant</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Destination Processing Plant</label>
                <input
                  type="text"
                  required
                  value={destinationHub}
                  onChange={(e) => setDestinationHub(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
                >
                  Publish Procurement Demand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
