import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IColdStorage } from '../types';
import {
  Warehouse,
  Thermometer,
  ShieldCheck,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Scale
} from 'lucide-react';

export const StoragePage: React.FC = () => {
  const [facilities, setFacilities] = useState<IColdStorage[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<IColdStorage | null>(null);
  const [bookingDays, setBookingDays] = useState<number>(3);
  const [bookingQuantity, setBookingQuantity] = useState<number>(50);
  const [bookingCrop, setBookingCrop] = useState<string>('Tomato');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getColdStorages().then((res) => {
      setFacilities(res.facilities);
      if (res.facilities.length > 0) {
        setSelectedFacility(res.facilities[0]);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleBook = (facility: IColdStorage) => {
    const totalCost = facility.dailyRatePerQuintal * bookingDays * bookingQuantity;
    alert(`Space reserved at ${facility.name}!\nQuantity: ${bookingQuantity} quintals for ${bookingDays} days.\nTotal simulated fee: ₹${totalCost.toLocaleString('en-IN')}.\nGate pass OTP sent to registered mobile.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300">
            Post-Harvest Preservation Hubs
          </span>
          <span className="text-xs text-stone-500">WDRA & APMC Licensed Facilities</span>
        </div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-stone-900">
          Cold Storage & Warehouse Network
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Prevent distress selling when local mandis are glutted. Reserve verified cold storage chambers to safely hold perishable produce until market prices peak.
        </p>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac._id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-5 border-b border-stone-100 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-base text-stone-900">{fac.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{fac.location}, {fac.district}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-700">
                  {fac.type}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-orange-50/60 border border-orange-100 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 block">Available Capacity:</span>
                  <span className="text-sm font-bold text-stone-900">
                    {fac.availableCapacityTonnes} / {fac.totalCapacityTonnes} Tonnes
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 block">Daily Tariff:</span>
                  <span className="text-lg font-black text-orange-950">
                    ₹{fac.dailyRatePerQuintal}
                  </span>
                  <span className="text-[10px] text-stone-500 block">/quintal/day</span>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-xs text-stone-600">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Temperature Control:</span>
                  <strong className="text-stone-800">{fac.temperatureRange}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Relative Humidity:</span>
                  <strong className="text-stone-800">{fac.humidityRange}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Supported Crops:</span>
                  <span className="text-stone-800 font-medium">{fac.supportedCrops.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>WDRA Accreditation:</span>
                  <strong className="text-emerald-700">Certified & Insured</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => handleBook(fac)}
                  className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <Warehouse className="w-4 h-4" />
                  <span>Reserve Space (₹{fac.dailyRatePerQuintal}/qtl)</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Storage Cost Calculator Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Scale className="w-4 h-4" />
            <span>Interactive Storage Feasibility Estimator</span>
          </div>
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
            Calculate Total Storage Expense for 50 Quintals
          </h3>
          <p className="text-xs text-stone-300 leading-relaxed">
            Standard cold storage in Chittoor costs ₹2.20 per quintal per day. Holding 50 quintals for 3 days costs only <strong>₹330 in total storage fee</strong>, while the expected price rise gives you <strong>+₹5,500 extra revenue</strong>.
          </p>
        </div>

        <div className="bg-stone-800 p-4 rounded-xl border border-stone-700 text-right min-w-[220px]">
          <span className="text-xs text-stone-400 block">Total 3-Day Holding Cost:</span>
          <span className="text-2xl font-black text-amber-400">₹330</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">Net Gain vs Immediate Sale: +₹5,170</span>
        </div>
      </div>
    </div>
  );
};
