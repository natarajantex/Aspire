import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

export default function Gallery() {
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

    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 4000);

    return () => clearInterval(autoplay);
  }, [emblaApi, onInit, onSelect, isHovered]);

  const images = [
    { key: "gallery.image.1", src: "https://picsum.photos/seed/classroom1/800/600", alt: "Interactive classroom sessions" },
    { key: "gallery.image.2", src: "https://picsum.photos/seed/classroom2/800/600", alt: "Students writing topic-wise tests" },
    { key: "gallery.image.3", src: "https://picsum.photos/seed/classroom3/800/600", alt: "Teacher explaining on whiteboard" },
    { key: "gallery.image.4", src: "https://picsum.photos/seed/classroom4/800/600", alt: "Paper correction discussion" },
    { key: "gallery.image.5", src: "https://picsum.photos/seed/classroom5/800/600", alt: "Parent meeting" },
    { key: "gallery.image.6", src: "https://picsum.photos/seed/classroom6/800/600", alt: "Smart classroom learning" },
  ];

  return (
    <section id="gallery" className="py-16 md:py-20 px-5 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <EditableText
            contentKey="gallery.title"
            defaultText="Life at Aspire Academics"
            as="h2"
            className="font-heading font-semibold text-2xl md:text-4xl text-[var(--color-primary)] mb-4 mt-10 leading-snug"
          />
          <EditableText
            contentKey="gallery.subtitle"
            defaultText="A glimpse into our classrooms, interactive sessions, and student success moments."
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
            <div className="flex -ml-4">
              {images.map((img, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                  <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-[300px] group/item">
                    <EditableImage 
                      contentKey={img.key}
                      defaultSrc={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-end pointer-events-none">
                      <p className="text-white p-4 font-body text-base font-medium">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-md hover:bg-white transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-primary)] shadow-md hover:bg-white transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0"
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
