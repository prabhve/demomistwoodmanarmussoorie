import { Sparkles, Shield, Clock, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

const getIconComponent = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'shield':
      return Shield;
    case 'clock':
      return Clock;
    case 'hearthandshake':
    case 'heart':
      return HeartHandshake;
    case 'sparkles':
    default:
      return Sparkles;
  }
};

export const DirectBookingPerks = ({ onBookNow }: { onBookNow: () => void }) => {
  const { data } = useCMS();
  const { hotelInfo, directPerks } = data;

  return (
    <section className="py-14 bg-gradient-to-b from-slate-900 to-[#0b0f17] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10 space-y-2"
        >
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Direct Advantage
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Why Book Directly with {hotelInfo.name}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light">
            Skip OTA platform commissions and enjoy personalized hospitality, guaranteed best prices, and exclusive benefits.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {directPerks.map((perk, i) => {
            const Icon = getIconComponent(perk.icon);
            return (
              <div
                key={perk.id || i}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/30 transition-all space-y-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-serif">{perk.title}</h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">{perk.desc}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
