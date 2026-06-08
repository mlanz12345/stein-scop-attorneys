import { useEdit } from '../context/EditContext';
import { Save, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminToolbar = () => {
  const { isEditing, setIsEditing, saveContent, content } = useEdit();
  const hasChanges = Object.keys(content).length > 0;

  if (!isEditing && !hasChanges) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-4 px-6 py-3 bg-brand-primary border border-white/10 rounded-full shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 pr-4 border-r border-white/10">
          <div className={`w-2 h-2 rounded-full ${isEditing ? 'bg-green-500 animate-pulse' : 'bg-brand-accent'}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
            {isEditing ? 'Live Editing' : 'Draft View'}
          </span>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
        >
          {isEditing ? <Eye size={16} /> : <EyeOff size={16} />}
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {isEditing ? 'Preview Mode' : 'Resume Editing'}
          </span>
        </button>

        {hasChanges && (
          <button
            onClick={saveContent}
            className="flex items-center gap-2 px-4 py-1.5 bg-brand-accent text-white rounded-full hover:scale-105 active:scale-95 transition-all"
          >
            <Save size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Publish Changes</span>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
