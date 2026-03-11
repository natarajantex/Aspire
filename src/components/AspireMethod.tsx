import React from 'react';
import EditableText from './EditableText';
import { BookOpen, PenTool, FileText, TrendingUp } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: BookOpen,
    titleKey: "method.1.title",
    frontKey: "method.1.front",
    backKey: "method.1.back",
    defaultTitle: "Concept Mastery",
    defaultFront: "Clear explanation from fundamentals.",
    defaultBack: "We break down complex topics into easy-to-understand concepts, ensuring students grasp the 'why' behind every formula and theory. True mastery starts here."
  },
  {
    id: 2,
    icon: PenTool,
    titleKey: "method.2.title",
    frontKey: "method.2.front",
    backKey: "method.2.back",
    defaultTitle: "Guided Practice",
    defaultFront: "Structured problem-solving sessions.",
    defaultBack: "Students apply concepts immediately through curated worksheets and guided exercises, building muscle memory and confidence for board exams."
  },
  {
    id: 3,
    icon: FileText,
    titleKey: "method.3.title",
    frontKey: "method.3.front",
    backKey: "method.3.back",
    defaultTitle: "Continuous Testing",
    defaultFront: "Topic-wise and model exams.",
    defaultBack: "Over 800 mock papers corrected annually. Regular assessments simulate exam conditions to eliminate fear and build exceptional time-management skills."
  },
  {
    id: 4,
    icon: TrendingUp,
    titleKey: "method.4.title",
    frontKey: "method.4.front",
    backKey: "method.4.back",
    defaultTitle: "Performance Analysis",
    defaultFront: "Feedback-driven improvement.",
    defaultBack: "Detailed paper discussions and personalized feedback loops help students identify weak areas and turn them into undeniable strengths."
  }
];

export default function AspireMethod() {
  return (
    <section id="method" className="py-20 px-5 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <EditableText 
            contentKey="method.title" 
            defaultText="The Aspire Method" 
            as="h2" 
            className="font-heading font-semibold text-3xl md:text-4xl text-[var(--color-primary)] mb-4 leading-snug" 
          />
          <EditableText 
            contentKey="method.subtitle" 
            defaultText="Our proven 4-step framework for academic excellence." 
            as="p" 
            className="font-body text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed" 
          />
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="group perspective-1000 h-80 w-full cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
                
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-center justify-center text-center overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-9xl font-black text-gray-50 opacity-50 select-none pointer-events-none">
                    0{step.id}
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-[var(--color-light)] rounded-full flex items-center justify-center mb-6 text-[var(--color-primary)] shadow-sm">
                      <step.icon size={32} />
                    </div>
                    <EditableText 
                      contentKey={step.titleKey} 
                      defaultText={step.defaultTitle} 
                      as="h3" 
                      className="font-heading text-xl font-bold text-[var(--color-primary)] mb-3" 
                    />
                    <EditableText 
                      contentKey={step.frontKey} 
                      defaultText={step.defaultFront} 
                      as="p" 
                      className="font-body text-gray-600 font-medium" 
                    />
                  </div>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[var(--color-primary)] rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center text-white overflow-hidden">
                  <div className="absolute -bottom-4 -left-4 text-9xl font-black text-white opacity-5 select-none pointer-events-none">
                    0{step.id}
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <EditableText 
                      contentKey={step.titleKey} 
                      defaultText={step.defaultTitle} 
                      as="h3" 
                      className="font-heading text-xl font-bold mb-4 text-[var(--color-accent)]" 
                    />
                    <EditableText 
                      contentKey={step.backKey} 
                      defaultText={step.defaultBack} 
                      as="p" 
                      className="font-body text-white/90 leading-relaxed text-sm md:text-base" 
                      multiline 
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
