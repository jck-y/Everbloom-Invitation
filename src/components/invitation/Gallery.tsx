import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const photos: string[] = [
    "/images/images1.png",
    "/images/images2.png",
    "/images/images3.png",
    "/images/images4.png",
    "/images/images5.png",
    "/images/images6.png",
    "/images/images7.png",
    "/images/images8.png",
  ];
  // ==============================

  const displayPhotos = photos.length > 0 ? photos : Array(3).fill(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 px-6 bg-floral-pattern">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold text-gradient-gold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GALLERY
        </motion.h2>
        <motion.p
          className="text-sm text-muted-foreground text-center mb-8 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Beautiful Memories Together
        </motion.p>

        {/* Preview Besar — full tanpa crop */}
        <motion.div
          className="relative mx-auto mb-3 rounded-2xl overflow-hidden border border-border cursor-zoom-in"
          style={{ maxWidth: "420px" }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onClick={() => displayPhotos[activeIndex] && setFullscreen(true)}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {displayPhotos[activeIndex] ? (
              <motion.img
                key={activeIndex}
                src={displayPhotos[activeIndex]}
                alt={`Preview ${activeIndex + 1}`}
                className="w-full h-auto object-contain block"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
              />
            ) : (
              <div className="w-full py-24 flex items-center justify-center text-muted-foreground/30">
                <span className="text-sm">Foto {activeIndex + 1}</span>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Thumbnail Strip — 1:1 square, boleh crop */}
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
        >
          {displayPhotos.map((photo, i) => (
            <motion.div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-24 sm:w-28 aspect-square overflow-hidden rounded-xl border-2 snap-start cursor-pointer transition-all duration-200
                ${i === activeIndex
                  ? "border-amber-600 opacity-100 scale-100"
                  : "border-border opacity-60 scale-95 hover:opacity-80"
                }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: i === activeIndex ? 1 : 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.94 }}
            >
              {photo ? (
                <img
                  src={photo}
                  alt={`Thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground/30">{i + 1}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
          >
            <motion.img
              src={displayPhotos[activeIndex] ?? ""}
              alt="Fullscreen"
              className="max-w-[92vw] max-h-[92vh] object-contain rounded-xl"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            />
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white text-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition"
              onClick={() => setFullscreen(false)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;