import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { RSVPEntry } from "./RSVPForm";

interface WishesSliderProps {
  wishes: RSVPEntry[];
}

const WishesSlider = ({ wishes }: WishesSliderProps) => {
  const [current, setCurrent] = useState(0);
  const filteredWishes = wishes.filter((w) => w.ucapan.trim().length > 0);

  useEffect(() => {
    if (filteredWishes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % filteredWishes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredWishes.length]);

  if (filteredWishes.length === 0) {
    return (
      <section className="py-20 px-6 bg-floral-pattern">
        <div className="max-w-lg mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ucapan & Doa
          </motion.h2>
          <p className="text-muted-foreground italic font-body">
            Belum ada ucapan. Jadilah yang pertama mengirim ucapan melalui RSVP di atas! ✨
          </p>
        </div>
      </section>
    );
  }

  const goNext = () => setCurrent((prev) => (prev + 1) % filteredWishes.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + filteredWishes.length) % filteredWishes.length);

  return (
    <section className="py-20 px-6 bg-floral-pattern">
      <div className="max-w-lg mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ucapan & Doa
        </motion.h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <Quote className="w-6 h-6 text-accent/40 mx-auto mb-4" />
              <p className="text-foreground font-body text-lg italic mb-4 leading-relaxed">
                "{filteredWishes[current].ucapan}"
              </p>
              <p className="text-accent font-display text-sm tracking-wider">
                — {filteredWishes[current].nama}
              </p>
            </motion.div>
          </AnimatePresence>

          {filteredWishes.length > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <button onClick={goPrev} className="p-2 rounded-full bg-card/60 border border-border text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-muted-foreground font-body">
                {current + 1} / {filteredWishes.length}
              </span>
              <button onClick={goNext} className="p-2 rounded-full bg-card/60 border border-border text-muted-foreground hover:text-foreground transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-xs text-muted-foreground/60 tracking-[0.3em] uppercase font-body">
            Everbloom Boldly Forward
          </p>
          <p className="text-xs text-muted-foreground/40 mt-2 font-body">
            Penamatan Kelas XII • 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WishesSlider;
