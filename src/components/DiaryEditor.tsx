import { motion } from 'framer-motion';
import { X, Save, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface DiaryEditorProps {
  content: string;
  onClose: () => void;
  onSave: (content: string) => void;
  onExportPDF: () => void;
  onExportWord: () => void;
}

export default function DiaryEditor({
  content,
  onClose,
  onSave,
  onExportPDF,
  onExportWord,
}: DiaryEditorProps) {
  const [text, setText] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      if (text !== content) {
        handleSave();
      }
    }, 2000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [text]);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(text);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-4xl h-[90vh] bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 rounded-lg shadow-2xl overflow-hidden"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 31px,
            rgba(180, 130, 80, 0.12) 31px,
            rgba(180, 130, 80, 0.12) 32px
          )`,
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-amber-100/80 to-transparent backdrop-blur-sm border-b border-amber-900/10 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-3">
            <motion.button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-amber-900 hover:bg-amber-800 text-amber-50 rounded-lg transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">{isSaving ? 'Saving...' : 'Save'}</span>
            </motion.button>

            <div className="relative group">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-orange-800 hover:bg-orange-700 text-orange-50 rounded-lg transition-colors shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </motion.button>

              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-amber-900/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <button
                  onClick={onExportPDF}
                  className="w-full px-4 py-2 text-left text-sm text-amber-900 hover:bg-amber-50 transition-colors"
                >
                  Export as PDF
                </button>
                <button
                  onClick={onExportWord}
                  className="w-full px-4 py-2 text-left text-sm text-amber-900 hover:bg-amber-50 transition-colors border-t border-amber-900/10"
                >
                  Export as Word
                </button>
              </div>
            </div>
          </div>

          <motion.button
            onClick={onClose}
            className="p-2 bg-amber-900/80 hover:bg-amber-900 text-amber-50 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="h-full pt-24 pb-8 px-12">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full bg-transparent resize-none outline-none text-amber-900 leading-8 text-lg"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: '22px',
              lineHeight: '32px',
            }}
            placeholder="Dear Diary,

Today was..."
          />
        </div>

        <div className="absolute bottom-4 right-8 text-amber-900/40 text-sm" style={{ fontFamily: "'Caveat', cursive" }}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>

        {isSaving && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-sm shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ✓ Saved
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
