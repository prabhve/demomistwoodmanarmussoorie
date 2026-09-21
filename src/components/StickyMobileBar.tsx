import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar = ({ onOpenBooking }: StickyMobileBarProps) => {
  const { data } = useCMS();
  const { hotelInfo, packages } = data;
  const minPrice = packages[0]?.basePrice || 2700;

  return (
    <aside aria-label="Quick Booking" className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <div>
          <div className="text-[10px] text-slate-400">Super Deluxe from</div>
          <div className="text-sm font-bold text-amber-400 font-serif leading-none">
            ₹{minPrice.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-sans font-normal">/ night</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${hotelInfo.phone1Clean}`}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white"
            title="Call Front Desk"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
          </a>

          <a
            href={`https://wa.me/${hotelInfo.phone1Clean}?text=Hello%20${encodeURIComponent(hotelInfo.name)},%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-emerald-400"
            title="WhatsApp Hotel Directly"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer transition-transform active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
