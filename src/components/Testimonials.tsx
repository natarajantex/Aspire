import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import EditableText from './EditableText';

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi, onInit, onSelect]);

  const testimonials = [
    {
      textKey: "testimonial.1.text",
      defaultText: "The regular test batches helped me clearly understand my mistakes. My performance improved with every test.",
      nameKey: "testimonial.1.author",
      defaultName: "Yogesh"
    },
    {
      textKey: "testimonial.2.text",
      defaultText: "The teachers are knowledgeable, patient, and always willing to help. The learning environment is very supportive.",
      nameKey: "testimonial.2.author",
      defaultName: "Krishnakumari Kathir"
    },
    {
      textKey: "testimonial.3.text",
      defaultText: "Consistent testing and personal attention helped my child gain confidence for board exams.",
      nameKey: "testimonial.3.author",
      defaultName: "Malathy"
    },
    {
      textKey: "testimonial.4.text",
      defaultText: "Strong focus on fundamentals and periodic assessments greatly improved academic performance.",
      nameKey: "testimonial.4.author",
      defaultName: "Bavan"
    },
    {
      textKey: "testimonial.5.text",
      defaultText: "Caring teachers and structured coaching have brought visible improvement in my daughter's learning.",
      nameKey: "testimonial.5.author",
      defaultName: "Vijaya"
    },
    {
      textKey: "testimonial.6.text",
      defaultText: "We are truly grateful to Aspire Tuition Center. My son joined in 9th grade, and now he is in 10th. The improvement in his studies and confidence is remarkable. The teachers are excellent, caring, and supportive.",
      nameKey: "testimonial.6.author",
      defaultName: "Renuka Devi"
    },
    {
      textKey: "testimonial.7.text",
      defaultText: "I joined for Class 12 from Camford School. Each subject is handled by specialized faculty. Individual attention helped me clarify doubts, and frequent tests keep me practicing. I am very confident now. Thank you Aspire.",
      nameKey: "testimonial.7.author",
      defaultName: "Sahaya Selven"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-20 px-5 bg-[var(--color-light)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <EditableText
            contentKey="testimonials.title"
            defaultText="What Our Students & Parents Say"
            as="h2"
            className="font-heading font-semibold text-2xl md:text-4xl text-[var(--color-primary)] mb-4 mt-10 leading-snug"
          />
          <EditableText
            contentKey="testimonials.subtitle"
            defaultText="Real experiences. Real improvement. Real confidence."
            as="p"
            className="font-body text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
          />
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full mt-6"></div>
        </div>

        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6 py-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6">
                  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full flex flex-col">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                      ))}
                    </div>
                    <EditableText
                      contentKey={testimonial.textKey}
                      defaultText={testimonial.defaultText}
                      as="p"
                      className="font-body text-base text-gray-700 italic mb-8 flex-grow leading-relaxed"
                      multiline
                    />
                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                      <div className="w-10 h-10 bg-[var(--color-light)] rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold">
                        {testimonial.defaultName.charAt(0)}
                      </div>
                      <EditableText
                        contentKey={testimonial.nameKey}
                        defaultText={`— ${testimonial.defaultName}`}
                        as="p"
                        className="font-heading font-semibold text-base md:text-lg text-[var(--color-primary)]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? 'bg-[var(--color-primary)] w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
