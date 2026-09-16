import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { IBuyerRequirement, ICropLot, IOffer } from '../types';
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
  Clock,
  Eye,
  Truck,
  FileText,
  AlertCircle,
  X,
  PlusCircle,
  Layers,
  Scale,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { user, role, isAuthenticated, demoLogin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Active buyer / farmer detection
  const isBuyerRole = role === 'buyer';

  // Active Tab: 'lots' | 'offers' | 'requirements'
  const activeTab = searchParams.get('tab') || (isBuyerRole ? 'lots' : 'requirements');

  // Filter States
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedSellerType, setSelectedSellerType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Data States
  const [lots, setLots] = useState<ICropLot[]>([]);
  const [requirements, setRequirements] = useState<IBuyerRequirement[]>([]);
  const [offers, setOffers] = useState<IOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals for Buyer
  const [activeDetailLot, setActiveDetailLot] = useState<ICropLot | null>(null);
  const [makeOfferLot, setMakeOfferLot] = useState<ICropLot | null>(null);
  const [offerPrice, setOfferPrice] = useState<number>(2800);
  const [offerQty, setOfferQty] = useState<number>(50);
  const [transportResponsibility, setTransportResponsibility] = useState<string>('Buyer');
  const [paymentTerms, setPaymentTerms] = useState<string>('100% Escrow on Delivery');
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
  );
  const [initialMessage, setInitialMessage] = useState<string>('');

  // Counter Offer Modal state (for My Offers tab)
  const [counteringOffer, setCounteringOffer] = useState<IOffer | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<number>(2750);
  const [counterNoteInput, setCounterNoteInput] = useState<string>('');

  // Farmer's requirement offer modal
  const [activeFarmerReq, setActiveFarmerReq] = useState<IBuyerRequirement | null>(null);
  const [farmerOfferPrice, setFarmerOfferPrice] = useState<number>(2800);
  const [farmerOfferQty, setFarmerOfferQty] = useState<number>(50);

  // Load lots, requirements, and offers
  const loadMarketData = async () => {
    setLoading(true);
    setFeedbackMsg(null);
    try {
      const promises: Promise<any>[] = [
        api.getLots({ crop: selectedCrop !== 'All' ? selectedCrop : undefined }),
        api.getBuyerRequirements({ crop: selectedCrop !== 'All' ? selectedCrop : undefined })
      ];

      // Load offers if authenticated or in buyer role
      if (isAuthenticated || isBuyerRole) {
        promises.push(
          api.getOffers().catch((e) => {
            console.warn('Offers fetch optional:', e);
            return { offers: [] };
          })
        );
      }

      const results = await Promise.all(promises);
      const lotsRes = results[0];
      const reqsRes = results[1];
      const offersRes = results[2];

      if (lotsRes?.lots) setLots(lotsRes.lots);
      if (reqsRes?.requirements) setRequirements(reqsRes.requirements);
      if (offersRes?.offers) setOffers(offersRes.offers);
    } catch (err: any) {
      console.warn('Error loading market data:', err);
      setFeedbackMsg({ type: 'error', text: 'Failed to load market data. Please refresh.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketData();
  }, [selectedCrop, isAuthenticated, role]);

  const handleTabChange = (tab: 'lots' | 'offers' | 'requirements') => {
    setSearchParams({ tab });
  };

  // Open Make Offer Modal for a given crop lot
  const handleOpenMakeOffer = (lot: ICropLot) => {
    setMakeOfferLot(lot);
    setOfferPrice(lot.expectedPrice || 2800);
    setOfferQty(lot.quantity || 50);
    setTransportResponsibility('Buyer');
    setPaymentTerms('100% Escrow on Delivery');
    setDeliveryDate(new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]);
    setInitialMessage(
      `We offer ₹${lot.expectedPrice || 2800}/${lot.unit || 'quintal'} for immediate pickup with 100% simulated escrow hold.`
    );
  };

  // Submit Buyer Offer / RFQ
  const handleSubmitBuyerOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!makeOfferLot) return;

    setActionLoading(true);
    try {
      await api.createOffer({
        lotId: makeOfferLot._id,
        quantity: Number(offerQty),
        price: Number(offerPrice),
        transportResponsibility,
        paymentTerms,
        deliveryDate,
        initialMessage:
          initialMessage ||
          `Purchase offer at ₹${offerPrice}/${makeOfferLot.unit || 'quintal'} with simulated escrow lock.`
      });

      setMakeOfferLot(null);
      if (activeDetailLot) setActiveDetailLot(null);
      setFeedbackMsg({
        type: 'success',
        text: `Offer for ${makeOfferLot.crop} (${offerQty} ${makeOfferLot.unit}) submitted to ${makeOfferLot.farmerName}! Valid for 48 hours.`
      });

      // Reload data and switch to offers tab to let buyer track status
      await loadMarketData();
      handleTabChange('offers');
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err.message || 'Failed to submit offer. Please ensure you are logged in as a Buyer.'
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Accept Counter Offer
  const handleAcceptCounterOffer = async (offerId: string) => {
    if (!confirm('Accept negotiated price and lock simulated escrow? This will automatically initiate logistics dispatch.')) {
      return;
    }
    setActionLoading(true);
    try {
      const res = await api.acceptOffer(offerId);
      setFeedbackMsg({
        type: 'success',
        text: `Offer accepted! Order created with simulated escrow lock. Logistics dispatched.`
      });
      await loadMarketData();
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err.message || 'Failed to accept offer.'
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Buyer Counter Offer
  const handleSubmitCounter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counteringOffer) return;

    setActionLoading(true);
    try {
      await api.counterOffer(counteringOffer._id, {
        counterPrice: Number(counterPriceInput),
        message: counterNoteInput || `Counter proposal: We can settle at ₹${counterPriceInput}/${counteringOffer.unit}.`
      });
      setCounteringOffer(null);
      setFeedbackMsg({
        type: 'success',
        text: `Counter offer of ₹${counterPriceInput}/${counteringOffer.unit} transmitted to farmer.`
      });
      await loadMarketData();
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err.message || 'Failed to submit counter offer.'
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Farmer requirement offer handler (preserved for farmer role)
  const handleSubmitFarmerOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFarmerReq) return;

    setActionLoading(true);
    try {
      await api.createOffer({
        lotId: 'LOT-2026-TOM-001',
        buyerId: activeFarmerReq.buyerId,
        buyerCompany: activeFarmerReq.buyerCompany,
        offeredPrice: Number(farmerOfferPrice),
        quantity: Number(farmerOfferQty),
        unit: activeFarmerReq.unit,
        crop: activeFarmerReq.crop,
        paymentTerms: activeFarmerReq.additionalRequirements || '100% Escrow on Delivery',
        transportResponsibility: activeFarmerReq.deliveryLocation ? 'FARMER_DELIVERY' : 'BUYER_ARRANGED',
        deliveryDate: activeFarmerReq.requiredDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
      });
      setActiveFarmerReq(null);
      setFeedbackMsg({
        type: 'success',
        text: `Digital offer submitted to ${activeFarmerReq.buyerCompany} with simulated escrow backing!`
      });
    } catch (err: any) {
      setFeedbackMsg({
        type: 'error',
        text: err.message || 'Failed to submit offer.'
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Filter lots
  const filteredLots = lots.filter((lot) => {
    if (selectedGrade !== 'All' && !lot.qualityGrade.toLowerCase().includes(selectedGrade.toLowerCase())) {
      return false;
    }
    if (selectedSellerType === 'Farmer' && lot.farmerType === 'FPO') {
      return false;
    }
    if (selectedSellerType === 'FPO' && lot.farmerType !== 'FPO') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        lot.crop.toLowerCase().includes(q) ||
        lot.variety.toLowerCase().includes(q) ||
        lot.farmerName.toLowerCase().includes(q) ||
        lot.location.toLowerCase().includes(q) ||
        lot.district.toLowerCase().includes(q) ||
        lot.lotId.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Feedback Message */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between shadow-sm animate-in fade-in ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 border border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-700 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="p-1 hover:bg-black/5 rounded-lg text-stone-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>{isBuyerRole ? 'Institutional Buyer Marketplace' : 'Corporate Demand Marketplace'}</span>
            </span>
            <span className="text-xs text-stone-300">
              {isBuyerRole
                ? 'Verified Farmgate & FPO Produce Batches'
                : 'Direct Procurement Contracts with Verified Processors'}
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            {isBuyerRole ? 'Produce Procurement Marketplace' : 'Institutional Buyer Marketplace'}
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/80 max-w-2xl leading-relaxed">
            {isBuyerRole
              ? 'Browse verified farmer and FPO crop lots. Inspect AI-graded quality parameters, submit binding purchase offers (RFQ), and lock payments in simulated escrow.'
              : 'Direct procurement contracts with verified food processors, supermarket chains, and exporters. All contracts backed by simulated escrow protection.'}
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {isBuyerRole ? (
            <>
              <Link
                to="/buyer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-colors"
              >
                ← Buyer Dashboard
              </Link>
              <button
                onClick={() => handleTabChange('offers')}
                className="relative px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>My Offers & Negotiations</span>
                {offers.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black">
                    {offers.length}
                  </span>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setSelectedCrop('Tomato')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Show Highest Paying Tenders</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation (for Buyer role) */}
      {isBuyerRole && (
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
          <button
            onClick={() => handleTabChange('lots')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'lots'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Available Farmer & FPO Lots ({filteredLots.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('offers')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'offers'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>My Offers & Negotiations</span>
            {offers.length > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === 'offers' ? 'bg-white text-blue-900' : 'bg-blue-100 text-blue-900'
                }`}
              >
                {offers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => handleTabChange('requirements')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'requirements'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Corporate Procurement Demands ({requirements.length})</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          TAB 1: AVAILABLE FARMER & FPO LOTS (Primary Buyer Marketplace)
         ========================================================================= */}
      {(activeTab === 'lots' || (!isBuyerRole && false)) && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-stone-500" />
                <span>Crop:</span>
              </span>
              {['All', 'Tomato', 'Chilli', 'Paddy', 'Cotton', 'Maize'].map((c) => (
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

            {/* Sub-filters: Grade & Seller Type & Search */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <select
                value={selectedSellerType}
                onChange={(e) => setSelectedSellerType(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-white font-medium text-stone-700"
              >
                <option value="All">All Sellers</option>
                <option value="Farmer">Farmers Only</option>
                <option value="FPO">FPO Aggregated Only</option>
              </select>

              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-white font-medium text-stone-700"
              >
                <option value="All">All Grades</option>
                <option value="Grade A">Grade A Only</option>
                <option value="Grade B">Grade B Only</option>
              </select>

              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search lots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50/50 focus:bg-white focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="p-12 text-center text-sm font-semibold text-stone-500 bg-white rounded-2xl border border-stone-200">
              <div className="animate-spin w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full mx-auto mb-2" />
              Loading available harvest lots from verified producers...
            </div>
          )}

          {/* Lots Grid */}
          {!loading && filteredLots.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
              <Layers className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-bold text-stone-800">No crop lots match the selected filters</h3>
              <p className="text-xs text-stone-500">
                Try resetting your filters or selecting &quot;All&quot; crops to see all active lots.
              </p>
              <button
                onClick={() => {
                  setSelectedCrop('All');
                  setSelectedGrade('All');
                  setSelectedSellerType('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLots.map((lot) => {
                const askingPrice = lot.expectedPrice || 2800;
                // Estimated net realization (asking price minus estimated freight/handling)
                const estTransportCost = lot.crop.toLowerCase().includes('tomato') ? 60 : 80;
                const estHandlingCess = 20;
                const netRealization = askingPrice - estTransportCost - estHandlingCess;
                const landedCostEst = askingPrice + estTransportCost;

                return (
                  <div
                    key={lot._id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    {/* Top Preview Image & Badges */}
                    <div className="relative h-44 bg-stone-100 overflow-hidden border-b border-stone-100">
                      <img
                        src={
                          lot.images?.[0] ||
                          'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
                        }
                        alt={lot.crop}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-blue-900/90 text-white backdrop-blur-xs shadow-xs">
                          {lot.lotId}
                        </span>
                        {lot.isAggregated && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-400 text-stone-950 shadow-xs">
                            FPO Aggregated
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-600 text-white shadow-xs flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{lot.qualityGrade || 'Grade A'}</span>
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 shrink-0 text-amber-300" />
                          <span className="truncate">{lot.district || 'Chittoor'}, AP</span>
                        </span>
                        <span className="font-semibold shrink-0">
                          {lot.harvestDate ? `Harvested ${lot.harvestDate}` : 'Fresh Harvest'}
                        </span>
                      </div>
                    </div>

                    {/* Lot Details Body */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-lg text-stone-900 group-hover:text-blue-700 transition-colors">
                                {lot.crop}
                              </h3>
                              <span className="text-xs text-stone-500 font-medium">({lot.variety})</span>
                            </div>
                            <p className="text-xs text-stone-600 font-medium mt-0.5">
                              Producer: <strong>{lot.farmerName}</strong>{' '}
                              <span className="text-stone-400">({lot.farmerType || 'Farmer'})</span>
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-stone-400 block">Available Qty</span>
                            <span className="font-heading font-black text-base text-stone-900">
                              {lot.quantity} {lot.unit || 'quintal'}
                            </span>
                          </div>
                        </div>

                        {/* Pricing Box (Asking Price & Net Realization) */}
                        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-stone-500 uppercase block">Asking Price</span>
                            <span className="font-black text-base text-blue-900">
                              ₹{askingPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-stone-500 block">per {lot.unit || 'qtl'}</span>
                          </div>

                          <div className="text-right border-l border-stone-200 pl-2">
                            <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                              Net Realization
                            </span>
                            <span className="font-black text-base text-emerald-700">
                              ₹{netRealization.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-stone-500 block">
                              Est. Landed: ₹{landedCostEst.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Quality Specs Pill */}
                        <div className="text-xs text-stone-600 space-y-1 pt-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Quality Inspection:</span>
                            <span className="font-semibold text-stone-800">
                              {lot.qualityReport?.specifications?.firmness
                                ? `Firmness: ${lot.qualityReport.specifications.firmness}`
                                : 'AI Visual & Size Verified'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Status:</span>
                            <span
                              className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                                lot.status === 'Offer Received'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-emerald-100 text-emerald-900'
                              }`}
                            >
                              {lot.status || 'Listed'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Working Action Buttons: View Details & Make Offer */}
                      <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveDetailLot(lot)}
                          className="py-2.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-stone-600" />
                          <span>View Details</span>
                        </button>

                        <button
                          onClick={() => handleOpenMakeOffer(lot)}
                          className="py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Make Offer</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: MY OFFERS & NEGOTIATIONS (Real-time Status Tracking & Counters)
         ========================================================================= */}
      {isBuyerRole && activeTab === 'offers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-stone-200">
            <div>
              <h2 className="font-bold text-lg text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-700" />
                <span>My Active Purchase Offers & Price Negotiations</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Review counter-offers from farmers, submit revised terms, or accept to trigger simulated escrow lock.
              </p>
            </div>

            <button
              onClick={() => handleTabChange('lots')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              + Make New Purchase Offer
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs text-stone-500">Loading purchase offers...</div>
          ) : offers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
              <FileText className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="font-bold text-stone-800">No active offers submitted yet</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore available farmer lots in the marketplace and click &quot;Make Offer&quot; to initiate a procurement deal.
              </p>
              <button
                onClick={() => handleTabChange('lots')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-700 text-white shadow-sm"
              >
                Browse Available Produce Lots →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => {
                const isCountered = offer.status === 'COUNTERED';
                const isAccepted = offer.status === 'ACCEPTED';
                const isPending = offer.status === 'PENDING';

                return (
                  <div
                    key={offer._id}
                    className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs space-y-4 transition-all ${
                      isCountered
                        ? 'border-amber-300 ring-2 ring-amber-100'
                        : isAccepted
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-stone-200'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-stone-900">{offer.offerId}</span>
                          <span className="text-xs text-stone-400">•</span>
                          <span className="text-xs font-semibold text-blue-700">Lot: {offer.lotCode}</span>
                          <span className="text-xs text-stone-400">•</span>
                          <span className="text-xs font-medium text-stone-600">Farmer: {offer.farmerName}</span>
                        </div>
                        <h4 className="font-heading font-black text-base text-stone-900 mt-1">
                          {offer.quantity} {offer.unit || 'quintal'} of {offer.crop}
                        </h4>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {isCountered && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            <span>Farmer Countered — Action Required!</span>
                          </span>
                        )}
                        {isAccepted && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Offer Accepted • Escrow Active</span>
                          </span>
                        )}
                        {isPending && (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-300 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-stone-500" />
                            <span>Awaiting Farmer Response</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price Comparison Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                      <div>
                        <span className="text-stone-500 block">Initial Proposed Price:</span>
                        <span className="font-bold text-sm text-stone-800">
                          ₹{offer.originalPrice?.toLocaleString('en-IN')}/{offer.unit}
                        </span>
                      </div>

                      <div>
                        <span className="text-stone-500 block">Current Negotiated Price:</span>
                        <span
                          className={`font-black text-base ${
                            isCountered ? 'text-amber-800 font-extrabold' : 'text-emerald-800'
                          }`}
                        >
                          ₹{offer.currentPrice?.toLocaleString('en-IN')}/{offer.unit}
                        </span>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-stone-500 block">Estimated Contract Value:</span>
                        <span className="font-black text-base text-stone-900">
                          ₹{(Number(offer.currentPrice || 0) * Number(offer.quantity || 0)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Negotiation History Thread */}
                    {offer.negotiationHistory && offer.negotiationHistory.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                          Negotiation Timeline
                        </span>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {offer.negotiationHistory.map((item, idx) => {
                            const isBuyer = item.senderRole === 'buyer';
                            return (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-xl text-xs flex flex-col gap-1 border ${
                                  isBuyer
                                    ? 'bg-blue-50/70 border-blue-200 text-blue-950 ml-0 sm:ml-6'
                                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-950 mr-0 sm:mr-6'
                                }`}
                              >
                                <div className="flex items-center justify-between text-[10px] text-stone-500">
                                  <span className="font-bold">
                                    {isBuyer ? '🏭 You (Buyer)' : `👨‍🌾 ${item.senderName || 'Farmer'}`}
                                  </span>
                                  <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="font-medium">{item.message}</div>
                                <div className="text-[11px] font-bold">
                                  Proposed Price: ₹{item.price?.toLocaleString('en-IN')}/{offer.unit}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons for this Offer */}
                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-stone-500">
                        <span>Logistics: <strong>{offer.transportResponsibility || 'Buyer Arranged'}</strong></span>
                        <span className="mx-2">•</span>
                        <span>Payment: <strong>{offer.paymentTerms || '100% Escrow'}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCountered && (
                          <>
                            <button
                              onClick={() => {
                                setCounteringOffer(offer);
                                setCounterPriceInput(offer.currentPrice || 2750);
                                setCounterNoteInput('');
                              }}
                              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-stone-300 hover:bg-stone-100 text-stone-800 transition-colors"
                            >
                              Counter Back
                            </button>
                            <button
                              disabled={actionLoading}
                              onClick={() => handleAcceptCounterOffer(offer._id)}
                              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Accept Terms (₹{offer.currentPrice}/{offer.unit})</span>
                            </button>
                          </>
                        )}

                        {isAccepted && (
                          <Link
                            to="/orders"
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition-colors flex items-center gap-1"
                          >
                            <span>View Escrow Order & Logistics →</span>
                          </Link>
                        )}

                        {isPending && (
                          <span className="text-xs text-stone-500 italic">
                            Valid until {new Date(offer.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 3: CORPORATE PROCUREMENT REQUIREMENTS (Tenders & Demands)
         ========================================================================= */}
      {(activeTab === 'requirements' || (!isBuyerRole && activeTab !== 'offers')) && (
        <div className="space-y-6">
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

          {/* Requirements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req: any) => {
              const company = req.buyerCompany || req.buyerName || 'Verified Corporate Buyer';
              const bType = req.businessType || 'Institutional Procurement';
              const qty = req.quantity ?? req.targetQuantity ?? 50;
              const unit = req.unit || 'quintals';
              const crop = req.crop || 'Harvest Produce';
              const grade = req.requiredGrade || req.qualityGradeRequired || 'Grade A';
              const priceDisplay =
                req.minPrice && req.maxPrice
                  ? `₹${req.minPrice.toLocaleString('en-IN')} - ₹${req.maxPrice.toLocaleString('en-IN')}`
                  : req.targetPricePerUnit
                  ? `₹${Number(req.targetPricePerUnit).toLocaleString('en-IN')}`
                  : '₹2,800';
              const basePrice = req.maxPrice || req.minPrice || req.targetPricePerUnit || 2800;
              const reliability = req.reliabilityRating || 98;
              const transport = req.transportProvided ? '✅ Buyer Arranges Truck' : 'Farmer Delivery to Hub';
              const destination = req.deliveryLocation || req.destinationHub || `${req.district || 'Regional'} Hub`;

              return (
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
                          <h3 className="font-bold text-base text-stone-900">{company}</h3>
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">{bType}</div>
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
                          {qty} {unit} of {crop}
                        </span>
                        <span className="text-[10px] text-blue-700 block">Grade: {grade}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-stone-500 block">Offered Budget:</span>
                        <span className="text-lg font-black text-emerald-800">{priceDisplay}</span>
                        <span className="text-[10px] text-stone-500 block">/{unit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specifications & Reliability */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-xs text-stone-600">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Payment Reliability:</span>
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {reliability}% On-Time
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Logistics Transport:</span>
                        <span className="font-semibold text-stone-800">{transport}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Escrow Protection:</span>
                        <span className="font-bold text-blue-900">100% Locked Prior to Dispatch</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Destination Plant:</span>
                        <span className="text-stone-800 font-medium">{destination}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-stone-100">
                      {isBuyerRole ? (
                        <div className="text-center py-2 text-xs font-semibold text-stone-500 bg-stone-50 rounded-xl">
                          Procurement Demand Notice
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveFarmerReq(req);
                            setFarmerOfferPrice(basePrice);
                            setFarmerOfferQty(qty);
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>Submit Digital Offer</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: VIEW LOT DETAILS (Full Specifications & Quality Inspection)
         ========================================================================= */}
      {activeDetailLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-5 animate-in fade-in my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900">
                    {activeDetailLot.lotId}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                    {activeDetailLot.qualityGrade || 'Grade A'}
                  </span>
                  {activeDetailLot.isAggregated && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                      FPO Aggregated
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-black text-2xl text-stone-900 mt-1">
                  {activeDetailLot.crop} ({activeDetailLot.variety})
                </h3>
                <p className="text-xs text-stone-500">
                  Harvested at {activeDetailLot.location} • {activeDetailLot.district}, {activeDetailLot.state}
                </p>
              </div>

              <button
                onClick={() => setActiveDetailLot(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Gallery */}
            <div className="relative h-60 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={
                  activeDetailLot.images?.[0] ||
                  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80'
                }
                alt={activeDetailLot.crop}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Price & Quantity Banner */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-900 font-bold block">Available Batch Volume:</span>
                <span className="font-heading font-black text-xl text-blue-950">
                  {activeDetailLot.quantity} {activeDetailLot.unit || 'quintal'}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-500 font-bold block">Asking Price (Ex-Farm):</span>
                <span className="font-heading font-black text-2xl text-emerald-800">
                  ₹{activeDetailLot.expectedPrice?.toLocaleString('en-IN')}/{activeDetailLot.unit || 'qtl'}
                </span>
              </div>
            </div>

            {/* AI Quality Inspection Parameters */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Quality Inspection Report & Specifications</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-semibold block">Quality Grade</span>
                  <span className="font-bold text-stone-900 block">{activeDetailLot.qualityGrade || 'Grade A'}</span>
                  <span className="text-[10px] text-emerald-700">AI Confidence: 94.8%</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-semibold block">Fruit Firmness / Ripeness</span>
                  <span className="font-bold text-stone-900 block">
                    {activeDetailLot.qualityReport?.specifications?.firmness || '4.2 kg/cm² (Firm)'}
                  </span>
                  <span className="text-[10px] text-stone-500">85% Mature Red</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-semibold block">Diameter / Size</span>
                  <span className="font-bold text-stone-900 block">
                    {activeDetailLot.qualityReport?.specifications?.avgDiameter || '55mm - 65mm'}
                  </span>
                  <span className="text-[10px] text-stone-500">Uniform Crates</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-semibold block">Defect Tolerance</span>
                  <span className="font-bold text-emerald-800 block">
                    {activeDetailLot.qualityReport?.specifications?.defectPercentage || '< 1.8%'}
                  </span>
                  <span className="text-[10px] text-emerald-700">Meets Export Standard</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-semibold block">Producer Mobile</span>
                  <span className="font-bold text-stone-900 block">
                    {activeDetailLot.farmerMobile || '+91 98765 43210'}
                  </span>
                  <span className="text-[10px] text-blue-700 font-medium">Verified Identity</span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-stone-500 font-semibold block">Packaging</span>
                  <span className="font-bold text-stone-900 block">Plastic Crates (25kg)</span>
                  <span className="text-[10px] text-stone-500">Safe for Transit</span>
                </div>
              </div>

              {activeDetailLot.description && (
                <p className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <strong>Farmer Notes:</strong> {activeDetailLot.description}
                </p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveDetailLot(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const lot = activeDetailLot;
                  setActiveDetailLot(null);
                  handleOpenMakeOffer(lot);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>Make Purchase Offer / Send RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: MAKE OFFER / SEND RFQ (Buyer -> Farmer)
         ========================================================================= */}
      {makeOfferLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in fade-in my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Direct Farmgate Purchase Offer
                </span>
                <h3 className="font-heading font-black text-xl text-stone-900">
                  Offer for {makeOfferLot.crop} ({makeOfferLot.lotId})
                </h3>
              </div>
              <button
                onClick={() => setMakeOfferLot(null)}
                className="p-1 text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Lot Summary Box */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-500">Producer:</span>{' '}
                <strong className="text-stone-900">{makeOfferLot.farmerName}</strong>
                <div className="text-[11px] text-stone-500">
                  {makeOfferLot.location} • Grade: {makeOfferLot.qualityGrade}
                </div>
              </div>
              <div className="text-right">
                <span className="text-stone-500">Asking Price:</span>{' '}
                <strong className="text-blue-900">
                  ₹{makeOfferLot.expectedPrice?.toLocaleString('en-IN')}/{makeOfferLot.unit || 'qtl'}
                </strong>
                <div className="text-[11px] text-stone-500">Available: {makeOfferLot.quantity} qtl</div>
              </div>
            </div>

            <form onSubmit={handleSubmitBuyerOffer} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Offered Price (₹ / {makeOfferLot.unit || 'quintal'})
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    max={200000}
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-black rounded-xl border border-stone-300 text-emerald-800 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Quantity Needed ({makeOfferLot.unit || 'quintals'})
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={makeOfferLot.quantity || 10000}
                    value={offerQty}
                    onChange={(e) => setOfferQty(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 bg-white"
                  />
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900">Total Purchase Value (Simulated Escrow):</span>
                <span className="font-heading font-black text-lg text-emerald-950">
                  ₹{(Number(offerPrice || 0) * Number(offerQty || 0)).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Logistics & Payment Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Transport Responsibility</label>
                  <select
                    value={transportResponsibility}
                    onChange={(e) => setTransportResponsibility(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white font-medium"
                  >
                    <option value="Buyer">Buyer Arranged (Our Fleet)</option>
                    <option value="Farmer">Farmer Delivers to Plant</option>
                    <option value="Platform 3PL">AgriSetu 3PL Cold Chain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Payment & Settlement Terms</label>
                <input
                  type="text"
                  readOnly
                  value="100% Simulated Escrow Hold on Acceptance • Released on Weighbridge Confirmation"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-100 text-stone-700 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Message / Special Procurement Terms to Farmer
                </label>
                <textarea
                  rows={2}
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                  placeholder="e.g. Need harvest crates palletized. Weighbridge inspection at Sri City plant."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setMakeOfferLot(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {actionLoading ? (
                    <>
                      <div className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Digital Offer</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: BUYER COUNTER-OFFER MODAL
         ========================================================================= */}
      {counteringOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase">Revise Offer Terms</span>
                <h3 className="font-bold text-base text-stone-900">Counter Offer to {counteringOffer.farmerName}</h3>
              </div>
              <button
                onClick={() => setCounteringOffer(null)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitCounter} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your New Counter Price (₹ / {counteringOffer.unit || 'quintal'})
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  max={200000}
                  value={counterPriceInput}
                  onChange={(e) => setCounterPriceInput(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-black text-emerald-800 rounded-xl border border-stone-300"
                />
                <span className="text-[11px] text-stone-500 mt-1 block">
                  Farmer&apos;s latest quote was: <strong>₹{counteringOffer.currentPrice}/{counteringOffer.unit}</strong>
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Negotiation Note</label>
                <textarea
                  rows={2}
                  value={counterNoteInput}
                  onChange={(e) => setCounterNoteInput(e.target.value)}
                  placeholder="Explain why this price works (e.g. based on current Madanapalle modal or free transport)..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCounteringOffer(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
                >
                  {actionLoading ? 'Sending...' : 'Send Counter Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: FARMER SUBMIT OFFER MODAL (Preserved for Farmer Persona)
         ========================================================================= */}
      {activeFarmerReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase">Direct Procurement Bid</span>
                <h3 className="font-bold text-base text-stone-900">Offer to {activeFarmerReq.buyerCompany}</h3>
              </div>
              <button
                onClick={() => setActiveFarmerReq(null)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitFarmerOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Your Asking Price (₹ / unit)</label>
                <input
                  type="number"
                  required
                  value={farmerOfferPrice}
                  onChange={(e) => setFarmerOfferPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-black text-emerald-800 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Available Quantity (quintals)</label>
                <input
                  type="number"
                  required
                  value={farmerOfferQty}
                  onChange={(e) => setFarmerOfferQty(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setActiveFarmerReq(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm"
                >
                  {actionLoading ? 'Submitting...' : 'Submit Digital Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
