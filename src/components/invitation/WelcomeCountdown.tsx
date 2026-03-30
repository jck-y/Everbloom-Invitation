import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WelcomeCountdown = () => {
  // ===== EDIT TEKS DAN TANGGAL DI SINI =====
  const welcomeTitle = "Selamat Datang di Momen Istimewa Kami";
  const welcomeText = "Mari bersama merayakan pencapaian dan langkah baru menuju masa depan yang gemilang";
  const eventDate = new Date("2025-07-15T09:00:00"); // Ganti tanggal acara di sini
  // ==========================================

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-floral-pattern relative">
      <motion.div
        className="w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-8"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient-gold text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {welcomeTitle}
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg text-muted-foreground text-center max-w-lg mb-14 font-body italic"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {welcomeText}
      </motion.p>

      {/* Countdown */}
      <motion.div
        className="flex gap-4 sm:gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center bg-card/60 backdrop-blur-sm border border-border rounded-2xl px-4 sm:px-6 py-4 sm:py-5 min-w-[70px] sm:min-w-[90px]"
          >
            <span className="text-2xl sm:text-4xl font-display font-bold text-accent">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground mt-1 tracking-wider uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default WelcomeCountdown;
