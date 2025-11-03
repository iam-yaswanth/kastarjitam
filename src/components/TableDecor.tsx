import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';

export default function TableDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-amber-900/40 via-orange-950/20 to-transparent"
        style={{
          boxShadow: 'inset 0 -50px 100px rgba(139, 69, 19, 0.3)',
        }}
      />

      <motion.div
        className="absolute bottom-20 right-32 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="relative">
          <div className="w-16 h-20 bg-gradient-to-b from-amber-800 to-amber-950 rounded-lg shadow-2xl"
            style={{
              transform: 'perspective(400px) rotateX(5deg)',
            }}
          />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
            <Pencil className="w-3 h-12 text-blue-600 opacity-80" strokeWidth={3} />
            <Pencil className="w-3 h-14 text-red-600 opacity-80" strokeWidth={3} />
            <Pencil className="w-3 h-11 text-green-700 opacity-80" strokeWidth={3} />
          </div>
        </div>
        <div className="w-20 h-3 bg-black/30 rounded-full blur-sm" />
      </motion.div>

      <motion.div
        className="absolute top-16 left-20 w-24 h-24 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 100, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
