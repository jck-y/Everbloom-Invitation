import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningScreen from "@/components/invitation/OpeningScreen";
import WelcomeCountdown from "@/components/invitation/WelcomeCountdown";
import EventDetails from "@/components/invitation/EventDetails";
import Gallery from "@/components/invitation/Gallery";
import DressCodeAgenda from "@/components/invitation/DressCodeAgenda";
import RSVPForm from "@/components/invitation/RSVPForm";
import WishesSlider from "@/components/invitation/WishesSlider";
import VideoBackground from "@/components/invitation/VideoBackground";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import type { RSVPEntry } from "@/components/invitation/RSVPForm";

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [wishes, setWishes] = useState<RSVPEntry[]>([]);

  const handleOpen = () => setIsOpened(true);

  const handleRSVP = (entry: RSVPEntry) => {
    setWishes((prev) => [...prev, entry]);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <VideoBackground />
      <MusicPlayer/>
      <AnimatePresence>
        {!isOpened && <OpeningScreen onOpen={handleOpen} />}
      </AnimatePresence>

      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <WelcomeCountdown />
          <EventDetails />
          <Gallery />
          <DressCodeAgenda />
          <RSVPForm onSubmit={handleRSVP} />
          <WishesSlider wishes={wishes} />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
