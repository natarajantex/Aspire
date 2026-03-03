import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Image as ImageIcon, Check, X, Upload } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EditableImageProps {
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

// Utility to convert Google Drive view links to direct image links
function getDirectImageUrl(url: string): string {
  if (!url) return url;
  
  // Match Google Drive file URLs: https://drive.google.com/file/d/FILE_ID/view...
  const driveRegex = /^https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/.*)?$/;
  const match = url.match(driveRegex);
  
  if (match && match[1]) {
    // Use the thumbnail endpoint which bypasses recent Google Drive embedding restrictions
    // sz=w1920-h1920 ensures a high-quality image is returned
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1920-h1920`;
  }
  
  return url;
}

export default function EditableImage({ contentKey, defaultSrc, alt, className }: EditableImageProps) {
  const { isAdmin, content, saveContent } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rawSrc = content[contentKey] || defaultSrc;
  const displaySrc = getDirectImageUrl(rawSrc);

  const handleEdit = () => {
    if (!isAdmin) return;
    setTempValue(rawSrc); // Show the original URL in the input field
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (tempValue === rawSrc) {
      setIsEditing(false);
      return;
    }
    
    setIsSaving(true);
    const success = await saveContent(contentKey, tempValue);
    setIsSaving(false);
    
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(rawSrc);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setTempValue(data.url);
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isEditing) {
    return (
      <div className={cn("relative z-50 bg-white p-4 rounded-lg shadow-xl border-2 border-[var(--color-accent)]", className)}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL or Upload</label>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-sm"
            placeholder="https://example.com/image.jpg or Google Drive link"
            autoFocus
          />
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isSaving}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded transition-colors text-sm font-medium whitespace-nowrap"
            title="Upload from device"
          >
            <Upload size={16} />
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        <div className="flex justify-end gap-2">
          <button 
            onClick={handleCancel}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSaving || isUploading}
          >
            <X size={18} />
          </button>
          <button 
            onClick={handleSave}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
            disabled={isSaving || isUploading}
          >
            <Check size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative group/image", className)}
      onClick={isAdmin ? handleEdit : undefined}
    >
      <img 
        src={displaySrc} 
        alt={alt} 
        className={cn("w-full h-full object-cover", className)}
        referrerPolicy="no-referrer"
      />
      
      {isAdmin && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-inherit">
          <div className="bg-white text-[var(--color-primary)] p-3 rounded-full shadow-lg flex items-center gap-2 transform scale-90 group-hover/image:scale-100 transition-transform">
            <ImageIcon size={20} />
            <span className="font-semibold text-sm pr-2">Edit Image</span>
          </div>
        </div>
      )}
    </div>
  );
}
