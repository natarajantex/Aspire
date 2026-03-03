import React, { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Video as VideoIcon, Check, X, Upload, Play } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EditableVideoProps {
  contentKey: string;
  defaultSrc?: string;
  posterKey?: string;
  defaultPoster?: string;
  className?: string;
}

// Utility to convert Google Drive view links to direct video links
function getDirectVideoUrl(url: string): string {
  if (!url) return url;
  
  // Match Google Drive file URLs
  const driveRegex = /^https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)(?:\/.*)?$/;
  const match = url.match(driveRegex);
  
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  
  return url;
}

export default function EditableVideo({ contentKey, defaultSrc = '', posterKey, defaultPoster = '', className }: EditableVideoProps) {
  const { isAdmin, content, saveContent } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const rawSrc = content[contentKey] || defaultSrc;
  const displaySrc = getDirectVideoUrl(rawSrc);
  const posterSrc = posterKey ? (content[posterKey] || defaultPoster) : defaultPoster;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) return;
    setTempValue(rawSrc);
    setIsEditing(true);
    setIsPlaying(false);
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
        alert('Failed to upload video');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading video');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const togglePlay = () => {
    if (isAdmin && !displaySrc) {
      handleEdit({ stopPropagation: () => {} } as React.MouseEvent);
      return;
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isEditing) {
    return (
      <div className={cn("relative z-50 bg-white p-4 rounded-lg shadow-xl border-2 border-[var(--color-accent)] w-full", className)}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Video URL or Upload</label>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-sm"
            placeholder="https://example.com/video.mp4 or Google Drive link"
            autoFocus
          />
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="video/*" 
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
    <div className={cn("relative group/video w-full h-full", className)}>
      {displaySrc ? (
        <video 
          ref={videoRef}
          src={displaySrc} 
          poster={posterSrc}
          className="w-full h-full object-cover"
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          playsInline
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          {posterSrc ? (
            <img src={posterSrc} alt="Video poster" className="w-full h-full object-cover opacity-50" />
          ) : (
            <span className="text-gray-400">No video</span>
          )}
        </div>
      )}
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-14 h-14 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300">
            <Play size={20} className="ml-1" fill="currentColor" />
          </div>
        </div>
      )}
      
      {isAdmin && (
        <div 
          className="absolute top-2 right-2 opacity-0 group-hover/video:opacity-100 transition-opacity z-20"
        >
          <button
            onClick={handleEdit}
            className="bg-white text-[var(--color-primary)] p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            title="Edit Video"
          >
            <VideoIcon size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
