import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  content: Record<string, string>;
  saveContent: (key: string, value: string) => Promise<boolean>;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const safeGetItem = (key: string) => {
  try { return localStorage.getItem(key); } catch (e) { return null; }
};

const safeSetItem = (key: string, value: string) => {
  try { localStorage.setItem(key, value); } catch (e) {}
};

const safeRemoveItem = (key: string) => {
  try { localStorage.removeItem(key); } catch (e) {}
};

const defaultContentFallback: Record<string, string> = {
  "hero.headline": "Building Strong Concepts.\nAchieving Academic Excellence.",
  "hero.subheadline": "Structured coaching designed for concept clarity and board success for Classes 6–12 (CBSE, ICSE, IGCSE).",
  "hero.cta1": "Book a Free Demo Class",
  "hero.cta2": "Explore Courses",
  "hero.bgImage": "https://picsum.photos/seed/indianclassroom/1920/1080",
  "trust.stats": "500+ Students Trained | 100% Board Success | Small Batch Size | Weekly Testing System",
  "trust.subtitle": "Structured Academic Coaching for Classes 6–12 | CBSE • ICSE • IGCSE",
  "trust.desc": "At Aspire Academics, we don't just complete the syllabus — we build deep conceptual clarity, exam confidence, and consistent results.",
  "trust.cta": "Give your child the confidence to succeed in every examination.",
  "about.title": "About Aspire Academics",
  "about.subtitle": "Where Structured Learning Meets Real Results",
  "about.p1": "Aspire Academics was founded with one clear purpose — to bridge the gap between school teaching and true conceptual understanding.",
  "about.p2": "Many students struggle not because they lack ability, but because they lack:",
  "about.p3": "At Aspire, we solve this through a disciplined, test-driven, and concept-focused approach.",
  "about.p4": "Our faculty consists of experienced subject experts who combine strong academic knowledge with practical teaching strategies to ensure students understand, apply, and perform.",
  "about.p5": "We believe every student has potential — with the right guidance, structured practice, and consistent feedback, excellence becomes achievable.",
  "about.image": "/about-classroom.png",
  "contact.phone1": "+91 98433 18566",
  "contact.phone2": "+91 98435 23479",
  "contact.address": "Ganapathy, Coimbatore",
  "cta.title": "Secure Your Child's Academic Success Today",
  "cta.desc": "Limited seats to maintain quality and small batch size. Give your child the advantage of structured preparation and concept clarity.",
  "cta.button1": "Book a Free Demo Class",
  "cta.button2": "WhatsApp for Enquiry",
  "courses.title": "Our Academic Programs",
  "courses.subtitle": "Comprehensive coaching for every stage of your child's education.",
  "course.1.title": "Foundation Course (Classes 6-8)",
  "course.1.desc": "Building strong basics in Mathematics and Science to prepare for higher classes.",
  "course.2.title": "Board Prep (Classes 9-10)",
  "course.2.desc": "Intensive coaching focused on board exam patterns, previous year questions, and time management.",
  "course.3.title": "Higher Secondary (Classes 11-12)",
  "course.3.desc": "Specialized subject coaching (Physics, Chemistry, Math, Biology) for board excellence and competitive exam foundation.",
  "course.4.title": "Crash Courses & Revision",
  "course.4.desc": "Short-term intensive revision batches before major examinations.",
  "gallery.title": "Life at Aspire Academics",
  "gallery.subtitle": "A glimpse into our classrooms, interactive sessions, and student success moments.",
  "gallery.image.1": "https://picsum.photos/seed/classroom1/800/600",
  "gallery.image.1.desc": "Interactive classroom sessions",
  "gallery.image.2": "https://picsum.photos/seed/classroom2/800/600",
  "gallery.image.2.desc": "Students writing topic-wise tests",
  "gallery.image.3": "https://picsum.photos/seed/classroom3/800/600",
  "gallery.image.3.desc": "Teacher explaining on whiteboard",
  "gallery.image.4": "https://picsum.photos/seed/classroom4/800/600",
  "gallery.image.4.desc": "Paper correction discussion",
  "gallery.image.5": "https://picsum.photos/seed/classroom5/800/600",
  "gallery.image.5.desc": "Parent meeting",
  "gallery.image.6": "https://picsum.photos/seed/classroom6/800/600",
  "gallery.image.6.desc": "Smart classroom learning",
  "video.title": "🎥 Hear From Our Students & Parents",
  "video.subtitle": "Real stories. Real improvement. Real confidence.",
  "video.thumb.1": "https://picsum.photos/seed/video1/400/711",
  "video.thumb.2": "https://picsum.photos/seed/video2/400/711",
  "video.thumb.3": "https://picsum.photos/seed/video3/400/711",
  "video.thumb.4": "https://picsum.photos/seed/video4/400/711",
  "video.thumb.5": "https://picsum.photos/seed/video5/400/711",
  "video.thumb.6": "https://picsum.photos/seed/video6/400/711",
  "video.src.1": "",
  "video.src.2": "",
  "video.src.3": "",
  "video.src.4": "",
  "video.src.5": "",
  "video.src.6": "",
  "video.desc.1": "Student Testimonial – Coming Soon",
  "video.desc.2": "Parent Feedback – Video Upload Pending",
  "video.desc.3": "Student Testimonial – Coming Soon",
  "video.desc.4": "Parent Feedback – Video Upload Pending",
  "video.desc.5": "Student Testimonial – Coming Soon",
  "video.desc.6": "Parent Feedback – Video Upload Pending",
  "testimonials.title": "What Parents Say",
  "testimonials.subtitle": "Don't just take our word for it. Hear from the parents who trusted us.",
  "testimonial.1.text": "The transformation in my son's confidence is remarkable. The small batch size really helps.",
  "testimonial.1.author": "Priya R., Parent of Class 10 Student",
  "testimonial.2.text": "Aspire's weekly testing system ensured my daughter was fully prepared for her board exams without any last-minute stress.",
  "testimonial.2.author": "Karthik S., Parent of Class 12 Student",
  "testimonial.3.text": "The teachers are incredibly dedicated. They focus on making sure the concept is understood before moving on.",
  "testimonial.3.author": "Meenakshi V., Parent of Class 8 Student",
  "footer.desc": "Building strong concepts and achieving academic excellence through structured coaching, continuous assessment, and personalized mentoring.",
  "footer.rights": "Aspire Academics. All rights reserved."
};

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<Record<string, string>>(defaultContentFallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = safeGetItem('adminToken');
    if (token) {
      setIsAdmin(true);
    }
    fetchContent();
    
    // Failsafe: force loading to false after 2 seconds no matter what
    const failsafe = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(failsafe);
  }, []);

  const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeoutMs = 1500) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  const fetchContent = async () => {
    let apiSuccess = false;
    try {
      const res = await fetchWithTimeout('/api/content', {}, 1500);
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await res.json();
          if (Object.keys(data).length > 0) {
            setContent(prev => ({ ...prev, ...data }));
            apiSuccess = true;
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch content from API:', error);
    }
    
    if (!apiSuccess) {
      // Fallback to localStorage for static deployments (like Netlify)
      const saved = safeGetItem('siteContent');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Object.keys(parsed).length > 0) {
            setContent(prev => ({ ...prev, ...parsed }));
          }
        } catch (e) {
          console.error('Failed to parse local content', e);
        }
      }
    }
    
    setIsLoading(false);
  };

  const login = async (password: string) => {
    const trimmedPassword = password.trim();
    
    // Fast-path bypass for the hardcoded password to prevent hanging
    if (trimmedPassword === "asha0527") {
      try {
        // Try to hit the API in the background just in case it's available
        // but don't wait for it to finish or block the login process
        fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: trimmedPassword })
        }).then(async (res) => {
          if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              const { token } = await res.json();
              safeSetItem('adminToken', token);
            }
          }
        }).catch(() => {});
      } catch (e) {}

      // Immediately log the user in using the fallback mechanism
      safeSetItem('adminToken', 'static-token-fallback');
      setIsAdmin(true);
      return true;
    }

    // For any other password, try the API normally
    try {
      const res = await fetchWithTimeout('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: trimmedPassword })
      });
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const { token } = await res.json();
          safeSetItem('adminToken', token);
          setIsAdmin(true);
          return true;
        }
      }
    } catch (error) {
      console.error('API Login failed:', error);
    }

    return false;
  };

  const logout = async () => {
    const token = safeGetItem('adminToken');
    if (token && token !== 'static-token-fallback') {
      try {
        await fetchWithTimeout('/api/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    safeRemoveItem('adminToken');
    setIsAdmin(false);
  };

  const saveContent = async (key: string, value: string) => {
    const token = safeGetItem('adminToken');
    if (!token) return false;

    try {
      const res = await fetchWithTimeout('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ key, value })
      });
      
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          setContent(prev => ({ ...prev, [key]: value }));
          return true;
        }
      }
      
      if (res.status === 401) {
        logout();
        return false;
      }
    } catch (error) {
      console.error('API Save failed:', error);
    }

    // Fallback for static deployments
    if (token === 'static-token-fallback') {
      setContent(prev => {
        const newContent = { ...prev, [key]: value };
        safeSetItem('siteContent', JSON.stringify(newContent));
        return newContent;
      });
      return true;
    }

    return false;
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, content, saveContent, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
