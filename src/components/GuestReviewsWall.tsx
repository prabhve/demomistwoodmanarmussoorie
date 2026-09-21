import { Star, CheckCircle2, Users, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useCMS } from '../context/CMSContext';

export const GuestReviewsWall = () => {
  const { data } = useCMS();
  const { hotelInfo, guestReviews } = data;
  const reviews = guestReviews || [];


  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#090d14] border-t border-slate-900 relative">
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
            <Users className="w-3.5 h-3.5" />
            <span>Guest Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Loved by Couples, Families & <br />
            <span className="text-amber-400">Nature Enthusiasts</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Read what our esteemed guests have to say about their memorable stays, peaceful Happy Valley mornings, and attentive hospitality at {hotelInfo.name}.
          </p>
        </motion.div>

        {/* Rating Scorecard Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 flex flex-wrap items-center justify-between gap-6 mb-12 shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex flex-col items-center justify-center text-amber-400">
              <span className="text-2xl font-serif font-bold leading-none">{hotelInfo.starRating || 4.8}</span>
              <span className="text-[10px] font-sans font-semibold mt-0.5">OUT OF 5</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="text-lg font-bold text-white font-serif mt-1">Superb Guest Rating</h3>
              <p className="text-xs text-slate-400">Based on {hotelInfo.reviewCount || 240}+ verified traveler reviews</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Stays</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Clean & Sanitized Rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>24x7 Manager on Duty</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{review.date}</span>
                </div>

                <div className="text-xs font-bold text-amber-300">"{review.highlight}"</div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{review.guestName}</div>
                  <div className="text-[11px] text-slate-400">{review.city} • {review.tripType}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Stay</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Happy Guests Wall Banner with Group Photo Memories */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Happy Guests of {hotelInfo.name}</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            "Our greatest achievement is the appreciation and good wishes of our guests."
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            From families celebrating holidays to couples unwinding amidst pine trees, we express our heartfelt gratitude to all our guests for choosing {hotelInfo.name} Mussoorie.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span>Find us on Google Maps & TripAdvisor</span>
            <span>•</span>
            <span className="text-amber-400">{hotelInfo.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
