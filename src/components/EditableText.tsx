import React, { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface EditableTextProps {
  contentKey: string;
  defaultText: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export default function EditableText({ 
  contentKey, 
  defaultText, 
  as: Component = 'span', 
  className = '',
  multiline = false
}: EditableTextProps) {
  const { isAdmin, content, saveContent } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize value from context or default
  const displayValue = content[contentKey] !== undefined ? content[contentKey] : defaultText;

  useEffect(() => {
    setValue(displayValue);
  }, [displayValue]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveContent(contentKey, value);
    setIsSaving(false);
    
    if (success) {
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert('Failed to save changes. Session may have expired.');
    }
  };

  const handleCancel = () => {
    setValue(displayValue);
    setIsEditing(false);
  };

  if (!isAdmin) {
    // Render normal content for public users
    // Handle newlines for multiline text
    if (multiline && typeof displayValue === 'string') {
      const lines = displayValue.replace(/\\n/g, '\n').split('\n');
      return (
        <Component className={className}>
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </Component>
      );
    }
    return <Component className={className}>{displayValue}</Component>;
  }

  // Admin Mode Rendering
  return (
    <div className={`relative group ${isEditing ? 'z-50' : ''}`}>
      {isEditing ? (
        <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-[var(--color-accent)] absolute top-0 left-0 w-full min-w-[300px] z-50">
          {multiline ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded font-body text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-h-[100px] resize-y"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded font-body text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              autoFocus
            />
          )}
          <div className="flex justify-end gap-2 mt-3">
            <button 
              onClick={handleCancel}
              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1 text-sm font-medium transition-colors"
              disabled={isSaving}
            >
              <X size={16} /> Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-3 py-1.5 bg-[var(--color-primary)] text-white rounded hover:bg-opacity-90 flex items-center gap-1 text-sm font-medium transition-colors"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : <><Check size={16} /> Save</>}
            </button>
          </div>
        </div>
      ) : (
        <div className="relative inline-block w-full">
          <div className={`outline outline-1 outline-dashed outline-transparent group-hover:outline-[var(--color-accent)]/50 transition-all duration-200 rounded-sm ${className}`}>
            {multiline && typeof displayValue === 'string' ? (
              <Component className={className}>
                {displayValue.replace(/\\n/g, '\n').split('\n').map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </Component>
            ) : (
              <Component className={className}>{displayValue}</Component>
            )}
          </div>
          
          {/* Edit Button overlay */}
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute -top-3 -right-3 bg-[var(--color-accent)] text-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 z-10"
            title="Edit this text"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 z-50 animate-bounce">
          <Check size={18} /> Changes Saved Successfully
        </div>
      )}
    </div>
  );
}
