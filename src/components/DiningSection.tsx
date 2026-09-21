import { useState } from 'react';
import { UtensilsCrossed, Award, Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

interface DiningSectionProps {
  onSelectMapPackage: () => void;
}

export const DiningSection = ({ onSelectMapPackage }: DiningSectionProps) => {
  const { data } = useCMS();
  const { menuSpecials, packages, diningInfo } = data;
  const [activeCategory, setActiveCategory] = useState<'all' | 'indian_mains' | 'chinese' | 'breakfast'>('all');

  const mapPackage = packages.find((p) => p.id === 'package_02') || packages[1] || packages[0];

  const filteredMenu =
    activeCategory === 'all'
      ? menuSpecials
      : menuSpecials.filter((item) => item.category === activeCategory);

  return (
    <section id="dining" className="py-16 sm:py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>{diningInfo?.tagline || 'In-House Culinary Excellence'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            {diningInfo?.title || 'Multicuisine In-House Restaurant'} <br />
            <span className="text-amber-400">In Association with {diningInfo?.partnerName || 'Rezzala'}</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {diningInfo?.description || 'Savor meticulously prepared North Indian delights, savory Tandoori specialties, and wok-tossed authentic Chinese dishes crafted fresh by experienced chefs using quality mountain ingredients.'}
          </p>
        </motion.div>

        {/* Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 p-6 sm:p-8 mb-12 shadow-2xl"
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Partner: {diningInfo?.partnerName || 'Rezzala Foodkraft'} ({diningInfo?.partnerRole || 'Official In-House Dining Partner'})</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {diningInfo?.subtitle || 'Piping Hot Dining with Panoramic Hill Views'}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              {diningInfo?.operatingHours ? `Timings: ${diningInfo.operatingHours} • ` : ''}Whether you wish to dine in our warm ambient restaurant hall or enjoy private room service in the comfort of your Super Deluxe room, Rezzala brings culinary perfection to your hill holiday.
            </p>


            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Rich Indian & Mughlai Curries</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tibetan & Indo-Chinese Wok</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fresh Parathas & Masala Chai</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Prompt In-Room Dining Service</span>
              </div>
            </div>

            {/* MAP Package Promo Callout */}
            <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-amber-300">Smart Traveler Tip (Save on Food):</div>
                <div className="text-xs text-slate-300">
                  Book <strong>Package 02 (MAP)</strong> for both Breakfast & Dinner included at just <strong>₹{mapPackage.basePrice.toLocaleString('en-IN')}/night</strong>!
                </div>
              </div>
              <button
                onClick={onSelectMapPackage}
                className="shrink-0 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer transition-all transform active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book MAP Package</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden aspect-square border border-slate-800 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
                alt="Delicious Indian Curries and Biryani"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square border border-slate-800 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80"
                alt="Wok Chinese Hakka Noodles"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </motion.div>

        {/* Menu Highlights List */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-serif font-bold text-white">Popular Chef Specials</h3>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setActiveCategory('indian_mains')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeCategory === 'indian_mains'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Indian Mains
              </button>
              <button
                onClick={() => setActiveCategory('chinese')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeCategory === 'chinese'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Chinese & Tibetan
              </button>
              <button
                onClick={() => setActiveCategory('breakfast')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeCategory === 'breakfast'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                Breakfast Spread
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredMenu.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-block w-3 h-3 rounded-sm border ${
                        item.isVeg ? 'border-emerald-500 bg-emerald-500/20' : 'border-rose-500 bg-rose-500/20'
                      } relative`}
                    >
                      <span
                        className={`absolute inset-0.5 rounded-full ${
                          item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      />
                    </span>
                    {item.tag && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif">{item.name}</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-amber-400 font-medium">
                  Prepared fresh to order by Rezzala chefs
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
