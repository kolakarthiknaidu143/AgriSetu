import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('farmer@agrisetu.in');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/farmer');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (role: 'farmer' | 'fpo' | 'buyer' | 'admin') => {
    setError(null);
    setLoading(true);
    try {
      await demoLogin(role);
      if (role === 'farmer') navigate('/farmer');
      else if (role === 'fpo') navigate('/fpo');
      else if (role === 'buyer') navigate('/buyer');
      else if (role === 'admin') navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-700 text-white shadow-md">
            <Sprout className="w-7 h-7" />
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
            Welcome back to AgriSetu
          </h2>
          <p className="text-xs text-stone-600">
            Sign in to access real-time mandi intelligence and your digital escrow transactions
          </p>
        </div>

        {/* Quick Demo Switcher Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>One-Click Demo Personas:</span>
            </span>
            <span className="text-[10px] text-emerald-800 font-semibold px-1.5 py-0.5 rounded bg-emerald-100">
              Instant
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left">
            <button
              type="button"
              onClick={() => handleQuickDemo('farmer')}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-100/60 border border-emerald-200 text-xs transition-colors shadow-2xs group"
            >
              <div className="font-bold text-emerald-900 group-hover:text-emerald-950">👨‍🌾 Farmer</div>
              <div className="text-[10px] text-stone-500">Ramesh Naidu (Chittoor)</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('fpo')}
              className="p-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-200 text-xs transition-colors shadow-2xs group"
            >
              <div className="font-bold text-amber-900 group-hover:text-amber-950">🏢 FPO Aggregator</div>
              <div className="text-[10px] text-stone-500">Rayalaseema FPO</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('buyer')}
              className="p-2.5 rounded-xl bg-white hover:bg-blue-100/60 border border-blue-200 text-xs transition-colors shadow-2xs group"
            >
              <div className="font-bold text-blue-900 group-hover:text-blue-950">🏭 Verified Buyer</div>
              <div className="text-[10px] text-stone-500">ABC Foods Ltd</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2.5 rounded-xl bg-white hover:bg-purple-100/60 border border-purple-200 text-xs transition-colors shadow-2xs group"
            >
              <div className="font-bold text-purple-900 group-hover:text-purple-950">⚖️ Mandi Admin</div>
              <div className="text-[10px] text-stone-500">APMC Oversight</div>
            </button>
          </div>
        </div>

        {/* Standard Login Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-stone-700">
                  Password
                </label>
                <span className="text-[11px] text-emerald-700 hover:underline cursor-pointer">
                  Demo pass: password123
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-stone-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-emerald-700 hover:underline">
              Register as Farmer, FPO, or Buyer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
