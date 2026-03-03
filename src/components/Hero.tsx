import EditableText from './EditableText';
import EditableImage from './EditableImage';

export default function Hero() {
  return (
    <section id="home" className="relative pt-[116px] lg:pt-[132px] min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <EditableImage 
          contentKey="hero.bgImage"
          defaultSrc="https://picsum.photos/seed/indianclassroom/1920/1080" 
          alt="Indian Classroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-primary)] opacity-60 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-20 text-center lg:text-left">
        <div className="max-w-5xl mx-auto lg:mx-0">
          <EditableText
            contentKey="hero.headline"
            defaultText="Building Strong Concepts.\nAchieving Academic Excellence."
            as="h1"
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            multiline
          />
          <EditableText
            contentKey="hero.subheadline"
            defaultText="Structured coaching designed for concept clarity and board success for Classes 6–12 (CBSE, ICSE, IGCSE)."
            as="p"
            className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 font-body leading-relaxed"
            multiline
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href="#contact" 
              className="bg-[var(--color-accent)] text-[var(--color-primary)] px-8 py-3 min-h-[48px] rounded-sm font-bold text-base md:text-lg hover:bg-opacity-90 transition-all shadow-lg text-center w-full sm:w-auto flex items-center justify-center"
            >
              <EditableText contentKey="hero.cta1" defaultText="Book a Free Demo Class" />
            </a>
            <a 
              href="#courses" 
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 min-h-[48px] rounded-sm font-bold text-base md:text-lg hover:bg-white/20 transition-all text-center w-full sm:w-auto flex items-center justify-center"
            >
              <EditableText contentKey="hero.cta2" defaultText="Explore Courses" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
