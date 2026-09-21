import { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Users,
  CheckCircle2,
  Utensils,
  Sparkles,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CreditCard,
  MapPin,
  FileText,
  Tag,
  ArrowRight,
  ArrowLeft,
  Share2,
  Printer,
  Copy,
  Check,
  Calculator,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCMS } from '../context/CMSContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: {
    checkIn?: string;
    checkOut?: string;
    packageId?: 'package_01' | 'package_02';
    adults?: number;
    children?: number;
  };
}

export const BookingModal = ({ isOpen, onClose, initialParams }: BookingModalProps) => {
  const { data } = useCMS();
  const { hotelInfo, packages, promoCodes } = data;

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const getTomorrowStr = (daysAhead: number = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return formatDate(d);
  };

  const [step, setStep] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>(initialParams?.checkIn || getTomorrowStr(0));
  const [checkOut, setCheckOut] = useState<string>(initialParams?.checkOut || getTomorrowStr(1));
  const [packageId, setPackageId] = useState<'package_01' | 'package_02'>(initialParams?.packageId || 'package_01');
  const [adults, setAdults] = useState<number>(initialParams?.adults || 2);
  const [children, setChildren] = useState<number>(initialParams?.children || 0);
  const [roomsCount, setRoomsCount] = useState<number>(1);
  const [guestName, setGuestName] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [promoCodeInput, setPromoCodeInput] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [bookingId, setBookingId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Sync initialParams when opened
  useEffect(() => {
    if (initialParams) {
      if (initialParams.checkIn) setCheckIn(initialParams.checkIn);
      if (initialParams.checkOut) setCheckOut(initialParams.checkOut);
      if (initialParams.packageId) setPackageId(initialParams.packageId);
      if (initialParams.adults) setAdults(initialParams.adults);
      if (initialParams.children) setChildren(initialParams.children);
    }
  }, [initialParams, isOpen]);

  if (!isOpen) return null;

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return isNaN(diff) || diff < 1 ? 1 : diff;
  };

  const nights = calculateNights();
  const selectedPkg = packages.find((p) => p.id === packageId) || packages[0];

  // Quick set duration helper
  const handleQuickDuration = (nightsCount: number) => {
    const start = new Date(checkIn);
    const end = new Date(start);
    end.setDate(start.getDate() + nightsCount);
    setCheckOut(formatDate(end));
  };

  // Base pricing
  const extraAdults = Math.max(0, adults - 2 * roomsCount);
  const ratePerNight = selectedPkg.basePrice;
  const baseRoomRate = ratePerNight * roomsCount * nights;
  const extraPersonCharge = extraAdults * selectedPkg.extraPersonPrice * nights;
  const subtotal = baseRoomRate + extraPersonCharge;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    const found = promoCodes.find((p) => p.code === code && p.active);
    if (found) {
      setAppliedPromo(found.code);
      setDiscountPercent(found.discountPercent);
    } else if (code === 'MISTWOOD10' || code === 'EARLYBIRD' || code === 'HAPPYVALLEY') {
      setAppliedPromo(code);
      setDiscountPercent(10);
    } else if (code === 'DIRECT15') {
      setAppliedPromo(code);
      setDiscountPercent(15);
    } else {
      alert('Invalid promo code. Try MISTWOOD10 for 10% direct discount!');
    }
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      alert('Please provide your name and phone number to generate reservation.');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newBookingId = `MM-MUS-${randomNum}`;
    setBookingId(newBookingId);
    setStep(3); // Confirmation step

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if unavailable
    }
  };

  const generateWhatsAppMessage = () => {
    const text = `🏨 *NEW RESERVATION INQUIRY - ${hotelInfo.name.toUpperCase()}*
----------------------------------------
*Reservation ID:* ${bookingId || 'PENDING'}
*Guest Name:* ${guestName}
*Phone:* ${guestPhone}
*Email:* ${guestEmail || 'Not provided'}
*Dates:* ${checkIn} to ${checkOut} (${nights} ${nights === 1 ? 'Night' : 'Nights'})
*Room:* ${roomsCount} x Super Deluxe Room
*Package:* ${selectedPkg.name} (${selectedPkg.code})
*Calculation Breakdown:*
• Rate: ₹${ratePerNight}/night × ${nights} Nights × ${roomsCount} Room = ₹${baseRoomRate}
${extraPersonCharge > 0 ? `• Extra Person Charge: ₹${extraPersonCharge}` : ''}
${appliedPromo ? `• Promo Applied: ${appliedPromo} (-₹${discountAmount})` : ''}
*Total Payable:* ₹${finalTotal.toLocaleString('en-IN')} (Direct Booking Rate)
*Occupancy:* ${adults} Adults, ${children} Children
${specialRequests ? `*Special Request:* ${specialRequests}` : ''}
----------------------------------------
Please confirm room availability and payment instructions.`;

    return encodeURIComponent(text);
  };

  const copyBookingDetails = () => {
    const text = `${hotelInfo.name} Mussoorie Reservation Voucher
Booking ID: ${bookingId}
Guest: ${guestName} (${guestPhone})
Check-in: ${checkIn} | Check-out: ${checkOut} (${nights} Nights)
Package: ${selectedPkg.name}
Calculation: ₹${ratePerNight}/night × ${nights} Nights × ${roomsCount} Room = ₹${finalTotal.toLocaleString('en-IN')}
Hotel Contact: ${hotelInfo.phone1} / ${hotelInfo.email}
Address: ${hotelInfo.address}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#0e1420] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-serif font-bold text-base">
              M
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                {hotelInfo.name} Direct Reservation
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans font-semibold">
                  Best Rate Guarantee
                </span>
              </h2>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" /> {hotelInfo.locationArea}, Mussoorie • 18 Super Deluxe Rooms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Wizard Progress Bar */}
        <div className="bg-slate-900/90 px-6 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 font-semibold ${step >= 1 ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-[11px]">1</span>
            <span>Dates & Package</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-700 hidden sm:block" />
          <div className={`flex items-center gap-1.5 font-semibold ${step >= 2 ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-[11px]">2</span>
            <span>Guest Details</span>
          </div>
          <div className="h-0.5 w-12 bg-slate-700 hidden sm:block" />
          <div className={`flex items-center gap-1.5 font-semibold ${step === 3 ? 'text-emerald-400' : 'text-slate-500'}`}>
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[11px]">3</span>
            <span>Instant Voucher</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: Dates & Package Selection */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Dates & Room Count */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" /> Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Check-in: 12:00 PM</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" /> Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">Check-out: 11:00 AM</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" /> Rooms & Guests
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value={1}>1 Room</option>
                        <option value={2}>2 Rooms</option>
                        <option value={3}>3 Rooms</option>
                        <option value={4}>4 Rooms</option>
                      </select>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-xs font-medium text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults (+Extra)</option>
                        <option value={4}>4 Adults</option>
                        <option value={5}>5 Adults</option>
                        <option value={6}>6 Adults</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Quick Night Selector Pills */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-medium whitespace-nowrap">Quick Select Stay:</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {[1, 2, 3, 4].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => handleQuickDuration(n)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                              nights === n
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                            }`}
                          >
                            {n} {n === 1 ? 'Night' : 'Nights'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="inline-flex items-center self-start sm:self-auto text-amber-300 font-medium text-xs bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 whitespace-nowrap">
                      Total: <strong className="ml-1 text-white">{nights} {nights === 1 ? 'Night' : 'Nights'}</strong>
                      <span className="mx-1 text-amber-500">•</span>
                      <span>{adults} Guests ({roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Package Selection Cards */}
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Select Your Meal Plan Package (Per Room / Night)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  {packages.map((pkg) => {
                    const isSelected = packageId === pkg.id;
                    const pkgTotalForNights = pkg.basePrice * roomsCount * nights;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setPackageId(pkg.id as any)}
                        className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all relative ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50 shadow-lg'
                            : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        {pkg.badge && (
                          <div className="absolute -top-3 right-4 z-10">
                            <span
                              className={`text-[10.5px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md inline-block border ${
                                pkg.id === 'package_02'
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-extrabold border-emerald-400'
                                  : 'bg-slate-950 text-amber-400 border-amber-500/80'
                              }`}
                            >
                              {pkg.badge}
                            </span>
                          </div>
                        )}

                        <div className="flex items-start justify-between gap-2 pt-1">
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                              {pkg.code}
                            </span>
                            <h4 className="text-base font-bold text-white font-serif">{pkg.name}</h4>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-amber-400 font-serif">
                              ₹{pkg.basePrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-400 block">/ night (2 guests)</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 mt-2 font-light">{pkg.description}</p>

                        <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5">
                          <div className="text-[11px] font-semibold text-slate-300">Package Inclusions:</div>
                          {pkg.inclusions.slice(0, 4).map((inc, i) => (
                            <div key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{inc}</span>
                            </div>
                          ))}
                          <div className="text-[11px] text-amber-300/80 mt-1 font-medium">
                            Extra Person: +₹{pkg.extraPersonPrice}/night (Kids &lt; 6 yrs Free)
                          </div>
                        </div>

                        {/* Direct Calculation Pill for this package */}
                        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] bg-slate-950/60 p-2 rounded-lg">
                          <span className="text-slate-400">
                            {nights} {nights === 1 ? 'Night' : 'Nights'} Total:
                          </span>
                          <span className="font-bold text-amber-300 font-serif text-sm">
                            ₹{pkgTotalForNights.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Math Breakdown Box (Addresses Issue 3) */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                  <Calculator className="w-4 h-4 text-amber-400" />
                  <span>Transparent Price Calculation Breakdown:</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>• Base Rate per Night ({selectedPkg.name.split(' (')[0]}):</span>
                    <span className="font-bold text-white">₹{ratePerNight.toLocaleString('en-IN')} / night</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>• Number of Nights Selected ({checkIn} → {checkOut}):</span>
                    <span className="font-bold text-amber-400">× {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>• Number of Rooms:</span>
                    <span className="font-bold text-white">× {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}</span>
                  </div>
                  {extraPersonCharge > 0 && (
                    <div className="flex justify-between text-indigo-300">
                      <span>• Extra Person Charges ({extraAdults} extra × ₹{selectedPkg.extraPersonPrice} × {nights}N):</span>
                      <span>+₹{extraPersonCharge.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-sans font-bold text-white">
                    <span>Total Calculated Amount:</span>
                    <span className="text-amber-400 text-base font-serif">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Includes all room taxes & meals specified in {selectedPkg.code}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-95 ml-auto"
                  >
                    <span>Proceed to Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Guest Details & Promo Code */}
          {step === 2 && (
            <form onSubmit={handleFinalBooking} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Guest Contact Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    Guest Information
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary Guest Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Special Requests / Sightseeing / Cab Requirements
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Mountain view room, pick-up from Dehradun Railway Station, early check-in preference..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>

                  {/* Promo Code Input */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <label className="block text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" /> Have a Direct Booking Promo Code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Try code: MISTWOOD10"
                        value={promoCodeInput}
                        onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {appliedPromo && (
                      <div className="text-xs text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Code <strong>{appliedPromo}</strong> applied ({discountPercent}% Off)!
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Breakdown Sidebar */}
                <div className="lg:col-span-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2">
                    Reservation Summary
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Property:</span>
                      <span className="font-semibold text-white">{hotelInfo.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Room Type:</span>
                      <span className="font-semibold text-white">{roomsCount} x Super Deluxe</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Duration:</span>
                      <span className="font-semibold text-white">{checkIn} to {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'})</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Meal Plan:</span>
                      <span className="font-semibold text-amber-300">{selectedPkg.name}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Guests:</span>
                      <span className="font-semibold text-white">{adults} Adults, {children} Children</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Base Room (₹{ratePerNight} × {nights}N × {roomsCount}R):</span>
                        <span>₹{baseRoomRate.toLocaleString('en-IN')}</span>
                      </div>
                      {extraPersonCharge > 0 && (
                        <div className="flex justify-between text-slate-400">
                          <span>Extra Person Charges:</span>
                          <span>+₹{extraPersonCharge.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-medium">
                          <span>Direct Promo Discount:</span>
                          <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold font-sans text-white pt-2 border-t border-slate-800">
                        <span>Net Payable:</span>
                        <span className="text-amber-400 font-serif text-lg">
                          ₹{finalTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm & Generate Voucher</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full py-2 text-center text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Packages & Dates
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: Instant Voucher Confirmation */}
          {step === 3 && (
            <div className="space-y-6 animate-in zoom-in-95">
              {/* Top Success Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                      Reservation Voucher Generated!
                    </h3>
                    <p className="text-xs text-slate-300">
                      Booking Reference: <strong className="text-amber-400 font-mono text-sm">{bookingId}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyBookingDetails}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Voucher'}</span>
                  </button>
                </div>
              </div>

              {/* Printable Style Voucher Card */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xl font-serif font-bold text-white tracking-wide">
                      {hotelInfo.name.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-400">
                      {hotelInfo.address}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Status</div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      PROVISIONAL CONFIRMED
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950/60">
                    <span className="text-slate-400 block text-[11px]">Primary Guest:</span>
                    <span className="font-bold text-white">{guestName}</span>
                    <span className="text-slate-400 block text-[10px]">{guestPhone}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60">
                    <span className="text-slate-400 block text-[11px]">Check-in Date:</span>
                    <span className="font-bold text-amber-300">{checkIn}</span>
                    <span className="text-slate-400 block text-[10px]">From 12:00 PM</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60">
                    <span className="text-slate-400 block text-[11px]">Check-out Date:</span>
                    <span className="font-bold text-amber-300">{checkOut}</span>
                    <span className="text-slate-400 block text-[10px]">Until 11:00 AM ({nights} Nights)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60">
                    <span className="text-slate-400 block text-[11px]">Total Package Value:</span>
                    <span className="font-bold text-emerald-400 text-sm font-serif">₹{finalTotal.toLocaleString('en-IN')}</span>
                    <span className="text-slate-400 block text-[10px]">{selectedPkg.name.split(' (')[0]}</span>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="text-xs text-slate-400 p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 space-y-1">
                  <div className="font-semibold text-slate-300">Check-in Instructions & Direct Support:</div>
                  <p>• Government ID (Aadhaar / Voter ID / Passport) required at check-in for all adult guests.</p>
                  <p>• 24x7 Hot Water & Wi-Fi available across property. Restaurant timing: 7:30 AM to 10:30 PM.</p>
                </div>
              </div>

              {/* Conversion Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/${hotelInfo.phone1Clean}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Voucher to Hotel WhatsApp (Direct Confirm)</span>
                </a>

                <a
                  href={`tel:${hotelInfo.phone1Clean}`}
                  className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call Front Desk ({hotelInfo.phone1})</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
