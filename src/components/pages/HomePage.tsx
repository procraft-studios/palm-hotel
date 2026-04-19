import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, MapPin, Clock, Phone, ArrowRight, Utensils, Wine, Users, Flame, ChefHat } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { MenuItems } from '@/entities';

// --- Image Constants ---
const HERO_IMAGE = "https://static.wixstatic.com/media/d4f547_fdfefda93b0241bfac3b68de33198c96~mv2.png?originWidth=1920&originHeight=1024";
const ABOUT_IMAGE = "https://static.wixstatic.com/media/d4f547_23ed99c15dd449b4aab073790a37afeb~mv2.png?originWidth=576&originHeight=448?originWidth=1200&originHeight=800";
const AMBIANCE_1 = "https://static.wixstatic.com/media/d4f547_fdfefda93b0241bfac3b68de33198c96~mv2.png?originWidth=800&originHeight=600";
const AMBIANCE_2 = "https://static.wixstatic.com/media/d4f547_ac459f106b774b6bb881cce1f9f28544~mv2.png?originWidth=576&originHeight=448?originWidth=800&originHeight=600";
const EXPERIENCE_IMAGE = "https://static.wixstatic.com/media/d4f547_fdfefda93b0241bfac3b68de33198c96~mv2.png?originWidth=1200&originHeight=800";

const SERVICES = [
  { id: 'dine-in', title: 'Dine-in Experience', description: 'Elegant ambiance with exceptional service and authentic North Indian cuisine.', icon: Utensils },
  { id: 'wine', title: 'Premium Bar', description: 'Curated selection of wines and spirits to complement your meal.', icon: Wine },
  { id: 'events', title: 'Private Events', description: 'Host your special occasions in our sophisticated event spaces.', icon: Users },
  { id: 'catering', title: 'Catering', description: 'Professional catering services for corporate and personal events.', icon: Flame },
];

