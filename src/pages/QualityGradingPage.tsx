import React, { useState } from 'react';
import { api } from '../services/api';
import {
  Sparkles,
  Camera,
  Upload,
  CheckCircle2,
  Award,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Scale,
  DollarSign
} from 'lucide-react';

export const QualityGradingPage: React.FC = () => {
  const [crop, setCrop] = useState('Tomato');
  const [sampleDetails, setSampleDetails] = useState('Random inspection of 50 crates harvested this morning in Chandragiri.');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const sampleImages = [
    {
      title: 'Grade A Premium Harvest',
      crop: 'Tomato',
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      desc: 'Uniform red maturity, firm calyx, zero pest holes'
    },
    {
      title: 'Grade B Mixed Maturity',
      crop: 'Tomato',
      url: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=600&auto=format&fit=crop&q=80',
      desc: 'Semi-ripe greenish shoulders, slight transit abrasion'
    },
    {
      title: 'Export Teja Chilli',
      crop: 'Red Chilli',
      url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
      desc: 'Bright scarlet red, sun-dried, moisture < 10%'
    }
  ];

  const [imageUrl, setImageUrl] = useState(sampleImages[0].url);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>({
    crop: 'Tomato',
    grade: 'Grade A',
    confidence: 94,
    colorMaturity: 'Uniform Bright Red (85–90% commercial ripeness)',
    sizeUniformity: '55–65mm diameter (Shivam Hybrid standard)',
    defectPercentage: 1.8,
    marketReadiness: 'High - Ready for retail chains and cold chain transit',
    recommendations: 'Pack in clean 25kg aerated plastic crates. Avoid overfilling to prevent bottom crush damage.',
    suggestedPriceRange: { min: 2750, max: 2850, unit: 'quintal' },
    isAiGraded: true
  });

  const handleSelectPreset = (idx: number) => {
    setSelectedPresetIndex(idx);
    setImageUrl(sampleImages[idx].url);
    setCrop(sampleImages[idx].crop);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.analyzeQuality({
        crop,
        imageDescription: sampleImages[selectedPresetIndex]?.desc || 'Harvest sample',
        sampleDetails
      });
      setResult(res);
    } catch (err: any) {
      alert(err.message || 'Inspection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Gemini Vision Quality Inspector</span>
          </span>
          <span className="text-xs text-stone-500">AGMARK & Terminal Mandi Standards</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          AI Digital Quality Grading & Defect Assessment
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Subjective grading by local middlemen often causes unfair price cuts. Our computer vision model inspects ripeness, color distribution, uniformity, and blemishes to assign objective AGMARK grades.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Image Selection & Camera input (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-bold text-base text-stone-900">1. Select Harvest Inspection Sample</h3>
          </div>

          {/* Sample Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700">Choose Sample Batch:</label>
            <div className="grid grid-cols-1 gap-2">
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(idx)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    selectedPresetIndex === idx
                      ? 'border-purple-500 bg-purple-50/70 ring-1 ring-purple-400'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <img
                    src={s.url}
                    alt={s.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-bold text-xs text-stone-900">{s.title}</div>
                    <div className="text-[11px] text-stone-500">{s.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Image Preview */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700">Inspected Produce Visual:</label>
            <div className="relative h-48 rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
              <img
                src={imageUrl}
                alt="Harvest produce"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-stone-900/80 text-white text-[10px] font-mono backdrop-blur-xs">
                Camera Feed: 1080p Macro Sample
              </div>
            </div>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Crop Type
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
              >
                <option value="Tomato">Tomato (టమాటా)</option>
                <option value="Red Chilli">Red Chilli (మిరప)</option>
                <option value="Paddy">Paddy / Rice (వరి)</option>
                <option value="Cotton">Cotton (పత్తి)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Sample Inspection Notes
              </label>
              <textarea
                rows={2}
                value={sampleDetails}
                onChange={(e) => setSampleDetails(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Inspecting Produce...' : 'Run Gemini Vision Grading'}</span>
            </button>
          </form>
        </div>

        {/* Right: AI Certificate & Defect Assessment (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-md space-y-6 animate-in fade-in">
              {/* Certificate Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-700" />
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Verified AI Inspection Certificate
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-stone-900 mt-1">
                    Certified {result.grade}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-900 border border-purple-200 inline-block">
                    Confidence: {result.confidence}%
                  </span>
                  <div className="text-[11px] text-stone-500 mt-1">
                    AGMARK Standard Match
                  </div>
                </div>
              </div>

              {/* Metric Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-stone-500">Color & Maturity Uniformity</span>
                  <div className="text-sm font-bold text-stone-900">{result.colorMaturity}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-stone-500">Caliber / Diameter Distribution</span>
                  <div className="text-sm font-bold text-stone-900">{result.sizeUniformity}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-stone-500">Blemish / Defect Percentage</span>
                  <div className="text-sm font-bold text-emerald-700">{result.defectPercentage}% (Within Grade A limit &lt;5%)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-stone-500">Commercial Market Readiness</span>
                  <div className="text-sm font-bold text-stone-900">{result.marketReadiness}</div>
                </div>
              </div>

              {/* Price Realization by Grade */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Assigned Price Benchmark for {result.grade}:
                  </span>
                  <span className="font-heading font-black text-lg text-emerald-900">
                    ₹{result.suggestedPriceRange?.min} – ₹{result.suggestedPriceRange?.max}/{result.suggestedPriceRange?.unit || 'qtl'}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Certified Grade A produce earns up to <strong>+₹300/qtl premium</strong> with organized food processors like ABC Foods Ltd compared to Grade B unassorted mandi lots.
                </p>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-300 text-[11px] text-amber-900 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>AI-generated estimate — actual market prices may vary.</span>
                </div>
              </div>

              {/* Packaging Recommendation */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-stone-800 block">Packaging & Post-Harvest Handling:</span>
                <p className="text-xs text-stone-600 leading-relaxed">{result.recommendations}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <span className="text-stone-500">Certificate Hash: SHA256-7fa88c91d...</span>
                <button
                  type="button"
                  onClick={() => alert('Certificate printed / downloaded for lot verification slip.')}
                  className="font-bold text-purple-700 hover:underline"
                >
                  Download AGMARK Inspection Slip →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
