import { motion } from "framer-motion";
import { Shirt, ListChecks } from "lucide-react";

const DressCodeAgenda = () => {
  // ===== EDIT DRESSCODE DI SINI =====
  const dressCode = "Formal / Semi-Formal";
  // ==================================

  // ===== EDIT RANGKAIAN ACARA DI SINI =====
  const agenda = [
    { time: "", activity: "Opening & Prayer" },
    { time: "", activity: "Welcome Remarks" },
    { time: "", activity: "Student Performances" },
    { time: "", activity: "Graduation Ceremony" },
    { time: "", activity: "Awards for Students & Teachers" },
    { time: "", activity: "Group Photo" },
    { time: "", activity: "Reception & Dinner" },
  ];
  // ========================================

  return (
    <section className="py-20 px-6 bg-floral-pattern">
      <div className="max-w-lg mx-auto space-y-16">
        {/* Dress Code */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-5">
            <Shirt className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold mb-4">
            Event Schedule
          </h2>
          <p className="text-xl font-display text-foreground mb-2">{dressCode}</p>
        </motion.div>

        {/* Rangkaian Acara */}
        <div>
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ListChecks className="w-5 h-5 text-accent" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold">
              Event Schedule
            </h2>
          </motion.div>

          <div className="space-y-0">
            {agenda.map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-4 items-start relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                  {i < agenda.length - 1 && (
                    <div className="w-[1px] h-full bg-border min-h-[40px]" />
                  )}
                </div>
                <div className="pb-6">
                  <span className="text-sm text-accent font-display font-semibold">{item.time}</span>
                  <p className="text-foreground font-body">{item.activity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressCodeAgenda;
