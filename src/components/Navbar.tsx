import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar, Menu, X, Star, MapPin, Lock } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar = ({ onOpenBooking }: NavbarProps) => {
  const { data } = useCMS();
  const { hotelInfo, announcementText, packages } = data;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Rooms & Rates', href: '#rooms' },
    { label: 'Packages', href: '#packages' },
    { label: 'Location', href: '#location' },
    { label: 'Rezzala Dining', href: '#dining' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Mussoorie Guide', href: '#itinerary' },
    { label: 'Contact', href: '#contact' },
  ];

  const minPrice = packages[0]?.basePrice || 2700;

  return (
    <header className="sticky top-0 z-40 w-full overflow-x-hidden">
      {/* Top Banner with Quick Contact & Best Price Guarantee */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 text-xs text-amber-200/90 border-b border-amber-900/30 py-1 sm:py-1.5 px-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 min-w-0">
          {/* Left: Announcement / Location */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 text-[10.5px] sm:text-xs overflow-hidden">
            <span className="flex items-center gap-1.5 font-medium text-amber-300 min-w-0 truncate">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="truncate">{announcementText}</span>
            </span>
            <span className="hidden xl:inline-flex items-center gap-1 text-slate-400 border-l border-slate-700 pl-3 shrink-0">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              Happy Valley, 100m to Buddha Temple
            </span>
          </div>

          {/* Right: Direct Hotlines */}
          <div className="flex items-center gap-2 sm:gap-3.5 text-[10.5px] sm:text-xs shrink-0 ml-auto">
            <a
              href={`tel:${hotelInfo.phone1Clean}`}
              className="flex items-center gap-1 hover:text-white transition-colors whitespace-nowrap"
              title="Call Front Desk"
            >
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Call:</span>
              <strong className="text-white font-semibold">{hotelInfo.phone1}</strong>
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <a
              href={`https://wa.me/${hotelInfo.phone1Clean}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20would%20like%20to%20inquire%20about%20room%20availability.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-md shadow-2xl border-b border-slate-800/90 py-1.5 sm:py-2.5'
            : 'bg-slate-950/90 backdrop-blur-sm border-b border-slate-800/50 py-2 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-5 lg:px-6 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Logo & Emblem */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group min-w-0 shrink">
            <div className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border border-amber-500/80 bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center text-white font-serif font-bold text-xs sm:text-base shadow-md shadow-amber-950/50 group-hover:scale-105 transition-transform shrink-0">
              <span className="tracking-tighter">M<span className="text-amber-300 text-[8.5px] sm:text-xs">M</span></span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-base lg:text-lg font-serif font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors leading-tight truncate">
                {hotelInfo.name.toUpperCase()}
              </span>
              <span className="text-[7.5px] sm:text-[9.5px] font-sans tracking-[0.12em] sm:tracking-[0.18em] uppercase text-amber-400/90 font-medium leading-none mt-0.5 truncate">
                {hotelInfo.locationArea} • Mussoorie
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Visible on xl / 1200px+ screens with compact typography) */}
          <div className="hidden xl:flex items-center gap-4 2xl:gap-6 text-[13px] font-medium text-slate-300 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* WhatsApp button on medium/large desktop */}
            <a
              href={`https://wa.me/${hotelInfo.phone1Clean}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20am%20interested%20in%20reserving%20a%20Super%20Deluxe%20room.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/40 transition-colors text-xs font-semibold whitespace-nowrap shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Main Book Online Button (without price tag beside it) */}
            <button
              onClick={onOpenBooking}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-md shadow-amber-950/40 hover:shadow-amber-500/30 transition-all flex items-center gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap cursor-pointer transform active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span className="hidden sm:inline">Book Online</span>
              <span className="sm:hidden">Book Now</span>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-3">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-900 hover:text-amber-400 font-medium text-sm flex items-center justify-between transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-slate-500 text-xs">→</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <a
                href={`tel:${hotelInfo.phone1Clean}`}
                className="w-full py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                Call Desk
              </a>
              <a
                href={`https://wa.me/${hotelInfo.phone1Clean}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20am%20looking%20for%20room%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg border border-emerald-600/40 bg-emerald-950/40 text-emerald-300 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Availability & Book</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

