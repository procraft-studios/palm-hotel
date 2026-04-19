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
    <header className="w-full bg-neonaccent sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="font-heading text-xl lg:text-2xl text-primary uppercase tracking-tight">
            The Palms
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base lg:text-lg text-primary hover:opacity-70 transition-opacity ${
                  location.pathname === link.path ? 'underline' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="tel:08698040999"
            className="hidden md:block bg-primary text-primary-foreground px-6 py-3 font-paragraph text-base hover:opacity-90 transition-opacity"
          >
            Call Now
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-primary/20">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-lg text-primary hover:opacity-70 transition-opacity ${
                    location.pathname === link.path ? 'underline' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:08698040999"
                className="bg-primary text-primary-foreground px-6 py-3 font-paragraph text-base text-center hover:opacity-90 transition-opacity mt-2"
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
