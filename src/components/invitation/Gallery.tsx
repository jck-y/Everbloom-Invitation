import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, Download, X } from "lucide-react";

const Gallery = () => {
  const photos: string[] = [
    "/images/images1.webp",
    "/images/images2.webp",
    "/images/images3.webp",
    "/images/images4.webp",
    "/images/images5.webp",
    "/images/images6.webp",
    "/images/images7.webp",
    "/images/images8.webp",
  ];
  // ==============================

  const displayPhotos = photos.length > 0 ? photos : Array(3).fill(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const thumbsRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = displayPhotos[activeIndex];
    if (!url) return;

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `foto-${activeIndex + 1}.png`;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      // fallback jika fetch gagal
      const a = document.createElement("a");
      a.href = url;
      a.download = `foto-${activeIndex + 1}.png`;
      a.click();
    }
  };

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

        {/* Preview Besar */}
        <motion.div
          className="relative mx-auto mb-3 rounded-2xl overflow-hidden border border-border cursor-zoom-in group"
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
                fetchPriority="high"
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

          {/* Ikon Expand di pojok kanan bawah */}
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white rounded-lg p-1.5 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Expand size={16} />
          </div>
        </motion.div>

        {/* Thumbnail Strip */}
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
                  loading="lazy"
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

            {/* Tombol Tutup */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition"
              onClick={(e) => { e.stopPropagation(); setFullscreen(false); }}
            >
              <X size={18} />
            </button>

            {/* Tombol Download */}
            <button
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-sm border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
              onClick={handleDownload}
            >
              <Download size={16} />
              Download Foto
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;