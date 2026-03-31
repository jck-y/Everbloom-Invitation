const VideoBackground = () => {
  // ===== EDIT VIDEO DI SINI =====
  const videoSrc = "/bg.mp4";
  // ===== ATUR TINGKAT BLUR DI SINI (dalam pixel) =====
  const blurAmount = 3; 

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{ filter: `blur(${blurAmount}px)`, transform: 'translate(-50%, -50%) scale(1.1)' }}
        src={videoSrc}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default VideoBackground;
