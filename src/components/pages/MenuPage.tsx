import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { MenuItems } from '@/entities';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const result = await BaseCrudService.getAll<MenuItems>('menuitems', {}, { limit: 100 });
      setMenuItems(result.items);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(result.items.map(item => item.category).filter(Boolean) as string[])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-accent">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-5xl lg:text-7xl uppercase text-primary mb-4">
              Our Menu
            </h1>
            <p className="font-paragraph text-base lg:text-lg text-primary/80 max-w-2xl mx-auto">
              Authentic North Indian cuisine crafted with passion and served with pride.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full bg-secondary border-b border-primary/10">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-paragraph text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-primary border border-primary/20 hover:bg-primary/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="w-full bg-gradient-to-b from-dark-bg to-dark-card">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {filteredItems.map((item, index) => {
                  const colors = ['from-neonpink to-neonorange', 'from-neonblue to-neonpurple', 'from-neongreen to-neonaccent'];
                  const colorClass = colors[index % colors.length];
                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-dark-card group hover:bg-gradient-to-br hover:from-dark-card hover:to-dark-bg transition-all border border-neonaccent/20 hover:border-neonorange/50"
                    >
                      <div className="aspect-[4/3] bg-gradient-to-br from-neonaccent/20 to-neonpink/20 mb-4 overflow-hidden relative">
                        <Image
                          src={item.image || 'https://static.wixstatic.com/media/d4f547_98f89a5490a34bdb81ee4d7e94efce43~mv2.png?originWidth=576&originHeight=448'}
                          alt={item.dishName || 'Menu item'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          width={600}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${colorClass} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                      </div>
                      <div className="space-y-2 p-4">
                        {item.category && (
                          <span className="inline-block font-paragraph text-xs uppercase text-neonaccent/70 tracking-wider">
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-heading text-xl lg:text-2xl uppercase text-secondary group-hover:text-neonorange transition-colors">
                          {item.dishName}
                        </h3>
                        {item.description && (
                          <p className="font-paragraph text-sm text-secondary/70 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        <p className="font-heading text-2xl bg-gradient-to-r from-neonaccent to-neonorange bg-clip-text text-transparent pt-2">
                          ₹{item.price}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-paragraph text-lg text-secondary/60">
                  No items found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-accent">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl lg:text-5xl uppercase text-primary mb-6">
              Ready to Order?
            </h2>
            <p className="font-paragraph text-base lg:text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
              Call us now to place your order or reserve a table for an unforgettable dining experience.
            </p>
            <a
              href="tel:08698040999"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 font-paragraph text-base hover:opacity-90 transition-opacity"
            >
              Call 086980 40999
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
