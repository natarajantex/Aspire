import { MapPin, Phone, MessageCircle, Calendar } from 'lucide-react';
import EditableText from './EditableText';

export default function CTA() {
  return (
    <section id="contact" className="py-20 md:py-24 px-5 bg-[var(--color-primary)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-accent)] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-[var(--color-accent)]/20 text-[var(--color-accent)] px-4 py-2 rounded-full font-heading font-semibold text-sm tracking-widest uppercase mb-8 border border-[var(--color-accent)]/30">
          <Calendar size={16} />
          <span>Admissions Open for 2026–27 Academic Year</span>
        </div>

        <EditableText
          contentKey="cta.title"
          defaultText="Secure Your Child's Academic Success Today"
          as="h2"
          className="font-heading font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
        />

        <EditableText
          contentKey="cta.desc"
          defaultText="Limited seats to maintain quality and small batch size. Give your child the advantage of structured preparation and concept clarity."
          as="p"
          className="font-body text-base md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          multiline
        />

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-white/80 font-medium text-base">
          <div className="flex items-center gap-2">
            <MapPin className="text-[var(--color-accent)]" size={20} />
            <EditableText contentKey="contact.address" defaultText="Aspire Academics, Ganapathy, Coimbatore" as="span" />
          </div>
          <span className="hidden md:block text-[var(--color-accent)]">|</span>
          <div className="flex items-center gap-2">
            <Phone className="text-[var(--color-accent)]" size={20} />
            <span>Call Now: <EditableText contentKey="contact.phone1" defaultText="+91 98433 18566" as="span" /> | <EditableText contentKey="contact.phone2" defaultText="+91 98435 23479" as="span" /></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a 
            href="tel:+919843318566" 
            className="bg-white text-[var(--color-primary)] px-8 py-3 min-h-[48px] rounded-lg font-heading font-bold text-base md:text-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Phone size={20} />
            <EditableText contentKey="cta.button1" defaultText="Book a Free Demo Class" as="span" />
          </a>
          <a 
            href="https://wa.me/919843318566" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white text-white px-8 py-3 min-h-[48px] rounded-lg font-heading font-bold text-base md:text-lg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <MessageCircle size={20} />
            <EditableText contentKey="cta.button2" defaultText="WhatsApp for Enquiry" as="span" />
          </a>
        </div>
      </div>
    </section>
  );
}
