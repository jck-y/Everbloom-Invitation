import { motion } from "framer-motion";

const Gallery = () => {
  // ===== EDIT FOTO DI SINI =====
  // Tambahkan URL foto ke array ini. Bisa ditambah/dikurangi sesuai kebutuhan.
  const photos: string[] = [
    // "/images/foto1.jpg",
    // "/images/foto2.jpg",
    // "/images/foto3.jpg",
    // "/images/foto4.jpg",
    // "/images/foto5.jpg",
    // "/images/foto6.jpg",
  ];
  // ==============================

  // Placeholder jika belum ada foto
  const displayPhotos = photos.length > 0
    ? photos
    : Array(6).fill(null);

  return (
    <section className="py-20 px-6 bg-floral-pattern">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold text-gradient-gold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GALLERY
        </motion.h2>
        <motion.p
          className="text-sm text-muted-foreground text-center mb-12 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Kenangan indah bersama
        </motion.p>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          {displayPhotos.map((photo, i) => (
            <motion.div
              key={i}
              className="relative flex-shrink-0 w-56 sm:w-64 overflow-hidden rounded-2xl border border-border snap-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="aspect-[3/4] bg-card/60 backdrop-blur-sm flex items-center justify-center">
                {photo ? (
                  <img
                    src={photo}
                    alt={`Foto ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/20" />
                    <span className="text-xs">Foto {i + 1}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
