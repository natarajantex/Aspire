import EditableText from './EditableText';

export default function TrustStrip() {
  return (
    <section className="bg-white border-y border-[var(--color-accent)]/30 py-10 relative z-20 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 text-center flex flex-col gap-3">
        <div className="w-full overflow-x-auto no-scrollbar pb-2">
          <EditableText
            contentKey="trust.stats"
            defaultText="500+ Students Trained | 100% Board Success | Small Batch Size | Weekly Testing System"
            as="h2"
            className="font-heading font-bold text-[var(--color-primary)] text-sm sm:text-base md:text-lg lg:text-xl tracking-wide whitespace-nowrap px-4"
          />
        </div>
        
        <EditableText
          contentKey="trust.subtitle"
          defaultText="Structured Academic Coaching for Classes 6–12 | CBSE • ICSE • IGCSE"
          as="h3"
          className="font-heading font-bold text-[var(--color-primary)] text-base md:text-lg"
        />
        
        <EditableText
          contentKey="trust.desc"
          defaultText="At Aspire Academics, we don't just complete the syllabus — we build deep conceptual clarity, exam confidence, and consistent results."
          as="p"
          className="font-body text-[var(--color-dark)] text-sm md:text-base max-w-3xl mx-auto leading-relaxed mt-1"
          multiline
        />
        
        <EditableText
          contentKey="trust.cta"
          defaultText="Give your child the confidence to succeed in every examination."
          as="p"
          className="font-heading font-semibold text-[var(--color-primary)] text-base md:text-lg mt-2"
        />
      </div>
    </section>
  );
}
