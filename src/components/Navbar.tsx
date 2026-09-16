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
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* 20-Step Live Demo Button */}
            <button
              id="live-demo-tour-btn"
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-bold rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-900 shadow-xs hover:shadow transition-all active:scale-95 animate-pulse min-h-[40px]"
              title="Click to run interactive 20-step complete transaction flow"
            >
              <Sparkles className="w-4 h-4 text-stone-900 shrink-0" />
              <span className="hidden xs:inline sm:inline">⚡ 20-Step Demo</span>
              <span className="xs:hidden">⚡ Demo</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 border border-stone-200 transition-colors min-h-[40px]"
              title="Toggle Telugu / English labels"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>

            {/* Role Demo Switcher Dropdown (Desktop & Tablet) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold border ${roleColors[role]} transition-all min-h-[40px]`}
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
                className="relative p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-72 sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-800 uppercase tracking-wider">Live Platform Alerts</span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {unreadNotificationsCount} unread
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-stone-100">
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

            {/* User Profile / Dashboard Link (Desktop) */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-1.5">
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
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs min-h-[40px]"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors min-h-[40px] flex items-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors min-h-[40px] flex items-center"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-emerald-900 hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white/98 backdrop-blur px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {/* Quick Persona Switcher in Mobile Drawer */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 uppercase tracking-wider">
              <span>Active Persona (Demo)</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleColors[role]}`}>
                {role.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  handleRoleSwitch('farmer');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-2 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between ${
                  role === 'farmer' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>👨‍🌾 Farmer</span>
                {role === 'farmer' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRoleSwitch('fpo');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-2 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between ${
                  role === 'fpo' ? 'bg-amber-700 text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>🏢 FPO</span>
                {role === 'fpo' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRoleSwitch('buyer');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-2 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between ${
                  role === 'buyer' ? 'bg-blue-700 text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>🏭 Buyer</span>
                {role === 'buyer' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRoleSwitch('admin');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-2 rounded-lg text-xs font-bold text-left transition-all flex items-center justify-between ${
                  role === 'admin' ? 'bg-purple-700 text-white shadow-xs' : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>⚖️ Mandi Admin</span>
                {role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
              </button>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <div className="space-y-1">
            <Link
              to={role === 'farmer' ? '/farmer' : role === 'fpo' ? '/fpo' : role === 'buyer' ? '/buyer' : '/admin'}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border border-emerald-200/60 transition-colors"
            >
              <span className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-emerald-700" />
                <span>My Dashboard ({role.toUpperCase()})</span>
              </span>
              <span className="text-xs text-emerald-700">Open →</span>
            </Link>

            <Link
              to="/market-intelligence"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/market-intelligence'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>🌾 Mandi Prices & Net Realization</span>
            </Link>

            <Link
              to="/price-prediction"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/price-prediction'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>🤖 AI Price Prediction</span>
            </Link>

            <Link
              to="/sale-window"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/sale-window'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>⏱️ Smart Sale Window</span>
            </Link>

            <Link
              to="/marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/marketplace'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>🏢 Buyer Marketplace</span>
            </Link>

            <Link
              to="/buyer-matching"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/buyer-matching'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>🎯 Smart Buyer Matching</span>
            </Link>

            <Link
              to="/storage"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/storage'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>❄️ Cold Storage & Warehouses</span>
            </Link>

            <Link
              to="/logistics"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/logistics'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>🚚 Logistics & Transit</span>
            </Link>

            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/orders'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>🛡️ Orders & Simulated Escrow</span>
            </Link>

            <Link
              to="/disputes"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === '/disputes'
                  ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>⚖️ APMC Dispute Redressal</span>
            </Link>
          </div>

          {/* Footer of Mobile Drawer */}
          <div className="pt-3 border-t border-stone-200 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setLanguage(language === 'en' ? 'te' : 'en');
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200"
              >
                <Languages className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{language === 'en' ? 'తెలుగులోకి మార్చండి' : 'Switch to English'}</span>
              </button>

              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-stone-700 bg-stone-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
