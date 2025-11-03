import { motion } from 'framer-motion';

export default function RoomScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-yellow-900/20" />

      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255, 200, 120, 0.15) 0%, transparent 50%)`,
      }} />

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-amber-950/30 to-transparent" />

      <motion.div
        className="absolute top-10 right-20 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 220, 150, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/40" />
    </div>
  );
}
