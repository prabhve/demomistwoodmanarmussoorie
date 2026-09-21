import { useState } from 'react';
import {
  BedDouble,
  Flame,
  Wifi,
  UtensilsCrossed,
  PhoneCall,
  Compass,
  Coffee,
  Droplets,
  Bath,
  ShieldCheck,
  Tv,
  Car,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

interface RoomsSectionProps {
  onSelectPackage: (packageId: 'package_01' | 'package_02') => void;
}

export const RoomsSection = ({ onSelectPackage }: RoomsSectionProps) => {
  const { data } = useCMS();
  const { roomInfo, packages } = data;
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const amenityIconMap: Record<string, any> = {
    BedDouble,
    Flame,
    Wifi,
    UtensilsCrossed,
    PhoneCall,
    Compass,
    Coffee,
    Droplets,
    Bath,
    ShieldCheck,
    Tv,
    Car,
  };

  const images = roomInfo.images && roomInfo.images.length > 0 ? roomInfo.images : [
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  ];

  const nextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="rooms" className="py-16 sm:py-20 bg-slate-950/90 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <span>Accommodations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            18 Spacious & Well-Appointed <br />
            <span className="text-amber-400">Super Deluxe Rooms</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Designed for uncompromised mountain comfort, whether you are visiting Mussoorie for a peaceful couple retreat, family holiday, or Tibetan culture tour in Happy Valley.
          </p>
        </motion.div>

        {/* Room Card with Interactive Image Gallery & Details */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start rounded-3xl bg-[#0e1420] border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/60"
        >
          {/* Gallery Carousel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 group">
              <img
                src={images[activeImgIndex % images.length]}
                alt="Mistwood Manor Super Deluxe Room Mussoorie"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-amber-500/30">
                  18 Available Units
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {roomInfo.size || '280 Sq. Ft.'}
                </span>
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative rounded-lg overflow-hidden aspect-[4/3] border transition-all cursor-pointer ${
                      activeImgIndex === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/50 scale-95'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Room Specs & Package Selection */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold text-white">Super Deluxe Room</h3>
                <span className="text-xs text-amber-400 font-semibold px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30">
                  Boutique Hill View
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {roomInfo.description}
              </p>
            </div>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Bed Configuration</span>
                <span className="text-slate-200 font-semibold">Queen Size Bed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Occupancy</span>
                <span className="text-slate-200 font-semibold">2 Adults (+1 Extra)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px]">Hot Water System</span>
                <span className="text-emerald-400 font-semibold">24x7 Running</span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Room Amenities & Facilities:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {roomInfo.amenities.map((item, i) => {
                  const Icon = amenityIconMap[item.icon] || CheckCircle2;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                        item.highlight
                          ? 'bg-amber-500/10 text-amber-200 border border-amber-500/20'
                          : 'bg-slate-900/60 text-slate-300 border border-slate-800/60'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-amber-400' : 'text-slate-400'} shrink-0`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Packages Card CTAs */}
            <div id="packages" className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Choose Your Preferred Package:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                      pkg.id === 'package_02'
                        ? 'bg-gradient-to-b from-amber-950/40 to-slate-900 border-amber-500/40'
                        : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-amber-400">{pkg.code}</span>
                        <span className="text-lg font-serif font-bold text-white">
                          ₹{pkg.basePrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-0.5">{pkg.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Extra Person: +₹{pkg.extraPersonPrice}/night
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg.id as any)}
                      className={`w-full mt-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        pkg.id === 'package_02'
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book @ ₹{pkg.basePrice.toLocaleString('en-IN')}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
