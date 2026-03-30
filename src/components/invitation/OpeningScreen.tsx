import { motion } from "framer-motion";

interface OpeningScreenProps {
  onOpen: () => void;
}

const OpeningScreen = ({ onOpen }: OpeningScreenProps) => {
  // ===== EDIT TEKS DI SINI =====
  const title = "Penamatan Kelas XII";
  const greeting = "Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dalam acara penamatan kami";
  // ==============================

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background bg-floral-pattern px-6"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Decorative top ornament */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />

      <motion.p
        className="text-sm tracking-[0.35em] uppercase text-rose mb-4 font-body"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Everbloom Boldly Forward
      </motion.p>

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gradient-gold text-center mb-6 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {title}
      </motion.h1>

      <motion.div
        className="w-16 h-[1px] bg-gradient-to-r from-transparent via-rose to-transparent mb-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      <motion.p
        className="text-base sm:text-lg text-muted-foreground text-center max-w-md mb-10 font-body italic"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        {greeting}
      </motion.p>

      <motion.button
        onClick={onOpen}
        className="relative px-10 py-4 rounded-full font-display text-lg tracking-wider text-accent-foreground bg-accent hover:brightness-110 transition-all duration-300 shadow-lg shadow-accent/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Buka Undangan
      </motion.button>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-gold/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </motion.div>
  );
};

export default OpeningScreen;
