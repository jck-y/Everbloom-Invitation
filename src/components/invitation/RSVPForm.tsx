import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

export interface RSVPEntry {
  nama: string;
  ucapan: string;
  kehadiran: string;
  jumlahTamu: number; 
  timestamp: string;
}

interface RSVPFormProps {
  onSubmit: (entry: RSVPEntry) => void;
}

const RSVPForm = ({ onSubmit }: RSVPFormProps) => {
  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [kehadiran, setKehadiran] = useState("Hadir");
  const [jumlahTamu, setJumlahTamu] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!nama.trim()) return;

  setIsSubmitting(true);

  const entry: RSVPEntry = {
    nama: nama.trim(),
    ucapan: ucapan.trim(),
    kehadiran,
    jumlahTamu,
    timestamp: new Date().toISOString(),
  };

  try {
    const formData = new URLSearchParams();
    formData.append("data", JSON.stringify(entry));

    await fetch("https://script.google.com/macros/s/AKfycbxRnY-8EXgYPAI2BIjwlpoHrmsFUQSdEvefysNOlmgNUarG2cJBUWs1LDVlEG5ySKJH/exec", {
      method: "POST",
      body: formData,
    });

    onSubmit(entry);
    setSubmitted(true);
  } catch (error) {
    console.error("Gagal kirim:", error);
  } finally {
    setIsSubmitting(false);
  }

  setNama("");
  setUcapan("");
  setKehadiran("Hadir");
  setJumlahTamu(1);
  setTimeout(() => setSubmitted(false), 3000);
};

  return (
    <section className="py-20 px-6 bg-floral-pattern">
      <div className="max-w-lg mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-heading font-bold text-gradient-gold text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          RSVP
        </motion.h2>
        <motion.p
          className="text-sm text-muted-foreground text-center mb-10 italic text-[#fdfdfd] "
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          
        >
          Confirm your attendance & send your message
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-display tracking-wider">Name</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              className="w-full bg-card/60 backdrop-blur-sm border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              placeholder="Input Your Name Here"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-display tracking-wider">Message</label>
            <textarea
              value={ucapan}
              onChange={(e) => setUcapan(e.target.value)}
              rows={3}
              className="w-full bg-card/60 backdrop-blur-sm border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
              placeholder="Write your message..."
            />
          </div>
          <div>
  <label className="block text-sm text-muted-foreground mb-2 font-display tracking-wider">
    Number of Guests
  </label>
  <input
    type="number"
    min="1"
    value={jumlahTamu}
    onChange={(e) => setJumlahTamu(Number(e.target.value))}
    className="w-full bg-card/60 backdrop-blur-sm border border-border rounded-xl px-4 py-3 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
  />
</div>
          <div>
            <label className="block text-sm text-muted-foreground mb-2 font-display tracking-wider">Presence</label>
            <select
              value={kehadiran}
              onChange={(e) => setKehadiran(e.target.value)}
              className="w-full bg-card/60 backdrop-blur-sm border border-border rounded-xl px-4 py-3 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer"
            >
              <option value="Hadir">Presence</option>
              <option value="Tidak Hadir">Absent</option>
            </select>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || !nama.trim()}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-display text-lg tracking-wider hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Sending..." : "Send RSVP"}
          </motion.button>

          {submitted && (
            <motion.p
              className="text-center text-accent text-sm font-body"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✨ Thank you! Your RSVP has been sent.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPForm;