export default function HomePage() {
  const [featuredItems, setFeaturedItems] = useState<MenuItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const breatherRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.3]);

  const { scrollYProgress: breatherScroll } = useScroll({
    target: breatherRef,
    offset: ["start end", "end start"]
  });
  const breatherY = useTransform(breatherScroll, [0, 1], ["-15%", "15%"]);

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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-grow flex flex-col w-full overflow-clip">
        
        {/* SECTION 1: HERO - PROFESSIONAL ELEGANCE */}
        <section className="w-full relative overflow-hidden">
          <div ref={heroRef} className="w-full h-[70vh] lg:h-screen relative overflow-hidden">
            <motion.div 
              style={{ y: heroY, opacity: heroOpacity }} 
              className="absolute inset-0 w-full h-[140%] -top-[20%]"
            >
              <Image
                src={HERO_IMAGE}
                alt="The Palms restaurant - Premium North Indian Cuisine"
                className="w-full h-full object-cover"
                width={1920}
              />
            </motion.div>
            
            {/* Professional Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/75" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center max-w-4xl"
              >
                <p className="font-paragraph text-lg lg:text-xl text-white/80 mb-4 uppercase tracking-widest">Welcome to Excellence</p>
                <h1 className="font-heading text-6xl lg:text-8xl uppercase text-white mb-6 tracking-tight leading-none">
                  The Palms
                </h1>
                <p className="font-paragraph text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Authentic North Indian Cuisine in an Elegant Setting
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <a
                    href="tel:08698040999"
                    className="bg-neonaccent text-primary px-10 py-4 font-heading text-lg uppercase tracking-widest hover:opacity-90 transition-all"
                  >
                    Reserve Table
                  </a>
                  <Link
                    to="/menu"
                    className="border-2 border-white text-white px-10 py-4 font-heading text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    View Menu
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ABOUT - IMAGE + TEXT */}
        <section className="w-full bg-background py-20 lg:py-32">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] lg:h-[500px] overflow-hidden"
              >
                <Image
                  src={ABOUT_IMAGE}
                  alt="The Palms restaurant interior - Elegant dining"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <ChefHat size={24} className="text-neonaccent" />
                  <p className="font-heading text-sm uppercase tracking-widest text-neonaccent">About Us</p>
                </div>
                <h2 className="font-heading text-4xl lg:text-5xl uppercase mb-6 text-foreground leading-tight">
                  Culinary Excellence Since Day One
                </h2>
                <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                  The Palms is a premier destination for authentic North Indian cuisine, crafted with passion and precision. Our chefs bring decades of culinary expertise to every dish, using only the finest ingredients and traditional cooking methods.
                </p>
                <p className="font-paragraph text-lg text-foreground/80 mb-8 leading-relaxed">
                  From our signature biryanis to our delicate tandoori preparations, every meal is an experience. We believe in creating not just food, but memories that last a lifetime.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:08698040999"
                    className="bg-neonaccent text-primary px-8 py-3 font-heading uppercase tracking-widest text-center hover:opacity-90 transition-all"
                  >
                    Call Us
                  </a>
                  <Link
                    to="/contact"
                    className="border-2 border-neonaccent text-neonaccent px-8 py-3 font-heading uppercase tracking-widest text-center hover:bg-neonaccent hover:text-primary transition-all"
                  >
                    Get in Touch
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INFO GRID */}
        <section className="w-full bg-accent border-y border-primary">
          <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 lg:p-12 flex flex-col justify-between min-h-[200px] group hover:bg-primary hover:text-accent transition-colors duration-300"
            >
              <MapPin size={32} className="mb-8 group-hover:text-accent transition-colors" />
              <div>
                <h3 className="font-heading text-sm uppercase tracking-widest mb-2 opacity-70">Location</h3>
                <p className="font-paragraph text-lg lg:text-xl leading-tight">
                  E 44, NRB Road, near Kalagram, MIDC Industrial Area, Chilkalthana
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 lg:p-12 flex flex-col justify-between min-h-[200px] group hover:bg-primary hover:text-accent transition-colors duration-300"
            >
              <Clock size={32} className="mb-8 group-hover:text-accent transition-colors" />
              <div>
                <h3 className="font-heading text-sm uppercase tracking-widest mb-2 opacity-70">Hours</h3>
                <p className="font-paragraph text-lg lg:text-xl leading-tight">
                  Open Daily<br />Closes 11:00 PM
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 lg:p-12 flex flex-col justify-between min-h-[200px] group hover:bg-primary hover:text-accent transition-colors duration-300"
            >
              <Phone size={32} className="mb-8 group-hover:text-accent transition-colors" />
              <div>
                <h3 className="font-heading text-sm uppercase tracking-widest mb-2 opacity-70">Contact</h3>
                <a href="tel:08698040999" className="font-paragraph text-lg lg:text-xl leading-tight hover:underline decoration-2 underline-offset-4">
                  086980 40999
                </a>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SECTION 4: FEATURED MENU */}
        <section className="w-full bg-background py-24 lg:py-32">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <div>
                <p className="font-heading text-sm uppercase tracking-widest text-neonaccent mb-4">Our Selection</p>
                <h2 className="font-heading text-5xl lg:text-6xl uppercase text-foreground leading-tight">
                  Featured<br />Dishes
                </h2>
              </div>
              <Link
                to="/menu"
                className="inline-flex items-center gap-4 font-heading text-lg uppercase tracking-widest border-b-2 border-neonaccent pb-2 text-neonaccent hover:text-foreground hover:border-foreground transition-colors"
              >
                View Full Menu <ArrowRight size={24} />
              </Link>
            </motion.div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div key={`skeleton-${idx}`} className="flex flex-col h-full animate-pulse">
                    <div className="w-full aspect-square bg-accent mb-6" />
                    <div className="h-8 bg-accent w-3/4 mb-4" />
                    <div className="h-4 bg-accent w-full mb-2" />
                    <div className="h-4 bg-accent w-2/3 mt-auto" />
                  </div>
                ))
              ) : featuredItems.length > 0 ? (
                featuredItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col group"
                  >
                    <div className="w-full aspect-square overflow-hidden mb-6 relative bg-accent">
                      <Image
                        src={item.image || HERO_IMAGE}
                        alt={item.dishName || 'Menu item'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        width={400}
                      />
                    </div>
                    
                    <div className="flex-grow flex flex-col">
                      <h3 className="font-heading text-xl uppercase leading-tight mb-3 text-foreground group-hover:text-neonaccent transition-colors">
                        {item.dishName}
                      </h3>
                      <p className="font-paragraph text-base text-foreground/70 mb-6 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-accent pt-4">
                        <span className="font-heading text-lg text-neonaccent">₹{item.price}</span>
                        <span className="font-paragraph text-xs uppercase tracking-widest text-foreground/60">{item.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center">
                  <p className="font-paragraph text-xl text-foreground/50">Menu items are currently being updated.</p>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* SECTION 5: AMBIANCE GALLERY */}
        <section className="w-full bg-accent py-24 lg:py-32">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <p className="font-heading text-sm uppercase tracking-widest text-neonaccent mb-4">Experience</p>
              <h2 className="font-heading text-5xl lg:text-6xl uppercase text-foreground leading-tight">
                Ambiance & Atmosphere
              </h2>
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="relative h-[400px] lg:h-[500px] overflow-hidden group"
              >
                <Image
                  src={AMBIANCE_1}
                  alt="The Palms restaurant - Elegant dining ambiance"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={600}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative h-[400px] lg:h-[500px] overflow-hidden group"
              >
                <Image
                  src={AMBIANCE_2}
                  alt="The Palms restaurant - Bar and lounge area"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={600}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 6: SERVICES */}
        <section className="w-full bg-background py-24 lg:py-32">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <p className="font-heading text-sm uppercase tracking-widest text-neonaccent mb-4">Services</p>
              <h2 className="font-heading text-5xl lg:text-6xl uppercase text-foreground leading-tight">
                How We Serve
              </h2>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-accent p-8 lg:p-10 flex flex-col group hover:bg-neonaccent hover:text-primary transition-all duration-300"
                  >
                    <div className="mb-8 p-4 rounded-full border-2 border-neonaccent inline-block group-hover:border-primary group-hover:bg-primary/10 transition-all">
                      <Icon size={32} className="text-neonaccent group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-heading text-2xl uppercase mb-4 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-paragraph text-base text-foreground/70 group-hover:text-primary/80 transition-colors">
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 7: TESTIMONIAL + CTA */}
        <section className="w-full relative h-[70vh] lg:h-screen overflow-hidden flex items-center justify-center">
          
          {/* Background Image */}
          <div ref={breatherRef} className="absolute inset-0 w-full h-full">
            <motion.div style={{ y: breatherY }} className="absolute inset-0 w-full h-[140%] -top-[20%]">
              <Image
                src={EXPERIENCE_IMAGE}
                alt="The Palms restaurant - Premium dining experience"
                className="w-full h-full object-cover opacity-50"
                width={1920}
              />
            </motion.div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={32} className="text-neonaccent" fill="#E6FF00" />
                ))}
              </div>
              <h2 className="font-heading text-4xl lg:text-6xl uppercase text-white mb-6 tracking-tight leading-tight">
                "A Culinary Landmark in Chhatrapati Sambhajinagar"
              </h2>
              <p className="font-paragraph text-xl text-white/90 mb-12">
                Join 1,800+ guests who have rated us 4.3 stars on Google
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="tel:08698040999"
                  className="w-full sm:w-auto bg-neonaccent text-primary px-12 py-5 font-heading text-lg uppercase tracking-widest hover:opacity-90 transition-all"
                >
                  Book a Table
                </a>
                <Link
                  to="/menu"
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-12 py-5 font-heading text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Order Online
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
