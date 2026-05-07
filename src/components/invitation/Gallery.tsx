import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, Download, X } from "lucide-react";

const Gallery = () => {
  const photos = [
    { preview: "/images/images9.webp", original: "/images/images9.png" },
    // { preview: "/images/images1.webp", original: "/images/images1.png" },
    { preview: "/images/images2.webp", original: "/images/images2.png" },
    { preview: "/images/images3.webp", original: "/images/images3.png" },
    { preview: "/images/images4.webp", original: "/images/images4.png" },
    { preview: "/images/images5.webp", original: "/images/images5.png" },
    { preview: "/images/images6.webp", original: "/images/images6.png" },
    { preview: "/images/images7.webp", original: "/images/images7.png" },
    { preview: "/images/images8.webp", original: "/images/images8.png" },
  ];

  const displayPhotos = photos.length > 0 ? photos : Array(3).fill(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullResLoaded, setFullResLoaded] = useState<Record<number, boolean>>({});
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set([0]));

  const handleThumbClick = (i: number) => {
    setActiveIndex(i);
    setLoadedIndexes(prev => new Set([...prev, i, Math.min(i + 1, photos.length - 1)]));
  };

  const thumbsRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const photo = displayPhotos[activeIndex];
    if (!photo) return;

    const url = photo.original;

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
      const a = document.createElement("a");
      a.href = url;
      a.download = `foto-${activeIndex + 1}.png`;
      a.click();
    }
  };

  return (
    <section className="py-20 px-6 bg-floral-pattern">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold text-gradient-gold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          GALLERY
        </motion.h2>

        {/* Subtitle — lebih bold dan jelas */}
        <motion.p
          className="text-base sm:text-lg font-semibold text-foreground/80 text-center mb-8 italic tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2 }}
        >
          Beautiful Memories Together
        </motion.p>

        {/* Preview Besar — responsif di layar lebar */}
        <div
          className="relative mx-auto mb-3 rounded-2xl overflow-hidden border border-border cursor-zoom-in group w-full sm:max-w-[520px] md:max-w-[680px] lg:max-w-[820px]"
          style={{ minHeight: "200px" }}
          onClick={() => displayPhotos[activeIndex] && setFullscreen(true)}
        >
          {displayPhotos.map((photo, i) =>
            photo ? (
              <img
                key={i}
                src={loadedIndexes.has(i) ? photo.preview : undefined}
                alt={`Preview ${i + 1}`}
                className={`w-full h-auto object-contain block transition-opacity duration-300 ${
                  i === activeIndex
                    ? "opacity-100 relative"
                    : "opacity-0 absolute inset-0 pointer-events-none"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
              />
            ) : null
          )}

          {/* Ikon Expand */}
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white rounded-lg p-1.5 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Expand size={16} />
          </div>
        </div>

        {/* Thumbnail Strip — lebih besar di desktop */}
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
          style={{ touchAction: "pan-x" }}
        >
          {displayPhotos.map((photo, i) => (
            <div
              key={i}
              onClick={() => handleThumbClick(i)}
              className={`relative flex-shrink-0 w-24 sm:w-28 md:w-32 lg:w-36 aspect-square overflow-hidden rounded-xl border-2 snap-start cursor-pointer transition-all duration-200 ${
                i === activeIndex
                  ? "border-amber-600 opacity-100 scale-100"
                  : "border-border opacity-60 scale-95 hover:opacity-80"
              }`}
            >
              {photo ? (
                <img
                  src={photo.preview}
                  alt={`Thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground/30">{i + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen — progressive: preview dulu → original setelah load */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
          >
            {/* Wrapper relatif agar dua gambar bisa overlap */}
            <div className="relative max-w-[92vw] max-h-[92vh]">

              {/* Layer 1: Preview kecil — tampil duluan sebagai placeholder */}
              <motion.img
                src={displayPhotos[activeIndex]?.preview ?? ""}
                alt="Preview"
                className={`w-full h-full object-contain rounded-xl transition-opacity duration-300 ${
                  fullResLoaded[activeIndex] ? "opacity-0" : "opacity-100"
                }`}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: fullResLoaded[activeIndex] ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
              />

              {/* Layer 2: Original kualitas penuh — fade in setelah load */}
              <img
                src={displayPhotos[activeIndex]?.original ?? ""}
                alt="Fullscreen Original"
                className={`absolute inset-0 w-full h-full object-contain rounded-xl transition-opacity duration-500 ${
                  fullResLoaded[activeIndex] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() =>
                  setFullResLoaded(prev => ({ ...prev, [activeIndex]: true }))
                }
              />

              {/* Loading indicator */}
              {!fullResLoaded[activeIndex] && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/60 text-xs">
                  <div className="w-3 h-3 rounded-full border border-white/40 border-t-transparent animate-spin" />
                  Loading full quality...
                </div>
              )}
            </div>

            {/* Tombol Tutup */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 hover:bg-white/20 transition"
              onClick={(e) => { e.stopPropagation(); setFullscreen(false); }}
            >
              <X size={18} />
            </button>

            {/* Tombol Download */}
          <button
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full text-black text-sm border active:scale-95 transition-all"
            style={{ backgroundColor: "#ffb347", borderColor: "#ffb347" }}
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