import { Phone, MapPin, MessageCircle, Menu, X, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditableText from './EditableText';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="bg-[var(--color-primary)] text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:+919843318566" className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors">
              <Phone size={14} />
              <EditableText
                contentKey="contact.phone1"
                defaultText="+91 98433 18566"
                as="span"
              />
            </a>
            <span className="hidden sm:inline">|</span>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <EditableText
                contentKey="contact.address"
                defaultText="Ganapathy, Coimbatore"
                as="span"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/aspire_academics_ganapathy?igsh=YzZ3ZGlldzV1anZw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--color-accent)] hover:text-white transition-colors font-semibold"
              aria-label="Instagram Profile"
            >
              <Instagram size={14} />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a 
              href="https://wa.me/919843318566" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[var(--color-accent)] hover:text-white transition-colors font-semibold"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Quick Link</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--color-primary)] text-[var(--color-accent)] flex items-center justify-center rounded-sm font-heading font-bold text-xl">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-[var(--color-primary)] text-xl leading-none tracking-tight">ASPIRE</span>
              <span className="font-heading font-semibold text-[var(--color-accent)] text-xs tracking-widest uppercase">Academics</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-5 xl:gap-8">
            {navLinks.map((link) => (
              link.isInternal ? (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="relative text-xs lg:text-base xl:text-lg font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors py-2 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="relative text-xs lg:text-base xl:text-lg font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)] transition-colors py-2 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            ))}
            <a 
              href="#contact" 
              className="bg-[var(--color-primary)] text-white px-3 py-2 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3 rounded-sm text-xs lg:text-base xl:text-lg font-semibold hover:bg-[var(--color-accent)] hover:text-[var(--color-primary)] transition-all duration-300 shadow-sm whitespace-nowrap"
            >
              Enroll Now
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[var(--color-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              link.isInternal ? (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className="text-base font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-base font-semibold text-[var(--color-dark)] hover:text-[var(--color-primary)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <a 
              href="#contact" 
              className="bg-[var(--color-primary)] text-white text-center px-5 py-3 rounded-sm text-base font-semibold mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enroll Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
