import React from 'react';
import { useEdit } from '../context/EditContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface EditableProps {
  id: string;
  defaultText: string;
  className?: string;
  as?: any;
}

export const Editable = ({ id, defaultText, className, as: Component = 'span' }: EditableProps) => {
  const { isEditing, content, updateContent } = useEdit();
  const text = content[id] || defaultText;

  return (
    <Component
      contentEditable={isEditing}
      suppressContentEditableWarning
      onInput={(e: React.FormEvent<HTMLElement>) => {
        if (isEditing) updateContent(id, e.currentTarget.textContent || "");
      }}
      className={cn(
        className,
        "outline-none transition-all duration-300",
        isEditing && "ring-1 ring-brand-accent/30 focus:ring-brand-accent focus:bg-transparent rounded px-1 cursor-text",
        "relative group"
      )}
    >
      {text}
      {isEditing && (
        <span className="absolute -top-6 -right-2 text-[8px] bg-brand-accent text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-tighter pointer-events-none z-50 whitespace-nowrap">
          Edit Text
        </span>
      )}
    </Component>
  );
};
