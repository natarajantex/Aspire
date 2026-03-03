import { Users, FileText, CheckSquare, BookOpen, HelpCircle, LineChart } from 'lucide-react';
import EditableText from './EditableText';

export default function Features() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-[var(--color-accent)]" />,
      titleKey: "feature.1.title",
      defaultTitle: "Small Batch Size for Individual Attention",
      descKey: "feature.1.desc",
      defaultDesc: "Focused learning environment for better understanding and clarity."
    },
    {
      icon: <FileText className="w-8 h-8 text-[var(--color-accent)]" />,
      titleKey: "feature.2.title",
      defaultTitle: "Weekly Topic-Wise Tests & Full-Length Board Exams",
      descKey: "feature.2.desc",
      defaultDesc: "Continuous assessment to ensure complete preparation."
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-[var(--color-accent)]" />,
      titleKey: "feature.3.title",
      defaultTitle: "Personalized Feedback After Every Test",
      descKey: "feature.3.desc",
      defaultDesc: "Detailed correction and guidance for consistent improvement."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[var(--color-accent)]" />,
      titleKey: "feature.4.title",
      defaultTitle: "Structured Study Plan & Timely Syllabus Completion",
      descKey: "feature.4.desc",
      defaultDesc: "Organized learning with zero backlog and proper revision."
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-[var(--color-accent)]" />,
      titleKey: "feature.5.title",
      defaultTitle: "Dedicated Doubt-Clearing Sessions",
      descKey: "feature.5.desc",
      defaultDesc: "Extra support to strengthen difficult concepts."
    },
    {
      icon: <LineChart className="w-8 h-8 text-[var(--color-accent)]" />,
      titleKey: "feature.6.title",
      defaultTitle: "Regular Parent Progress Updates",
      descKey: "feature.6.desc",
      defaultDesc: "Transparent communication and performance tracking."
    }
  ];

  return (
    <section className="bg-[var(--color-light)] py-16 md:py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <EditableText
            contentKey="features.title"
            defaultText="Why Parents Trust Aspire"
            as="h2"
            className="font-heading font-semibold text-2xl md:text-4xl text-[var(--color-primary)] mb-4 mt-10 leading-snug"
          />
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-[var(--color-light)] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <EditableText
                contentKey={feature.titleKey}
                defaultText={feature.defaultTitle}
                as="h3"
                className="font-heading font-medium text-lg md:text-xl text-[var(--color-primary)] mb-3 leading-snug"
              />
              <EditableText
                contentKey={feature.descKey}
                defaultText={feature.defaultDesc}
                as="p"
                className="font-body text-base text-gray-700 leading-relaxed"
                multiline
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <EditableText
            contentKey="features.quote"
            defaultText="We focus on understanding first, marks next — and success follows naturally."
            as="p"
            className="font-heading font-medium text-lg md:text-xl text-[var(--color-primary)] italic leading-snug"
          />
        </div>
      </div>
    </section>
  );
}
