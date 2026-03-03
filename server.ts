import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const db = new Database("content.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS content (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    expires_at INTEGER
  );
`);

// Default content
const defaultContent: Record<string, string> = {
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
  "gallery.image.2": "https://picsum.photos/seed/classroom2/800/600",
  "gallery.image.3": "https://picsum.photos/seed/classroom3/800/600",
  "gallery.image.4": "https://picsum.photos/seed/classroom4/800/600",
  "gallery.image.5": "https://picsum.photos/seed/classroom5/800/600",
  "gallery.image.6": "https://picsum.photos/seed/classroom6/800/600",
  
  "video.title": "🎥 Hear From Our Students & Parents",
  "video.subtitle": "Real stories. Real improvement. Real confidence.",
  "video.thumb.1": "https://picsum.photos/seed/video1/400/711",
  "video.thumb.2": "https://picsum.photos/seed/video2/400/711",
  "video.thumb.3": "https://picsum.photos/seed/video3/400/711",
  "video.thumb.4": "https://picsum.photos/seed/video4/400/711",
  "video.thumb.5": "https://picsum.photos/seed/video5/400/711",
  "video.thumb.6": "https://picsum.photos/seed/video6/400/711",
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

const insertContent = db.prepare("INSERT OR IGNORE INTO content (key, value) VALUES (?, ?)");
for (const [key, value] of Object.entries(defaultContent)) {
  insertContent.run(key, value);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Middleware to check session
  const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const session = db.prepare("SELECT * FROM sessions WHERE token = ? AND expires_at > ?").get(token, Date.now());
    if (!session) return res.status(401).json({ error: "Session expired or invalid" });

    // Extend session by 30 mins
    db.prepare("UPDATE sessions SET expires_at = ? WHERE token = ?").run(Date.now() + 30 * 60 * 1000, token);
    next();
  };

  // API Routes
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    // Hardcoded password as requested
    if (password === "asha0527") {
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
      db.prepare("INSERT INTO sessions (token, expires_at) VALUES (?, ?)").run(token, expiresAt);
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  app.post("/api/logout", checkAuth, (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
    res.json({ success: true });
  });

  app.get("/api/content", (req, res) => {
    const rows = db.prepare("SELECT * FROM content").all() as { key: string; value: string }[];
    const content = rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);
    res.json(content);
  });

  app.post("/api/content", checkAuth, (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT INTO content (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(key, value);
    res.json({ success: true });
  });

  app.post("/api/upload", checkAuth, upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
