import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  Utensils,
  ChevronRight,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Flame,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

interface HeroSectionProps {
  onQuickBook: (params: {
    checkIn: string;
    checkOut: string;
    packageId: 'package_01' | 'package_02';
    adults: number;
    children: number;
  }) => void;
}

export const HeroSection = ({ onQuickBook }: HeroSectionProps) => {
  const { data } = useCMS();
  const { hotelInfo, heroInfo, packages } = data;

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const getTomorrowStr = (daysAhead: number = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return formatDate(d);
  };

  const [checkIn, setCheckIn] = useState<string>(getTomorrowStr(0));
  const [checkOut, setCheckOut] = useState<string>(getTomorrowStr(1));
  const [packageId, setPackageId] = useState<'package_01' | 'package_02'>('package_01');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return isNaN(diffTime) || diffTime < 1 ? 1 : diffTime;
  };

  const nights = calculateNights();
  const selectedPkg = packages.find((p) => p.id === packageId) || packages[0];
  const extraAdults = Math.max(0, adults - 2);
  const estimatedTotal = (selectedPkg.basePrice + extraAdults * selectedPkg.extraPersonPrice) * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickBook({ checkIn, checkOut, packageId, adults, children });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] flex flex-col justify-center overflow-hidden pt-6 pb-16 bg-slate-950">
      {/* Background with Panoramic Himalayan Multi-Layer Animation Theme */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* Layer 1: Himalayan Mountain Range Photo with Ken Burns Slow Pan & Zoom */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={heroInfo?.bgImage || "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=90"}
            alt="Majestic Mussoorie Garhwal Himalayan Snow Peaks and Valley"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] saturate-[1.1] animate-himalayan-zoom will-change-transform scale-105"
          />
        </div>

        {/* Layer 2: Mountain Ridge Golden Alpenglow Warmth (Sunrise/Sunset Himalayan Ray) */}
        <div className="absolute -top-20 right-0 w-full md:w-3/4 h-3/4 bg-gradient-to-bl from-amber-500/20 via-orange-600/10 to-transparent blur-3xl animate-alpenglow pointer-events-none" />

        {/* Layer 3: High-Altitude Floating Himalayan Mist Streamers (Left-to-Right drift) */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-100/10 to-transparent blur-2xl animate-mist-1 pointer-events-none" />

        {/* Layer 4: Lower Valley Cloud Drift (Right-to-Left drift) */}
        <div className="absolute bottom-10 inset-x-0 h-56 bg-gradient-to-t from-slate-950/60 via-amber-200/5 to-transparent blur-xl animate-mist-2 pointer-events-none" />

        {/* Layer 5: Ethereal Floating Alpine Starlight & Mountain Air Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-amber-200/70 blur-[0.5px] animate-[float-dust_14s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 left-[48%] w-1 h-1 rounded-full bg-white/80 blur-[0.5px] animate-[float-dust_18s_ease-in-out_infinite_2s]" />
          <div className="absolute top-1/2 right-[20%] w-1.5 h-1.5 rounded-full bg-amber-300/60 blur-[0.5px] animate-[float-dust_16s_ease-in-out_infinite_4s]" />
          <div className="absolute top-2/3 left-[28%] w-1 h-1 rounded-full bg-cyan-200/70 blur-[0.5px] animate-[float-dust_20s_ease-in-out_infinite_1s]" />
          <div className="absolute top-[22%] right-[32%] w-2 h-2 rounded-full bg-amber-100/50 blur-[1px] animate-[float-dust_22s_ease-in-out_infinite_6s]" />
        </div>

        {/* Layer 6: Deep Contrast Shadow Overlays for Crisp Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17] via-[#0b0f17]/70 to-[#0b0f17]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17]/95 via-[#0b0f17]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        {/* Top Trust Chips */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{heroInfo?.chip1 || `${hotelInfo.starRating || 4.8}/5 Rated • Happy Valley, Mussoorie`}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{heroInfo?.chip2 || `${hotelInfo.totalRooms || 18} Super Deluxe Rooms • 24x7 Hot Water`}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Utensils className="w-3.5 h-3.5 text-amber-300" />
            <span>{heroInfo?.chip3 || "In-House Rezzala Multicuisine Restaurant"}</span>
          </span>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                {heroInfo?.mainHeading || hotelInfo.name}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                {heroInfo?.subHeading || hotelInfo.subtitle}
              </p>
            </div>


            {/* Quick Value Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Centrally Located</span>
                </div>
                <div className="text-slate-200 text-xs mt-1 font-medium">100m to Buddha Temple & Dalai Hills</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>24x7 Comfort</span>
                </div>
                <div className="text-slate-200 text-xs mt-1 font-medium">Running Hot Water & Free High-Speed Wi-Fi</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm col-span-2 sm:col-span-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="text-slate-200 text-xs mt-1 font-medium">From ₹{packages[0].basePrice.toLocaleString('en-IN')}/night with Breakfast</div>
              </div>
            </div>

            {/* Quick Action Hotline Links */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct Booking Discounts
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kids &lt; 6 Yrs Free
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Hidden Fees
              </span>
            </div>
          </motion.div>

          {/* High Conversion Booking Engine Box */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 border-2 border-amber-500/40 shadow-2xl shadow-amber-950/50 backdrop-blur-xl">
              {/* Badge */}
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                ★ Best Seller Offer
              </div>

              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">Instant Price Calculator</div>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">Check Rates & Reserve</h3>
                <p className="text-xs text-slate-400">Select dates to view instant availability for 18 Super Deluxe Rooms</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Selectors */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Package / Meal Plan Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-amber-400" /> Select Meal Package
                    </span>
                    <span className="text-[10px] text-amber-400 font-medium">Duration: {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPackageId('package_01')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        packageId === 'package_01'
                          ? 'border-amber-400 bg-amber-500/15 ring-1 ring-amber-400'
                          : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Pkg 01 (CP)</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 font-bold">
                          ₹{packages[0].basePrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-300 mt-1">With Breakfast</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPackageId('package_02')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        packageId === 'package_02'
                          ? 'border-amber-400 bg-amber-500/15 ring-1 ring-amber-400'
                          : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Pkg 02 (MAP)</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold">
                          ₹{packages[1].basePrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-300 mt-1">Breakfast + Dinner</div>
                    </button>
                  </div>
                </div>

                {/* Guests Configuration */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" /> Adults
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults (Standard)</option>
                      <option value={3}>3 Adults (+ Extra Bed)</option>
                      <option value={4}>4 Adults (2 Rooms)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Children (&lt;6 yrs Free)
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value={0}>0 Children</option>
                      <option value={1}>1 Child (Free &lt;6)</option>
                      <option value={2}>2 Children</option>
                    </select>
                  </div>
                </div>

                {/* Live Cost Summary with Transparent Formula */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">
                      Total ({nights} {nights === 1 ? 'Night' : 'Nights'} × ₹{selectedPkg.basePrice.toLocaleString('en-IN')}):
                    </div>
                    <div className="text-xs text-amber-300 font-medium">
                      {selectedPkg.name.split(' (')[0]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white font-serif">
                      ₹{estimatedTotal.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">Direct Rate Guarantee</div>
                  </div>
                </div>

                {/* CTA Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-amber-950/50 hover:shadow-amber-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer transform active:scale-95"
                >
                  <span>Continue to Instant Reservation</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Direct WhatsApp / Call Shortcut */}
                <div className="pt-1 flex items-center justify-center gap-3 text-xs text-slate-400">
                  <span>Prefer booking over phone?</span>
                  <a
                    href={`tel:${hotelInfo.phone1Clean}`}
                    className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    {hotelInfo.phone1}
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
