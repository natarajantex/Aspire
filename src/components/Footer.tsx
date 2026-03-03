import EditableText from './EditableText';

export default function Footer() {
  return (
    <footer className="bg-[#0f1b36] text-white/70 py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[var(--color-accent)] text-[var(--color-primary)] flex items-center justify-center rounded-sm font-heading font-bold text-xl">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-white text-xl leading-none tracking-tight">ASPIRE</span>
              <span className="font-heading font-semibold text-[var(--color-accent)] text-xs tracking-widest uppercase">Academics</span>
            </div>
          </a>
          <EditableText
            contentKey="footer.desc"
            defaultText="Building strong concepts and achieving academic excellence through structured coaching, continuous assessment, and personalized mentoring."
            as="p"
            className="font-body text-sm leading-relaxed max-w-sm"
            multiline
          />
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-white mb-6 text-lg">Quick Links</h4>
          <ul className="space-y-3 font-body text-sm">
            <li><a href="#home" className="hover:text-[var(--color-accent)] transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-[var(--color-accent)] transition-colors">About Us</a></li>
            <li><a href="#courses" className="hover:text-[var(--color-accent)] transition-colors">Courses</a></li>
            <li><a href="#gallery" className="hover:text-[var(--color-accent)] transition-colors">Gallery</a></li>
            <li><a href="#testimonials" className="hover:text-[var(--color-accent)] transition-colors">Testimonials</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-bold text-white mb-6 text-lg">Contact Us</h4>
          <ul className="space-y-3 font-body text-sm">
            <li>
              <EditableText
                contentKey="contact.address"
                defaultText="Ganapathy, Coimbatore"
                as="span"
              />
            </li>
            <li>Tamil Nadu, India</li>
            <li className="pt-2">
              <a href="tel:+919843318566" className="hover:text-[var(--color-accent)] transition-colors block">
                <EditableText
                  contentKey="contact.phone1"
                  defaultText="+91 98433 18566"
                  as="span"
                />
              </a>
              <a href="tel:+919843523479" className="hover:text-[var(--color-accent)] transition-colors block">
                <EditableText
                  contentKey="contact.phone2"
                  defaultText="+91 98435 23479"
                  as="span"
                />
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-body">
        <div className="flex items-center gap-1">
          <span>&copy; {new Date().getFullYear()}</span>
          <EditableText
            contentKey="footer.rights"
            defaultText="Aspire Academics. All rights reserved."
            as="span"
          />
        </div>
        <div className="flex gap-6 items-center">
          <a href="/admin" className="hover:text-[var(--color-accent)] transition-colors font-semibold text-white/50 hover:text-white/90">Admin Login</a>
          <span className="text-white/20">|</span>
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
