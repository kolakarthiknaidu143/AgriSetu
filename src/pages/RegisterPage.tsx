import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { CheckCircle2, ArrowRight, Sprout } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('farmer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('Chittoor');
  const [village, setVillage] = useState('');

  // Farmer specific
  const [cropsGrown, setCropsGrown] = useState('Tomato, Chilli');
  const [landArea, setLandArea] = useState('3.5');

  // FPO specific
  const [fpoName, setFpoName] = useState('');
  const [memberFarmers, setMemberFarmers] = useState('50');

  // Buyer specific
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('Food Processor');
  const [gstNumber, setGstNumber] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload: any = {
        name,
        email,
        mobile,
        password,
        role,
        district,
        village,
        state: 'Andhra Pradesh'
      };

      if (role === 'farmer') {
        payload.farmerDetails = {
          farmerName: name,
          cropsGrown: cropsGrown.split(',').map((s) => s.trim()),
          approxLandArea: Number(landArea) || 3
        };
      } else if (role === 'fpo') {
        payload.fpoDetails = {
          fpoName: fpoName || name,
          numberOfFarmers: Number(memberFarmers) || 50,
          operatingDistricts: [district]
        };
      } else if (role === 'buyer') {
        payload.buyerDetails = {
          companyName: companyName || name,
          businessType,
          gstNumber: gstNumber || '37AAACB1029K1Z4'
        };
      }

      await register(payload);
      if (role === 'farmer') navigate('/farmer');
      else if (role === 'fpo') navigate('/fpo');
      else if (role === 'buyer') navigate('/buyer');
      else navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-700 text-white shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
            Join AgriSetu Marketplace
          </h2>
          <p className="text-xs text-stone-600">
            Create an account to list produce, access AI predictions, or procure institutional volumes.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              role === 'farmer'
                ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            👨‍🌾 Farmer
          </button>
          <button
            type="button"
            onClick={() => setRole('fpo')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              role === 'fpo'
                ? 'bg-white text-amber-900 shadow-xs border border-amber-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🏢 FPO Aggregator
          </button>
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              role === 'buyer'
                ? 'bg-white text-blue-900 shadow-xs border border-blue-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🏭 Institutional Buyer
          </button>
        </div>

        {/* Registration Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name / Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Naidu"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@agrisetu.in"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  District (Andhra Pradesh)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Chittoor">Chittoor</option>
                  <option value="Tirupati">Tirupati</option>
                  <option value="Guntur">Guntur</option>
                  <option value="Krishna / Vijayawada">Krishna / Vijayawada</option>
                  <option value="Annamayya / Madanapalle">Annamayya / Madanapalle</option>
                  <option value="Nellore">Nellore</option>
                  <option value="Kurnool">Kurnool</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Village / Mandal / Town
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Chandragiri"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Role Conditional Fields */}
            {role === 'farmer' && (
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                    Major Crops Grown
                  </label>
                  <input
                    type="text"
                    value={cropsGrown}
                    onChange={(e) => setCropsGrown(e.target.value)}
                    placeholder="e.g. Tomato, Chilli, Paddy"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                    Approx Land Area (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    placeholder="3.5"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-emerald-300 bg-white"
                  />
                </div>
              </div>
            )}

            {role === 'fpo' && (
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-amber-900 mb-1">
                    FPO Entity Name
                  </label>
                  <input
                    type="text"
                    value={fpoName}
                    onChange={(e) => setFpoName(e.target.value)}
                    placeholder="e.g. Rayalaseema Kisan Producer Co."
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-amber-900 mb-1">
                    Number of Member Farmers
                  </label>
                  <input
                    type="number"
                    value={memberFarmers}
                    onChange={(e) => setMemberFarmers(e.target.value)}
                    placeholder="45"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-300 bg-white"
                  />
                </div>
              </div>
            )}

            {role === 'buyer' && (
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-blue-900 mb-1">
                      Company / Firm Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. ABC Foods Ltd"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-blue-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-blue-900 mb-1">
                      Business Type
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-blue-300 bg-white"
                    >
                      <option value="Food Processor">Food Processor</option>
                      <option value="Retail Chain">Supermarket / Retail Chain</option>
                      <option value="Exporter">Agri Exporter</option>
                      <option value="Commission Agent">Mandi Licensed Commission Agent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-blue-900 mb-1">
                    GSTIN / Registration Number (For Verified Buyer Badge)
                  </label>
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    placeholder="37AAACB1029K1Z4"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-blue-300 bg-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-emerald-700 hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
