import React from 'react';
import { useEdit } from '../context/EditContext';
import { cn } from '../lib/utils';
import { Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  style?: any;
  animate?: any;
  initial?: any;
  whileInView?: any;
  viewport?: any;
  transition?: any;
}

export const EditableImage = ({ 
  id, 
  defaultSrc, 
  alt, 
  className, 
  style, 
  animate, 
  initial, 
  whileInView, 
  viewport, 
  transition 
}: EditableImageProps) => {
  const { isEditing, content, updateContent } = useEdit();
  const src = content[id] || defaultSrc;

  const handleUrlChange = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newUrl = window.prompt('Enter new image URL:', src);
    if (newUrl !== null) {
      updateContent(id, newUrl);
    }
  };

  return (
    <div className={cn("relative group w-full h-full", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={style}
        initial={initial}
        animate={animate}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      {isEditing && (
        <div className="absolute inset-0 bg-brand-accent/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] z-50 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleUrlChange}
            className="flex items-center gap-2 bg-brand-primary text-white border border-white/20 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl hover:bg-brand-accent hover:border-transparent transition-all"
          >
            <ImageIcon size={14} />
            Update Image Asset
          </button>
        </div>
      )}
    </div>
  );
};
