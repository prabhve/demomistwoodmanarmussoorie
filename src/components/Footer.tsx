import { Phone, Mail, MapPin, Globe, Star, ShieldCheck, Heart, ArrowUp, Lock, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdminCMS: () => void;
}

export const Footer = ({ onOpenBooking, onOpenAdminCMS }: FooterProps) => {
  const { data } = useCMS();
  const { hotelInfo, packages } = data;
  const minPrice = packages[0]?.basePrice || 2700;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#05080e] border-t border-slate-900 text-slate-300 pt-16 pb-24 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-amber-500/80 bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center text-white font-serif font-bold text-lg shadow-md">
                M
              </div>
              <div>
                <div className="text-lg font-serif font-bold text-white tracking-wider">
                  {hotelInfo.name.toUpperCase()}
                </div>
                <div className="text-[10px] font-sans tracking-[0.2em] uppercase text-amber-400">
                  Mussoorie • Queen of the Hills
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Your serene mountain haven in Happy Valley, Mussoorie. Offering 18 Super Deluxe Rooms, in-house Rezzala multicuisine dining, and unbeatable closeness to Buddha Temple, Dalai Hills, and LBSNAA.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer transition-all transform active:scale-95"
              >
                Instant Online Booking (From ₹{minPrice.toLocaleString('en-IN')})
              </button>
            </div>
          </div>

          {/* Col 2: Mussoorie Property Address & Hotlines */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <div className="font-serif font-bold text-white text-sm border-b border-slate-800 pb-2">
              Hotel Contact & Property Address
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">{hotelInfo.name}</strong>
                  {hotelInfo.address}
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <a href={`tel:${hotelInfo.phone1Clean}`} className="hover:text-amber-400 transition-colors">
                    {hotelInfo.phone1}
                  </a>
                  {' / '}
                  <a href={`tel:${hotelInfo.phone2Clean}`} className="hover:text-amber-400 transition-colors">
                    {hotelInfo.phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${hotelInfo.email}`} className="hover:text-amber-400 transition-colors">
                  {hotelInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{hotelInfo.website}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Delhi Office & Associate Partners & Admin */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <div className="font-serif font-bold text-white text-sm border-b border-slate-800 pb-2">
              Corporate Office & Management
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-amber-400 uppercase font-semibold block">New Delhi Office</span>
                <span className="text-slate-200 block mt-0.5">
                  1209, Pragati Tower, Rajendra Place, New Delhi 110 008
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Associate Partners:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-amber-300 font-serif font-bold">
                    Rezzala Foodkraft
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-indigo-300 font-sans font-semibold">
                    tripClogix
                  </span>
                </div>
              </div>

              {/* Admin CMS Access Link */}
              <div className="pt-2">
                <button
                  onClick={onOpenAdminCMS}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 text-slate-400 hover:text-amber-300 transition-colors text-[11px] flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Hotel CMS & Admin Panel</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright, Back to top & VYUVIK LABS Signature */}
        <div className="pt-8 border-t border-slate-900/90 flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} {hotelInfo.name} Mussoorie. All Rights Reserved. Rezzala is a Registered Trademark of Rezzala Foodkraft.
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* REQUIREMENT 6: "Designed With Love By VYUVIK LABS" Centered in unique, distinctive style */}
          <div className="flex justify-center items-center pt-2">
            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 shadow-lg shadow-amber-950/20 hover:border-amber-400/60 transition-all group">
              <span className="text-xs font-sans tracking-wide text-slate-300 group-hover:text-slate-100 transition-colors flex items-center gap-2">
                <span>Designed With</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                <span>By</span>
                <span className="font-serif font-black tracking-widest bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all">
                  VYUVIK LABS
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
