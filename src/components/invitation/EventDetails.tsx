import { motion } from "framer-motion";
import { Clock, Calendar, MapPin, Navigation } from "lucide-react";

const EventDetails = () => {
  // ===== EDIT DETAIL ACARA DI SINI =====
  const time = "15:00 WITA - Done";
  const date = "26 May 2025";
  const location = "Hotel Aston";
  const address = "Jl. Pangeran Hidayatullah, Pelabuhan, Kec. Samarinda Kota, Kota Samarinda, Kalimantan Timur 75242";
  const mapsUrl = "https://maps.google.com/?q=-0.5024684,117.1548013"; 
  // =====================================

  const items = [
    { icon: Clock, label: "Waktu", value: time },
    { icon: Calendar, label: "Tanggal", value: date },
    { icon: MapPin, label: "Lokasi", value: location },
  ];

  return (
    <section className="py-20 px-6 bg-floral-pattern">
      <div className="max-w-lg mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Event Details
        </motion.h2>

        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-5 bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-foreground font-display text-lg">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-sm text-muted-foreground text-center mt-4 text-[#fdfdfd] italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {address}
        </motion.p>

        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-teal text-foreground font-display tracking-wider hover:brightness-110 transition-all shadow-lg shadow-teal/20"
          >
            <Navigation className="w-4 h-4" />
            Location Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default EventDetails;
