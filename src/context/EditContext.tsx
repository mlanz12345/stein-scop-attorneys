import React, { createContext, useContext, useState, useEffect } from 'react';

interface EditContextType {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  content: Record<string, string>;
  updateContent: (key: string, value: string) => void;
  saveContent: () => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditing, setIsEditing] = useState(() => {
    // Check if we have an explicit mode stored
    const stored = localStorage.getItem('lex_politica_edit_mode');
    return stored === 'true';
  });
  
  const [content, setContent] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('lex_politica_content');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved content', e);
      }
    }
    return {};
  });

  // Persist edit mode
  useEffect(() => {
    localStorage.setItem('lex_politica_edit_mode', isEditing.toString());
  }, [isEditing]);

  // Auto-save content to draft (persistent)
  useEffect(() => {
    localStorage.setItem('lex_politica_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (key: string, value: string) => {
    setContent(prev => {
      const next = { ...prev, [key]: value };
      // Force immediate sync for refresh persistence
      localStorage.setItem('lex_politica_content', JSON.stringify(next));
      return next;
    });
  };

  const saveContent = () => {
    // Treat the draft as published
    setIsEditing(false);
  };

  return (
    <EditContext.Provider value={{ isEditing, setIsEditing, content, updateContent, saveContent }}>
      {children}
    </EditContext.Provider>
  );
};

export const useEdit = () => {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
};
