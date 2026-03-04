import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Save, LogOut, Home, Check, Plus, Upload } from 'lucide-react';

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

export default function AdminDashboard() {
  const { isAdmin, content, saveContent, logout } = useAdmin();
  const navigate = useNavigate();
  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = async (key: string) => {
    setSavingKey(key);
    const success = await saveContent(key, localContent[key]);
    setSavingKey(null);
    if (success) {
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
    }
  };

  const handleAddNew = async () => {
    if (!newKey.trim() || !newValue.trim()) return;
    setSavingKey('new');
    const success = await saveContent(newKey.trim(), newValue);
    setSavingKey(null);
    if (success) {
      setNewKey('');
      setNewValue('');
      setIsAdding(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setLocalContent(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey(key);
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
        handleChange(key, data.url);
        // Automatically save after upload
        setSavingKey(key);
        const success = await saveContent(key, data.url);
        setSavingKey(null);
        if (success) {
          setSavedKey(key);
          setTimeout(() => setSavedKey(null), 2000);
        }
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    } finally {
      setUploadingKey(null);
      if (fileInputRefs.current[key]) {
        fileInputRefs.current[key]!.value = '';
      }
    }
  };

  if (!isAdmin) return null;

  // Group keys by prefix (e.g., "hero.headline" -> "hero")
  const groupedContent: Record<string, string[]> = {};
  Object.keys(localContent).sort().forEach(key => {
    const prefix = key.split('.')[0];
    if (!groupedContent[prefix]) groupedContent[prefix] = [];
    groupedContent[prefix].push(key);
  });

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-primary)] text-[var(--color-accent)] flex items-center justify-center rounded-sm font-heading font-bold text-xl">
            A
          </div>
          <h1 className="font-heading font-bold text-2xl text-[var(--color-primary)] hidden sm:block">Admin Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] font-medium transition-colors">
            <Home size={18} /> <span className="hidden sm:inline">View Site</span>
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors">
            <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 pb-24">
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-4 rounded-lg mb-8 shadow-sm">
          <h2 className="font-bold text-lg mb-1">Welcome to the Content Manager</h2>
          <p className="text-sm opacity-90">Here you can edit all the text content on your website. Changes are saved immediately to the database and will reflect on the live site instantly.</p>
        </div>

        <div className="mb-8 flex justify-end">
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 rounded-md font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-colors shadow-sm"
          >
            <Plus size={18} /> Add New Content Key
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[var(--color-accent)] mb-8">
            <h3 className="font-bold text-lg mb-4">Add New Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Key (e.g., section.title)</label>
                <input 
                  type="text" 
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  placeholder="section.key"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <textarea 
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent min-h-[80px]"
                  placeholder="Enter content here..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddNew}
                disabled={savingKey === 'new' || !newKey.trim() || !newValue.trim()}
                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {savingKey === 'new' ? 'Saving...' : <><Save size={16} /> Save New Content</>}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(groupedContent).map(([group, keys]) => (
            <section key={group} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[var(--color-primary)] px-6 py-3 border-b border-gray-200">
                <h2 className="font-heading font-bold text-lg text-white capitalize">{group} Section</h2>
              </div>
              <div className="p-6 space-y-6 divide-y divide-gray-100">
                {keys.map((key, index) => {
                  const keyLower = key.toLowerCase();
                  const val = localContent[key] || '';
                  
                  // A key is an image if it has 'image', 'bg', 'thumb' in the name, OR if the value looks like an image URL
                  const isImageKey = (keyLower.includes('image') || keyLower.includes('bg') || keyLower.includes('thumb')) && !keyLower.includes('desc') || 
                    (val && (val.startsWith('http') || val.startsWith('/')) && !val.includes(' ') && !val.match(/\.(mp4|webm|ogg)$/i) && val.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i));
                  
                  // A key is a video if it has 'video' in the name (but not thumb), OR if the value looks like a video URL
                  const isVideoKey = (keyLower.includes('video') && !keyLower.includes('thumb') && !keyLower.includes('title') && !keyLower.includes('desc') && !keyLower.includes('subtitle')) || 
                    (val && val.match(/\.(mp4|webm|ogg)$/i));
                    
                  const isMediaKey = isImageKey || isVideoKey;
                  
                  return (
                    <div key={key} className={`flex flex-col gap-2 ${index > 0 ? 'pt-6' : ''}`}>
                      <label className="font-mono font-medium text-gray-500 text-xs bg-gray-100 px-2 py-1 rounded w-fit">{key}</label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 flex flex-col gap-2">
                          <textarea
                            value={localContent[key] || ''}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent font-body text-gray-800 leading-relaxed resize-y ${isMediaKey ? 'min-h-[60px]' : 'min-h-[100px]'}`}
                          />
                          {isMediaKey && (
                            <div className="mt-2 border border-gray-200 rounded-md p-3 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Preview:</span>
                                <div className="h-16 w-auto max-w-[200px] rounded overflow-hidden bg-gray-200 flex items-center justify-center">
                                  {isVideoKey ? (
                                    <video 
                                      src={localContent[key]} 
                                      className="h-full w-full object-contain"
                                      controls
                                    />
                                  ) : (
                                    <img 
                                      src={getDirectImageUrl(localContent[key])} 
                                      alt="Preview" 
                                      className="h-full w-full object-contain"
                                      onError={(e) => (e.currentTarget.style.display = 'none')}
                                      onLoad={(e) => (e.currentTarget.style.display = 'block')}
                                    />
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <input 
                                  type="file" 
                                  ref={(el) => fileInputRefs.current[key] = el}
                                  onChange={(e) => handleFileUpload(e, key)} 
                                  accept={isVideoKey ? "video/*" : "image/*"} 
                                  className="hidden" 
                                />
                                <button
                                  onClick={() => fileInputRefs.current[key]?.click()}
                                  disabled={uploadingKey === key || savingKey === key}
                                  className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded transition-colors text-sm font-medium whitespace-nowrap shadow-sm"
                                >
                                  <Upload size={16} />
                                  {uploadingKey === key ? 'Uploading...' : `Upload ${isVideoKey ? 'Video' : 'Image'}`}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleSave(key)}
                          disabled={savingKey === key || localContent[key] === content[key]}
                          className={`px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2 h-fit transition-all md:w-32 ${
                            savedKey === key 
                              ? 'bg-green-500 text-white' 
                              : localContent[key] !== content[key]
                                ? 'bg-[var(--color-primary)] text-white hover:bg-opacity-90 shadow-md'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {savingKey === key ? 'Saving...' : savedKey === key ? <><Check size={18} /> Saved</> : <><Save size={18} /> Save</>}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
