// HPI 1.7-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MapPin, Clock, Phone, ArrowRight, Utensils, Car, ShoppingBag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { MenuItems } from '@/entities';

// --- Constants & Placeholders ---
const PLACEHOLDER_IMAGE = "https://static.wixstatic.com/media/d4f547_fdfefda93b0241bfac3b68de33198c96~mv2.png?originWidth=1920&originHeight=1024";

const SERVICES = [
  { id: 'dine-in', title: 'Dine-in', description: 'Experience our vibrant atmosphere and exceptional service in person.', icon: Utensils, color: '#FF006E' },
  { id: 'drive-through', title: 'Drive-through', description: 'Quick and convenient pickup without leaving your vehicle.', icon: Car, color: '#00D9FF' },
  { id: 'delivery', title: 'No-contact delivery', description: 'Safe delivery right to your doorstep with contactless options.', icon: ShoppingBag, color: '#00FF88' },
  { id: 'online', title: 'Order online', description: 'Browse our menu and place orders from the comfort of home.', icon: ArrowRight, color: '#FF6B35' },
];

export default function HomePage() {
  // --- Canonical Data Sources ---
  const [featuredItems, setFeaturedItems] = useState<MenuItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Refs for Scroll Animations ---
  const heroRef = useRef<HTMLDivElement>(null);
  const breatherRef = useRef<HTMLDivElement>(null);

  // --- Scroll Hooks ---
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.2]);

  const { scrollYProgress: breatherScroll } = useScroll({
    target: breatherRef,
    offset: ["start end", "end start"]
  });
  const breatherY = useTransform(breatherScroll, [0, 1], ["-20%", "20%"]);

  // --- Data Fetching ---
  useEffect(() => {
    loadFeaturedItems();
  }, []);

  const loadFeaturedItems = async () => {
    try {
      const result = await BaseCrudService.getAll<MenuItems>('menuitems', {}, { limit: 4 });
      setFeaturedItems(result.items);
    } catch (error) {
      console.error('Error loading featured items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-neonaccent selection:text-primary">
      <Header />

      <main className="flex-grow flex flex-col w-full overflow-clip">
        
        {/* 
          =========================================
          SECTION 1: HERO - MULTICOLOR CREATIVE
          =========================================
        */}
        <section className="w-full pt-24 lg:pt-32 flex flex-col relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-neonpink rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-neonblue rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-neonpurple rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
          </div>

          {/* Top Text Grid */}
          <div className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 pb-12 lg:pb-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="font-paragraph text-xl lg:text-3xl leading-tight max-w-lg bg-gradient-to-r from-neonaccent via-neonpink to-neonblue bg-clip-text text-transparent">
                  Discover authentic North Indian flavors in a vibrant, contemporary setting.
                </p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="md:justify-self-end"
              >
                <p className="font-paragraph text-xl lg:text-3xl leading-tight max-w-lg bg-gradient-to-r from-neongreen via-neonblue to-neonorange bg-clip-text text-transparent">
                  From sizzling starters to aromatic biryanis, every dish tells a story of culinary excellence.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Gradient Divider */}
          <div className="w-full h-1 bg-gradient-to-r from-neonpink via-neonaccent to-neonblue relative z-10" />

          {/* Massive Typography with Gradient */}
          <div className="w-full overflow-hidden py-4 lg:py-8 flex justify-center items-center bg-gradient-to-r from-dark-bg via-dark-card to-dark-bg relative z-10">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[18vw] leading-[0.75] tracking-tighter uppercase m-0 p-0 bg-gradient-to-r from-neonaccent via-neonpink to-neonorange bg-clip-text text-transparent whitespace-nowrap"
            >
              THE PALMS
            </motion.h1>
          </div>

          {/* Gradient Divider */}
          <div className="w-full h-1 bg-gradient-to-r from-neonblue via-neonpurple to-neonorange relative z-10" />

          {/* Hero Image with Parallax */}
          <div ref={heroRef} className="w-full h-[60vh] lg:h-[80vh] relative overflow-hidden bg-gradient-to-br from-neonpink/20 to-neonblue/20">
            <motion.div 
              style={{ y: heroY, opacity: heroOpacity }} 
              className="absolute inset-0 w-full h-[140%] -top-[20%]"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="The Palms restaurant interior"
                className="w-full h-full object-cover"
                width={1920}
              />
              {/* Colorful overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neonpink/40 via-transparent to-neonblue/40 mix-blend-overlay pointer-events-none" />
            </motion.div>
            
            {/* Floating Action Button with Gradient */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
              className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-10"
            >
              <a
                href="tel:08698040999"
                className="flex items-center justify-center w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-neonaccent to-neonorange text-primary font-heading text-lg lg:text-xl uppercase tracking-widest hover:scale-110 transition-transform duration-300 shadow-2xl hover:shadow-neonaccent/50"
              >
                Reserve
              </a>
            </motion.div>
          </div>
        </section>

        {/* 
          =========================================
          SECTION 2: INFO GRID (Modular & Stark)
          =========================================
        */}
        <section className="w-full bg-accent border-b border-primary">
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary">
            
            <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[200px] group hover:bg-primary hover:text-accent transition-colors duration-300">
              <MapPin size={32} className="mb-8 group-hover:text-accent transition-colors" />
              <div>
                <h3 className="font-heading text-sm uppercase tracking-widest mb-2 opacity-70">Location</h3>
                <p className="font-paragraph text-lg lg:text-xl leading-tight">
                  E 44, NRB Road, near Kalagram, MIDC Industrial Area, Chilkalthana
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[200px] group hover:bg-primary hover:text-accent transition-colors duration-300">
              <Clock size={32} className="mb-8 group-hover:text-accent transition-colors" />
              <div>
                <h3 className="font-heading text-sm uppercase tracking-widest mb-2 opacity-70">Hours</h3>
                <p className="font-paragraph text-lg lg:text-xl leading-tight">
                  Open Daily<br />Closes 11:00 PM
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between min-h-[200px] group hover:bg-primary hover:text-accent transition-colors duration-300">
              <Phone size={32} className="mb-8 group-hover:text-accent transition-colors" />
              <div>
                <h3 className="font-heading text-sm uppercase tracking-widest mb-2 opacity-70">Contact</h3>
                <a href="tel:08698040999" className="font-paragraph text-lg lg:text-xl leading-tight hover:underline decoration-2 underline-offset-4">
                  086980 40999
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* 
          =========================================
          SECTION 3: FEATURED MENU - COLORFUL
          =========================================
        */}
        <section className="w-full bg-gradient-to-b from-dark-bg to-dark-card py-24 lg:py-32 border-b border-neonaccent/30">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="font-heading text-5xl lg:text-7xl uppercase tracking-tighter leading-none bg-gradient-to-r from-neonaccent via-neonpink to-neonorange bg-clip-text text-transparent">
                Featured<br />Dishes
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link
                to="/menu"
                className="inline-flex items-center gap-4 font-heading text-xl uppercase tracking-widest border-b-2 border-neonaccent pb-1 text-neonaccent hover:text-neonorange hover:border-neonorange transition-colors"
              >
                View Full Menu <ArrowRight size={24} />
              </Link>
            </motion.div>
          </div>

          {/* The Grid - Colorful borders */}
          <div className="w-full border-y border-neonaccent/30 bg-dark-card">
            <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gradient-to-r from-neonpink via-neonblue to-neonorange p-px">
              
              {isLoading ? (
                // Loading State
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={`skeleton-${idx}`} className="bg-dark-card p-6 lg:p-8 flex flex-col h-[500px] animate-pulse">
                    <div className="w-full aspect-square bg-neonaccent/10 mb-6" />
                    <div className="h-8 bg-neonaccent/10 w-3/4 mb-4" />
                    <div className="h-4 bg-neonaccent/10 w-full mb-2" />
                    <div className="h-4 bg-neonaccent/10 w-2/3 mt-auto" />
                  </div>
                ))
              ) : featuredItems.length > 0 ? (
                // Data State
                featuredItems.map((item, index) => {
                  const colors = ['from-neonpink to-neonorange', 'from-neonblue to-neonpurple', 'from-neongreen to-neonaccent', 'from-neonorange to-neonpink'];
                  const colorClass = colors[index % colors.length];
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-dark-card p-6 lg:p-8 flex flex-col group cursor-pointer border-l-4 border-neonaccent/50 hover:border-neonorange transition-colors"
                    >
                      <div className="w-full aspect-square overflow-hidden mb-8 relative bg-gradient-to-br from-neonaccent/20 to-neonpink/20">
                        <Image
                          src={item.image || PLACEHOLDER_IMAGE}
                          alt={item.dishName || 'Menu item'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          width={600}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${colorClass} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
                      </div>
                      
                      <div className="flex-grow flex flex-col">
                        <h3 className="font-heading text-2xl uppercase leading-tight mb-3 bg-gradient-to-r from-neonaccent to-neonorange bg-clip-text text-transparent group-hover:from-neonpink group-hover:to-neonblue transition-all">
                          {item.dishName}
                        </h3>
                        <p className="font-paragraph text-base text-secondary/70 mb-6 line-clamp-3">
                          {item.description}
                        </p>
                        <div className="mt-auto flex items-center justify-between border-t border-neonaccent/20 pt-4">
                          <span className="font-heading text-xl bg-gradient-to-r from-neonaccent to-neonorange bg-clip-text text-transparent">₹{item.price}</span>
                          <span className="font-paragraph text-sm uppercase tracking-widest text-neonblue/70">{item.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                // Empty State
                <div className="col-span-full bg-dark-card py-24 text-center">
                  <p className="font-paragraph text-xl text-secondary/50">Menu items are currently being updated.</p>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* 
          =========================================
          SECTION 4: SERVICES - MULTICOLOR GRID
          =========================================
        */}
        <section className="w-full bg-gradient-to-b from-dark-card to-dark-bg relative border-b border-neonaccent/30">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-24 lg:py-32 flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:w-1/3 relative">
              <div className="lg:sticky lg:top-32">
                <h2 className="font-heading text-5xl lg:text-7xl uppercase tracking-tighter leading-none mb-8 bg-gradient-to-r from-neonaccent via-neonpink to-neonorange bg-clip-text text-transparent">
                  How We<br />Serve
                </h2>
                <p className="font-paragraph text-lg lg:text-xl text-secondary/80 max-w-md">
                  Whether you're joining us for an evening out or enjoying our flavors at home, we ensure an uncompromising standard of quality.
                </p>
              </div>
            </div>

            {/* Scrolling Right Column - Grid */}
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-px bg-gradient-to-r from-neonpink via-neonblue to-neonorange p-px">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-dark-card p-8 lg:p-12 flex flex-col group hover:bg-gradient-to-br hover:from-neonaccent/20 hover:to-neonorange/20 transition-all duration-300"
                  >
                    <div className={`mb-12 p-4 rounded-full border-2 inline-block self-start group-hover:scale-110 transition-transform`} style={{
                      borderColor: service.color
                    }}>
                      <Icon size={32} strokeWidth={1.5} style={{
                        color: service.color
                      }} />
                    </div>
                    <h3 className="font-heading text-3xl uppercase mb-4 text-secondary">
                      {service.title}
                    </h3>
                    <p className="font-paragraph text-base text-secondary/70 group-hover:text-secondary/90 transition-opacity">
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 
          =========================================
          SECTION 5: VISUAL BREATHER & FINAL CTA
          =========================================
        */}
        <section className="w-full relative h-[80vh] lg:h-screen overflow-hidden bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center">
          
          {/* Parallax Background */}
          <div ref={breatherRef} className="absolute inset-0 w-full h-full">
            <motion.div style={{ y: breatherY }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Atmospheric restaurant detail"
                className="w-full h-full object-cover opacity-40"
                width={1920}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neonpink/30 via-transparent to-neonblue/30 mix-blend-overlay" />
            </motion.div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Star size={48} className="mx-auto mb-8 text-neonaccent" fill="#E6FF00" />
              <h2 className="font-heading text-4xl lg:text-6xl uppercase text-secondary mb-6 tracking-tight">
                "A culinary landmark in Chhatrapati Sambhajinagar."
              </h2>
              <p className="font-paragraph text-xl text-secondary/80 mb-12">
                Join 1,800+ guests who have rated us 4.3 stars.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="tel:08698040999"
                  className="w-full sm:w-auto bg-gradient-to-r from-neonaccent to-neonorange text-primary px-12 py-5 font-heading text-lg uppercase tracking-widest hover:shadow-lg hover:shadow-neonorange/50 transition-all"
                >
                  Book a Table
                </a>
                <Link
                  to="/menu"
                  className="w-full sm:w-auto bg-transparent border-2 border-neonaccent text-neonaccent px-12 py-5 font-heading text-lg uppercase tracking-widest hover:bg-neonaccent hover:text-primary transition-all"
                >
                  Order Online
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Decorative Marquee at bottom */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-gradient-to-r from-neonpink via-neonaccent to-neonorange py-3 border-t border-neonaccent/50 flex whitespace-nowrap">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex items-center font-heading text-primary text-xl uppercase tracking-widest"
            >
              <span className="mx-4">•</span> THE PALMS RESTRO & BAR <span className="mx-4">•</span> AUTHENTIC NORTH INDIAN <span className="mx-4">•</span> DINE-IN <span className="mx-4">•</span> DELIVERY <span className="mx-4">•</span>
              <span className="mx-4">•</span> THE PALMS RESTRO & BAR <span className="mx-4">•</span> AUTHENTIC NORTH INDIAN <span className="mx-4">•</span> DINE-IN <span className="mx-4">•</span> DELIVERY <span className="mx-4">•</span>
              <span className="mx-4">•</span> THE PALMS RESTRO & BAR <span className="mx-4">•</span> AUTHENTIC NORTH INDIAN <span className="mx-4">•</span> DINE-IN <span className="mx-4">•</span> DELIVERY <span className="mx-4">•</span>
              <span className="mx-4">•</span> THE PALMS RESTRO & BAR <span className="mx-4">•</span> AUTHENTIC NORTH INDIAN <span className="mx-4">•</span> DINE-IN <span className="mx-4">•</span> DELIVERY <span className="mx-4">•</span>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
