import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoTourModal } from './components/DemoTourModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { FpoDashboard } from './pages/FpoDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { PricePredictionPage } from './pages/PricePredictionPage';
import { SaleWindowPage } from './pages/SaleWindowPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { BuyerMatchingPage } from './pages/BuyerMatchingPage';
import { LotsPage } from './pages/LotsPage';
import { CreateLotPage } from './pages/CreateLotPage';
import { QualityGradingPage } from './pages/QualityGradingPage';
import { StoragePage } from './pages/StoragePage';
import { OrdersPage } from './pages/OrdersPage';
import { DisputesPage } from './pages/DisputesPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
          <Navbar />
          <DemoTourModal />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/farmer" element={<FarmerDashboard />} />
              <Route path="/fpo" element={<FpoDashboard />} />
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Mandi Prices */}
              <Route path="/mandi-prices" element={<MarketIntelligencePage />} />
              <Route path="/market-prices" element={<MarketIntelligencePage />} />
              <Route path="/market-intelligence" element={<MarketIntelligencePage />} />
              <Route path="/mandi" element={<MarketIntelligencePage />} />

              {/* AI Prediction */}
              <Route path="/price-prediction" element={<PricePredictionPage />} />
              <Route path="/ai-prediction" element={<PricePredictionPage />} />

              {/* Sale Window */}
              <Route path="/sale-window" element={<SaleWindowPage />} />

              {/* Buyer Marketplace */}
              <Route path="/buyer-marketplace" element={<MarketplacePage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/buyers" element={<MarketplacePage />} />
              <Route path="/buyer-matching" element={<BuyerMatchingPage />} />
              <Route path="/lots" element={<LotsPage />} />
              <Route path="/lots/create" element={<CreateLotPage />} />
              <Route path="/quality-grading" element={<QualityGradingPage />} />

              {/* Storage & Warehouses */}
              <Route path="/storage-warehouses" element={<StoragePage />} />
              <Route path="/storage" element={<StoragePage />} />
              <Route path="/warehouses" element={<StoragePage />} />
              <Route path="/cold-storage" element={<StoragePage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/transactions" element={<OrdersPage />} />
              <Route path="/offers" element={<OrdersPage />} />
              <Route path="/logistics" element={<OrdersPage />} />
              <Route path="/disputes" element={<DisputesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
