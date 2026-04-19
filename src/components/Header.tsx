import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-dark-bg via-dark-card to-dark-bg border-b border-neonaccent/30 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="font-heading text-xl lg:text-2xl text-transparent bg-gradient-to-r from-neonaccent via-neonorange to-neonpink bg-clip-text uppercase tracking-tight hover:from-neonpink hover:to-neonblue transition-all">
            The Palms
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base lg:text-lg text-secondary hover:text-neonaccent transition-colors ${
                  location.pathname === link.path ? 'text-neonaccent border-b-2 border-neonaccent pb-1' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="tel:08698040999"
            className="hidden md:block bg-gradient-to-r from-neonaccent to-neonorange text-primary px-6 py-3 font-heading text-base hover:shadow-lg hover:shadow-neonorange/50 transition-all uppercase tracking-widest"
          >
            Call Now
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-neonaccent"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-neonaccent/30">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-lg text-secondary hover:text-neonaccent transition-colors ${
                    location.pathname === link.path ? 'text-neonaccent' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:08698040999"
                className="bg-gradient-to-r from-neonaccent to-neonorange text-primary px-6 py-3 font-heading text-base text-center hover:shadow-lg transition-all mt-2 uppercase tracking-widest"
              >
                Call Now
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
