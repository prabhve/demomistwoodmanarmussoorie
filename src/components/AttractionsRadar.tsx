import { useState } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Car,
  Footprints,
  Clock,
  ExternalLink,
  Mountain,
  Building,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

export const AttractionsRadar = () => {
  const { data } = useCMS();
  const { hotelInfo, nearbyAttractions } = data;
  const [activeFilter, setActiveFilter] = useState<'all' | 'walking' | 'short_drive' | 'day_trip'>('all');

  const filteredAttractions =
    activeFilter === 'all'
      ? nearbyAttractions
      : nearbyAttractions.filter((a) => a.type === activeFilter);

  return (
    <section id="location" className="py-16 sm:py-20 bg-[#0a0e16] border-t border-slate-900 relative">
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
            <Compass className="w-3.5 h-3.5" />
            <span>Prime Happy Valley Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Centrally Located Near <br />
            <span className="text-amber-400">Mussoorie’s Iconic Wonders</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Stay in the serene Tibetan cultural haven of Happy Valley. Enjoy clean mountain air and pine forests without the noise and traffic of central Mall Road, while being just minutes away from all major sights.
          </p>
        </motion.div>

        {/* Location Highlights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Footprints className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Buddha Temple</div>
              <div className="text-sm font-bold text-white">100 Mtrs (1 Min Walk)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Dalai Hills Sunset</div>
              <div className="text-sm font-bold text-white">150 Mtrs (2 Min Walk)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">LBSNAA Academy Gate</div>
              <div className="text-sm font-bold text-white">500 Mtrs (6 Min Walk)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">The Mall Road</div>
              <div className="text-sm font-bold text-white">1.4 Kms (5 Min Drive)</div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Destinations ({nearbyAttractions.length})
          </button>
          <button
            onClick={() => setActiveFilter('walking')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'walking'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            Walking Distance (&lt; 500m)
          </button>
          <button
            onClick={() => setActiveFilter('short_drive')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'short_drive'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            Short Drive (1 - 5 Kms)
          </button>
          <button
            onClick={() => setActiveFilter('day_trip')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeFilter === 'day_trip'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            Day Excursions & Transit
          </button>
        </div>

        {/* Attractions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAttractions.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-500/30">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400 bg-slate-950/80 px-2 py-1 rounded-md">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-md text-slate-300 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.travelTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {item.type === 'walking' ? '🚶 Casual Stroll' : item.type === 'short_drive' ? '🚗 Quick Cab / Drive' : '🚌 Scenic Tour'}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(item.name + ' Mussoorie')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Address & Google Maps Direction Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Physical Location & Directions
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {hotelInfo.name}, {hotelInfo.locationArea}, Mussoorie
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              {hotelInfo.address}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://maps.google.com/?q=Mistwood+Manor+Happy+Valley+Mussoorie"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Get GPS Directions</span>
            </a>

            <a
              href={`tel:${hotelInfo.phone1Clean}`}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <span>Call for Route Assistance</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
