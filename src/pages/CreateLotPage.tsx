import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  Sparkles,
  Camera,
  Upload,
  ShieldCheck,
  ArrowRight,
  Info,
  CheckCircle2,
  Users
} from 'lucide-react';

export const CreateLotPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [crop, setCrop] = useState('Tomato');
  const [variety, setVariety] = useState('Shivam Hybrid');
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState('quintal');
  const [harvestDate, setHarvestDate] = useState('2026-09-15');
  const [location, setLocation] = useState(user ? `${user.village || 'Chandragiri'}, ${user.district || 'Chittoor'}` : 'Chandragiri, Chittoor, AP');
  const [expectedPrice, setExpectedPrice] = useState<number>(2700);
  const [packaging, setPackaging] = useState('Plastic Crates (25kg)');
  const [description, setDescription] = useState('Freshly harvested morning batch. High firmness, vibrant red color, sorted and graded in farm shed.');

  // FPO Aggregation toggle
  const [isAggregated, setIsAggregated] = useState(user?.role === 'fpo');
  const [contributingFarmersCount, setContributingFarmersCount] = useState<number>(18);

  // Quality grading
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [defectPercentage, setDefectPercentage] = useState<number>(2.5);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');

  const [analyzingAi, setAnalyzingAi] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRunAiInspection = async () => {
    setAnalyzingAi(true);
    try {
      const res = await api.analyzeQuality({
        crop,
        imageDescription: 'Ripe Shivam Hybrid tomatoes in red plastic crates',
        sampleDetails: '50 crates randomly inspected'
      });
      setAiReport(res);
      setQualityGrade(res.grade);
      setDefectPercentage(res.defectPercentage);
    } catch (err: any) {
      console.warn('Inspection error:', err);
    } finally {
      setAnalyzingAi(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const lotPayload = {
        crop,
        variety,
        quantity: Number(quantity),
        unit,
        harvestDate,
        location,
        expectedPrice: Number(expectedPrice),
        qualityGrade,
        qualityReport: {
          colorMaturity: aiReport?.colorMaturity || 'Vibrant Red (85% Mature)',
          size: aiReport?.sizeUniformity || '55-65mm Caliber',
          defectPercentage: Number(defectPercentage),
          packaging,
          qualityNotes: aiReport?.recommendations || description
        },
        images: [imageUrl],
        isAggregated,
        contributingFarmersCount: isAggregated ? Number(contributingFarmersCount) : undefined
      };

      const res = await api.createLot(lotPayload);
      alert(`Crop Lot created successfully! Lot ID: ${res.lot.lotId}`);
      navigate('/buyer-matching');
    } catch (err: any) {
      setError(err.message || 'Failed to create lot');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Digital Harvest Onboarding
          </span>
          <span className="text-xs text-stone-500">APMC & AGMARK Compliant</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          Create New Crop Lot
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          List your harvest on the digital marketplace to receive verified buyer offers with simulated escrow protection.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Produce Details */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-stone-100">
              <Sprout className="w-4 h-4 text-emerald-700" />
              <span>1. Produce & Harvest Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Crop Type *
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="Tomato">Tomato (టమాటా)</option>
                  <option value="Red Chilli">Red Chilli (మిరప)</option>
                  <option value="Paddy">Paddy / Rice (వరి)</option>
                  <option value="Cotton">Cotton (పత్తి)</option>
                  <option value="Maize">Maize (మొక్కజొన్న)</option>
                  <option value="Onion">Onion (ఉల్లిపాయ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Variety / Hybrid Name *
                </label>
                <input
                  type="text"
                  required
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="e.g. Shivam Hybrid, Teja, Sona Masoori"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Lot Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="50"
                  className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Unit of Measure
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                >
                  <option value="quintal">Quintal (100 kg)</option>
                  <option value="tonne">Metric Tonne (1,000 kg)</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="crate">Crates (25 kg)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Harvest Date *
                </label>
                <input
                  type="date"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Farmgate Pickup Location *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Village, Mandal, District"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Expected Price (₹ per {unit}) *
                </label>
                <input
                  type="number"
                  required
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  placeholder="2700"
                  className="w-full px-3 py-2 text-sm font-bold text-emerald-900 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Section 2: FPO Aggregation Toggle */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-800" />
                <div>
                  <span className="font-bold text-xs text-amber-950 block">FPO Multi-Farmer Aggregation</span>
                  <span className="text-[11px] text-amber-800">Combine smallholder harvest volumes for better buyer pricing</span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={isAggregated}
                onChange={(e) => setIsAggregated(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </div>

            {isAggregated && (
              <div className="pt-2 border-t border-amber-200/80">
                <label className="block text-[11px] font-bold text-amber-950 mb-1">
                  Number of Contributing Smallholder Farmers in this Lot:
                </label>
                <input
                  type="number"
                  value={contributingFarmersCount}
                  onChange={(e) => setContributingFarmersCount(Number(e.target.value))}
                  className="w-32 px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white font-bold"
                />
              </div>
            )}
          </div>

          {/* Section 3: AI Quality Inspection & Visual Assessment */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>2. Quality Grading & Visual Inspection</span>
              </h3>
              <button
                type="button"
                disabled={analyzingAi}
                onClick={handleRunAiInspection}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span>{analyzingAi ? 'Inspecting Produce...' : 'Analyze with Gemini AI'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Quality Grade
                </label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold text-emerald-800 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Grade A">Grade A (Premium / Export)</option>
                  <option value="Grade B">Grade B (Standard Mandi / Processing)</option>
                  <option value="Grade C">Grade C (Local Consumption / Puree)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Defect / Blemish Percentage
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={defectPercentage}
                  onChange={(e) => setDefectPercentage(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Packaging Type
                </label>
                <input
                  type="text"
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  placeholder="e.g. Plastic Crates (25kg)"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* AI Report Card if analyzed */}
            {aiReport && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center justify-between font-bold text-emerald-900">
                  <span>Gemini Vision Assessment Result:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">{aiReport.grade}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                  <div>Maturity: <strong>{aiReport.colorMaturity}</strong></div>
                  <div>Size Caliber: <strong>{aiReport.sizeUniformity}</strong></div>
                  <div>Estimated Defects: <strong>{aiReport.defectPercentage}%</strong></div>
                </div>
                <p className="text-[11px] text-emerald-800 pt-1 border-t border-emerald-200">
                  {aiReport.recommendations}
                </p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Harvest Sample Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{submitting ? 'Registering Harvest Lot...' : 'Publish Lot & Match Buyers'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
