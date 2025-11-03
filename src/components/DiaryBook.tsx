import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface DiaryBookProps {
  onOpen: () => void;
  isOpen: boolean;
}

export default function DiaryBook({ onOpen, isOpen }: DiaryBookProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <motion.div
        className="relative w-96 h-64"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: isHovered ? -2 : 0,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-amber-800 via-orange-900 to-amber-950 rounded-r-lg shadow-2xl"
          style={{
            transform: 'translateZ(0px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-950 to-transparent opacity-60" />

          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 3px
              )`,
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-serif text-amber-100 mb-2 tracking-wider"
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  fontFamily: "'Crimson Text', serif",
                }}
              >
                My Diary
              </h2>
              <div className="w-32 h-0.5 bg-amber-300/50 mx-auto" />
            </div>
          </div>

          <div className="absolute top-4 left-4 right-4 h-1 bg-amber-950/30 rounded" />
          <div className="absolute bottom-4 left-4 right-4 h-1 bg-amber-950/30 rounded" />
        </div>

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/40 rounded-full blur-xl"
          style={{
            transform: 'translateZ(-10px) translateX(-50%)',
          }}
        />
      </motion.div>

      <AnimatePresence>
        {isHovered && !isOpen && (
          <motion.div
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-amber-900/90 text-amber-100 px-4 py-2 rounded-lg text-sm whitespace-nowrap backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            Click to open
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
