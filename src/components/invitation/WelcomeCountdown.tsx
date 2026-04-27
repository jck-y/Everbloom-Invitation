import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const WelcomeCountdown = () => {
  const welcomeTitle = "WE INVITE YOU";
  const welcomeText = "Graduation Ceremony for the Class of 2026 Citra Kasih Senior High School Samarinda";
  const eventDate = new Date("2026-05-26T15:00:00");

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showScrollHint, setShowScrollHint] = useState(true);

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

  // Sembunyikan saat section Messages & Prayers mulai masuk viewport
  useEffect(() => {
    const handleScroll = () => {
      const messagesSection = document.getElementById("messages");
      if (!messagesSection) return;

      const rect = messagesSection.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        setShowScrollHint(false);
      } else {
        setShowScrollHint(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const timeUnits = [
    { label: "Day", value: timeLeft.days },
    { label: "Hour", value: timeLeft.hours },
    { label: "Minute", value: timeLeft.minutes },
    { label: "Second", value: timeLeft.seconds },
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
        className="text-5xl sm:text-6xl md:text-7xl leading-[1.3] font-heading font-bold text-gradient-gold text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {welcomeTitle}
      </motion.h2>

      <motion.p
        className="text-base sm:text-lg text-muted-foreground text-center max-w-lg mb-14 font-medium font-body text-[#fdfdfd] italic"
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

      {/* Scroll Down Hint — fixed di tengah bawah layar */}
      <motion.div
        className="fixed bottom-8 inset-x-0 flex items-center justify-center cursor-pointer z-40 pointer-events-none"
        animate={{
          opacity: showScrollHint ? 1 : 0,
          y: showScrollHint ? 0 : 16,
          pointerEvents: showScrollHint ? "auto" : "none",
        }}
        transition={{ duration: 0.4 }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      >
        <motion.div
          className="flex items-center gap-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 pointer-events-auto"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Panah kiri */}
          <div className="flex flex-col items-center -space-y-2">
            <ChevronDown className="w-3 h-3 text-accent" />
            <ChevronDown className="w-3 h-3 text-accent" />
          </div>

          <span className="text-white/80 text-xs tracking-[0.2em] uppercase font-body">
            Scroll Down
          </span>

          {/* Panah kanan */}
          <div className="flex flex-col items-center -space-y-2">
            <ChevronDown className="w-3 h-3 text-accent" />
            <ChevronDown className="w-3 h-3 text-accent" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WelcomeCountdown;