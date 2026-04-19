import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-background text-foreground border-t border-neonaccent/30">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl lg:text-3xl uppercase mb-4 text-neonaccent">The Palms</h3>
            <p className="font-paragraph text-base text-foreground/90">
              Restro & Bar
            </p>
            <p className="font-paragraph text-sm text-foreground/80 mt-4">
              Experience exceptional North Indian cuisine in a vibrant atmosphere.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg lg:text-xl uppercase mb-4 text-neonaccent">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-neonaccent" />
                <p className="font-paragraph text-sm text-foreground/90">
                  E 44, NRB Road, near Kalagram, MIDC Industrial Area, Chilkalthana, Chhatrapati Sambhajinagar, Maharashtra 431006
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0 text-neonaccent" />
                <a href="tel:08698040999" className="font-paragraph text-sm text-foreground/90 hover:text-neonaccent transition-colors">
                  086980 40999
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="flex-shrink-0 text-neonaccent" />
                <p className="font-paragraph text-sm text-foreground/90">
                  Open Daily · Closes 11 PM
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg lg:text-xl uppercase mb-4 text-neonaccent">Services</h4>
            <ul className="space-y-2 font-paragraph text-sm text-foreground/90">
              <li>Dine-in</li>
              <li>Drive-through</li>
              <li>No-contact delivery</li>
              <li>Order online</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neonaccent/20">
          <p className="font-paragraph text-sm text-foreground/70 text-center">
            © {new Date().getFullYear()} The Palms Restro & Bar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
