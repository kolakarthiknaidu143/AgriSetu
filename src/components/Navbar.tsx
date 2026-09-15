import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sprout,
  TrendingUp,
  Store,
  Warehouse,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Sparkles,
  Layers,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  Languages
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    role,
    isAuthenticated,
    logout,
    demoLogin,
    language,
    setLanguage,
    unreadNotificationsCount,
    notifications,
    setIsDemoModalOpen
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRoleSwitch = async (newRole: 'farmer' | 'fpo' | 'buyer' | 'admin') => {
    setShowRoleMenu(false);
    await demoLogin(newRole);
    if (newRole === 'farmer') navigate('/farmer');
    else if (newRole === 'fpo') navigate('/fpo');
    else if (newRole === 'buyer') navigate('/buyer');
    else if (newRole === 'admin') navigate('/admin');
  };

  const roleColors = {
    farmer: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    fpo: 'bg-amber-100 text-amber-800 border-amber-300',
    buyer: 'bg-blue-100 text-blue-800 border-blue-300',
    admin: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-extrabold text-xl text-emerald-950 tracking-tight">AgriSetu</span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    AI MARKET
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium -mt-0.5">
                  {language === 'te' ? 'రైతు బజార్ & విక్రయ వేదిక' : 'Market Intelligence & Escrow'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                to="/market-intelligence"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/market-intelligence'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                {language === 'te' ? 'మార్కెట్ ధరలు' : 'Mandi Prices'}
              </Link>
              <Link
                to="/price-prediction"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/price-prediction'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                {language === 'te' ? 'AI ధర అంచనా' : 'AI Prediction'}
              </Link>
              <Link
                to="/sale-window"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/sale-window'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                {language === 'te' ? 'విక్రయ సమయం' : 'Sale Window'}
              </Link>
              <Link
                to="/marketplace"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/marketplace'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                {language === 'te' ? 'కొనుగోలుదారులు' : 'Buyer Marketplace'}
              </Link>
              <Link
                to="/storage"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/storage'
                    ? 'text-emerald-800 bg-emerald-50 font-semibold'
                    : 'text-stone-600 hover:text-emerald-800 hover:bg-stone-50'
                }`}
              >
                {language === 'te' ? 'కోల్డ్ స్టోరేజ్' : 'Storage & Warehouses'}
              </Link>
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 20-Step Live Demo Button */}
            <button
              id="live-demo-tour-btn"
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg bg-amber-500 hover:bg-amber-600 text-stone-900 shadow-xs hover:shadow transition-all active:scale-95 animate-pulse"
              title="Click to run interactive 20-step complete transaction flow"
            >
              <Sparkles className="w-4 h-4 text-stone-900" />
              <span>⚡ 20-Step Demo</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 border border-stone-200 transition-colors"
              title="Toggle Telugu / English labels"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>

            {/* Role Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${roleColors[role]} transition-all`}
                title="Switch Active Persona for Demo"
              >
                <span className="capitalize">{role.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    Switch Active Persona (Demo)
                  </div>
                  <button
                    onClick={() => handleRoleSwitch('farmer')}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 text-stone-800"
                  >
                    <div>
                      <div className="font-semibold text-emerald-900">👨‍🌾 Farmer (Ramesh Naidu)</div>
                      <div className="text-[10px] text-stone-500">Chittoor • 50q Tomato Harvest</div>
                    </div>
                    {role === 'farmer' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('fpo')}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 text-stone-800"
                  >
                    <div>
                      <div className="font-semibold text-amber-900">🏢 FPO (Rayalaseema Aggregators)</div>
                      <div className="text-[10px] text-stone-500">45 Farmers • 250q Bulk Lots</div>
                    </div>
                    {role === 'fpo' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('buyer')}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 text-stone-800"
                  >
                    <div>
                      <div className="font-semibold text-blue-900">🏭 Buyer (ABC Foods Ltd)</div>
                      <div className="text-[10px] text-stone-500">Verified Corporate Processor</div>
                    </div>
                    {role === 'buyer' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('admin')}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-purple-50 text-stone-800"
                  >
                    <div>
                      <div className="font-semibold text-purple-900">⚖️ Mandi Administrator</div>
                      <div className="text-[10px] text-stone-500">APMC Oversight & Dispute Arbitration</div>
                    </div>
                    {role === 'admin' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-800 uppercase tracking-wider">Live Platform Alerts</span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {unreadNotificationsCount} unread
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-stone-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-stone-500">No notifications yet</div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n._id}
                          className={`p-3 text-xs transition-colors hover:bg-stone-50 ${
                            !n.isRead ? 'bg-emerald-50/60' : ''
                          }`}
                        >
                          <div className="font-semibold text-stone-900 flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-stone-400 font-normal">Just now</span>
                          </div>
                          <p className="text-stone-600 text-[11px] mt-0.5">{n.message}</p>
                          {n.link && (
                            <Link
                              to={n.link}
                              onClick={() => setShowNotifMenu(false)}
                              className="inline-block mt-1 text-[11px] text-emerald-700 font-semibold hover:underline"
                            >
                              View details →
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-3 pt-2 border-t border-stone-100 text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifMenu(false)}
                      className="text-xs text-emerald-700 font-semibold hover:underline"
                    >
                      View all notification history
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Dashboard Link */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to={
                    role === 'farmer'
                      ? '/farmer'
                      : role === 'fpo'
                      ? '/fpo'
                      : role === 'buyer'
                      ? '/buyer'
                      : '/admin'
                  }
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white px-4 pt-3 pb-5 space-y-2">
          <Link
            to="/market-intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            🌾 Mandi Prices & Net Realization
          </Link>
          <Link
            to="/price-prediction"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            🤖 AI Price Prediction
          </Link>
          <Link
            to="/sale-window"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            ⏱️ Smart Sale Window
          </Link>
          <Link
            to="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            🏢 Buyer Marketplace
          </Link>
          <Link
            to="/buyer-matching"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            🎯 Smart Buyer Matching
          </Link>
          <Link
            to="/storage"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            ❄️ Storage & Cold Chain
          </Link>
          <Link
            to="/logistics"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            🚚 Logistics Coordination
          </Link>
          <Link
            to="/orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            🛡️ Orders & Simulated Escrow
          </Link>
          <Link
            to="/disputes"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-emerald-50"
          >
            ⚖️ Dispute & Grievance
          </Link>
          <div className="pt-2 border-t border-stone-100 flex justify-between items-center">
            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'te' : 'en');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-emerald-800"
            >
              Language: {language === 'en' ? 'తెలుగుకు మారండి' : 'Switch to English'}
            </button>
            <Link
              to={role === 'farmer' ? '/farmer' : role === 'fpo' ? '/fpo' : role === 'buyer' ? '/buyer' : '/admin'}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-bold"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
