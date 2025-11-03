import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface OpenBookProps {
  onClose: () => void;
  onPageClick: () => void;
}

export default function OpenBook({ onClose, onPageClick }: OpenBookProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={onClose}
        className="absolute top-8 right-8 p-3 bg-amber-900/80 hover:bg-amber-800 text-amber-100 rounded-full backdrop-blur-sm transition-colors shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-6 h-6" />
      </motion.button>

      <motion.div
        className="relative w-[900px] h-[600px]"
        style={{
          perspective: '2000px',
        }}
        initial={{ scale: 0.5, rotateY: -90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.5, rotateY: 90 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative w-full h-full flex" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            className="w-1/2 h-full bg-gradient-to-br from-orange-50 to-amber-50 border-r-2 border-amber-900/20 shadow-2xl rounded-l-lg relative overflow-hidden"
            style={{
              transformOrigin: 'right center',
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 31px,
                rgba(180, 130, 80, 0.1) 31px,
                rgba(180, 130, 80, 0.1) 32px
              )`,
            }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 0 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_rgba(251,191,36,0.05)_0%,_transparent_50%)]" />
            <div className="p-12 h-full flex flex-col">
              <div className="text-amber-900/30 font-serif text-sm mb-8" style={{ fontFamily: "'Caveat', cursive" }}>
                <div className="mb-2">Dear Diary,</div>
                <div className="text-xs opacity-60">Every story begins here...</div>
              </div>
              <div className="flex-1 flex items-center justify-center opacity-20">
                <div className="text-6xl">📖</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-1/2 h-full bg-gradient-to-bl from-orange-50 to-amber-50 shadow-2xl rounded-r-lg relative overflow-hidden cursor-pointer group"
            style={{
              transformOrigin: 'left center',
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 31px,
                rgba(180, 130, 80, 0.15) 31px,
                rgba(180, 130, 80, 0.15) 32px
              )`,
            }}
            onClick={onPageClick}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(251,191,36,0.05)_0%,_transparent_50%)]" />

            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-300/0 group-hover:to-amber-300/10 transition-all duration-300" />

            <div className="p-12 h-full flex flex-col">
              <div className="text-amber-900/60 font-serif mb-4" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px' }}>
                Click to write...
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center justify-center text-amber-900/20 text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
                  Your thoughts await
                </div>
              </div>

              <div className="text-right text-amber-900/40 text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-amber-900/80 text-amber-100 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                Click to edit
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-950/40 to-transparent"
          style={{ transform: 'translateX(-50%)' }}
        />
      </motion.div>
    </motion.div>
  );
}
