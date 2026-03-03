import { Target, Star, BookOpen, PenTool, ClipboardCheck, TrendingUp } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 px-5 bg-white relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Text + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20 md:mb-24">
          
          {/* Left Column: Text */}
          <div className="flex flex-col gap-6">
            <div>
              <EditableText
                contentKey="about.title"
                defaultText="About Aspire Academics"
                as="h2"
                className="font-heading font-semibold text-2xl md:text-4xl text-[var(--color-primary)] mb-4 mt-10 md:mt-0 leading-snug"
              />
              <EditableText
                contentKey="about.subtitle"
                defaultText="Where Structured Learning Meets Real Results"
                as="h3"
                className="font-heading font-medium text-lg md:text-xl text-[var(--color-primary)]/80 leading-snug"
              />
              <div className="w-20 h-1 bg-[var(--color-accent)] mt-6 rounded-full"></div>
            </div>
            
            <div className="font-body text-gray-700 space-y-3 md:space-y-4 leading-relaxed text-base md:text-lg">
              <EditableText
                contentKey="about.p1"
                defaultText="Aspire Academics was founded with one clear purpose — to bridge the gap between school teaching and true conceptual understanding."
                as="p"
                multiline
              />
              <EditableText
                contentKey="about.p2"
                defaultText="Many students struggle not because they lack ability, but because they lack:"
                as="p"
                multiline
              />
              <ul className="list-disc pl-6 space-y-2 md:space-y-3 text-[var(--color-primary)] font-medium text-base">
                <li>Individual attention</li>
                <li>Structured revision</li>
                <li>Continuous assessment</li>
                <li>Clear explanation of fundamentals</li>
              </ul>
              <EditableText
                contentKey="about.p3"
                defaultText="At Aspire, we solve this through a disciplined, test-driven, and concept-focused approach."
                as="p"
                multiline
              />
              <EditableText
                contentKey="about.p4"
                defaultText="Our faculty consists of experienced subject experts who combine strong academic knowledge with practical teaching strategies to ensure students understand, apply, and perform."
                as="p"
                multiline
              />
              <EditableText
                contentKey="about.p5"
                defaultText="We believe every student has potential — with the right guidance, structured practice, and consistent feedback, excellence becomes achievable."
                as="p"
                className="font-semibold text-[var(--color-primary)]"
                multiline
              />
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--color-accent)] rounded-2xl transform translate-x-4 translate-y-4 opacity-20"></div>
            <EditableImage 
              contentKey="about.image"
              defaultSrc="/about-classroom.png" 
              alt="Aspire Academics Classroom" 
              className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 md:mb-24">
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[var(--color-accent)] flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-[var(--color-primary)]" />
              <h3 className="font-heading font-medium text-xl md:text-2xl text-[var(--color-primary)] leading-snug">Our Mission</h3>
            </div>
            <p className="font-body text-gray-700 leading-relaxed text-base">
              To create confident, concept-strong students through structured teaching, continuous assessment, and personalized mentoring.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-[var(--color-accent)] flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-[var(--color-primary)]" />
              <h3 className="font-heading font-medium text-xl md:text-2xl text-[var(--color-primary)] leading-snug">Our Vision</h3>
            </div>
            <p className="font-body text-gray-700 leading-relaxed text-base">
              To become the most trusted academic coaching centre in Coimbatore, known for discipline, clarity, and consistent board results.
            </p>
          </div>
        </div>

        {/* The Aspire Method */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl text-[var(--color-primary)] mb-4 mt-10 leading-snug">
            The Aspire Method – Our 4-Step Academic System
          </h2>
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            
            {/* Steps */}
            {[
              { icon: <BookOpen />, title: "Concept Mastery", desc: "Clear explanation from fundamentals" },
              { icon: <PenTool />, title: "Guided Practice", desc: "Structured problem-solving sessions" },
              { icon: <ClipboardCheck />, title: "Continuous Testing", desc: "Topic-wise and model exams" },
              { icon: <TrendingUp />, title: "Performance Analysis", desc: "Feedback-driven improvement" }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center mb-4 shadow-md text-2xl font-bold">
                  {idx + 1}
                </div>
                <h4 className="font-heading font-medium text-lg text-[var(--color-primary)] mb-2 whitespace-nowrap leading-snug">
                  {step.title}
                </h4>
                <p className="font-body text-gray-700 text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          
          <p className="font-heading font-medium text-lg text-[var(--color-primary)] mt-12 italic leading-snug">
            This system ensures steady progress — not last-minute preparation.
          </p>
        </div>

      </div>
    </section>
  );
}
