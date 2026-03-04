import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import EditableText from './EditableText';
import EditableVideo from './EditableVideo';

export default function VideoTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

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

    if (isHovered) return;

    // Optional: Auto-scroll
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi, onInit, onSelect, isHovered]);

  const videos = [1, 2, 3, 4, 5, 6];

  return (
    <section className="py-16 md:py-20 px-5 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <EditableText
            contentKey="video.title"
            defaultText="🎥 Hear From Our Students & Parents"
            as="h2"
            className="font-heading font-semibold text-2xl md:text-4xl text-[var(--color-primary)] mb-4 mt-10 leading-snug"
          />
          <EditableText
            contentKey="video.subtitle"
            defaultText="Real stories. Real improvement. Real confidence."
            as="p"
            className="font-body text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
          />
          <div className="w-24 h-1 bg-[var(--color-accent)] mx-auto rounded-full mt-6"></div>
        </div>

        <div 
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 py-4">
              {videos.map((item) => (
                <div key={item} className="flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] pl-4">
                  <div className="flex flex-col gap-4 cursor-pointer group/card h-full">
                    {/* 9:16 Aspect Ratio Container */}
                    <div className="relative w-full pt-[177.77%] bg-[var(--color-light)] rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group-hover/card:border-[var(--color-accent)] group-hover/card:shadow-md">
                      <div className="absolute inset-0">
                        <EditableVideo 
                          contentKey={`video.src.${item}`}
                          posterKey={`video.thumb.${item}`}
                          defaultPoster={`https://picsum.photos/seed/video${item}/400/711`} 
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <EditableText
                        contentKey={`video.desc.${item}`}
                        defaultText={item % 2 === 0 ? "Parent Feedback – Video Upload Pending" : "Student Testimonial – Coming Soon"}
                        as="p"
                        className="font-heading font-medium text-base md:text-lg text-[var(--color-primary)] leading-snug"
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
            className="absolute -left-4 top-[40%] -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute -right-4 top-[40%] -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0 z-10"
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
