import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RoomScene from './components/RoomScene';
import TableDecor from './components/TableDecor';
import DiaryBook from './components/DiaryBook';
import OpenBook from './components/OpenBook';
import DiaryEditor from './components/DiaryEditor';
import { useDiaryEntry } from './hooks/useDiaryEntry';
import { exportToPDF, exportToWord } from './utils/export';

type ViewState = 'table' | 'book' | 'editor';

function App() {
  const [viewState, setViewState] = useState<ViewState>('table');
  const { entry, loading, saveEntry } = useDiaryEntry();

  const handleOpenBook = () => {
    setViewState('book');
  };

  const handleCloseBook = () => {
    setViewState('table');
  };

  const handleOpenEditor = () => {
    setViewState('editor');
  };

  const handleCloseEditor = () => {
    setViewState('book');
  };

  const handleSave = async (content: string) => {
    await saveEntry(content);
  };

  const handleExportPDF = () => {
    if (entry?.content) {
      exportToPDF(entry.content);
    }
  };

  const handleExportWord = () => {
    if (entry?.content) {
      exportToWord(entry.content);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 flex items-center justify-center">
        <div className="text-amber-100 text-xl font-serif">Loading your diary...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 overflow-hidden">
      <RoomScene />
      <TableDecor />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {viewState === 'table' && (
          <DiaryBook onOpen={handleOpenBook} isOpen={false} />
        )}
      </div>

      <AnimatePresence>
        {viewState === 'book' && (
          <OpenBook onClose={handleCloseBook} onPageClick={handleOpenEditor} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewState === 'editor' && entry && (
          <DiaryEditor
            content={entry.content}
            onClose={handleCloseEditor}
            onSave={handleSave}
            onExportPDF={handleExportPDF}
            onExportWord={handleExportWord}
          />
        )}
      </AnimatePresence>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        `}
      </style>
    </div>
  );
}

export default App;
