import { Target, Star } from 'lucide-react';
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

      </div>
    </section>
  );
}
