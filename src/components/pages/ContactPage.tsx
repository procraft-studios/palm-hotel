import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    senderName: '',
    emailAddress: '',
    phoneNumber: '',
    messageContent: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create<ContactSubmissions>('contactsubmissions', {
        _id: crypto.randomUUID(),
        senderName: formData.senderName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        messageContent: formData.messageContent,
        submissionDate: new Date().toISOString(),
      });

      setSubmitSuccess(true);
      setFormData({
        senderName: '',
        emailAddress: '',
        phoneNumber: '',
        messageContent: '',
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
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
              Get In Touch
            </h1>
            <p className="font-paragraph text-base lg:text-lg text-primary/80 max-w-2xl mx-auto">
              Have questions or want to make a reservation? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="w-full bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl uppercase text-secondary mb-8 bg-gradient-to-r from-neonaccent to-neonorange bg-clip-text text-transparent">
                Visit Us
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-accent p-3 flex-shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase text-primary mb-2">Location</h3>
                    <p className="font-paragraph text-sm text-primary/80 leading-relaxed">
                      E 44, NRB Road, near Kalagram<br />
                      MIDC Industrial Area, Chilkalthana<br />
                      Chhatrapati Sambhajinagar, Maharashtra 431006
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent p-3 flex-shrink-0">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase text-primary mb-2">Phone</h3>
                    <a
                      href="tel:08698040999"
                      className="font-paragraph text-sm text-primary/80 hover:text-primary transition-colors"
                    >
                      086980 40999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent p-3 flex-shrink-0">
                    <Clock size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase text-primary mb-2">Hours</h3>
                    <p className="font-paragraph text-sm text-primary/80">
                      Open Daily<br />
                      Closes 11 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent p-3 flex-shrink-0">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg uppercase text-primary mb-2">Services</h3>
                    <ul className="font-paragraph text-sm text-primary/80 space-y-1">
                      <li>Dine-in</li>
                      <li>Drive-through</li>
                      <li>No-contact delivery</li>
                      <li>Order online</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl lg:text-4xl uppercase text-secondary mb-8 bg-gradient-to-r from-neonpink to-neonorange bg-clip-text text-transparent">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="senderName" className="font-paragraph text-sm text-secondary mb-2 block">
                    Your Name
                  </label>
                  <Input
                    id="senderName"
                    name="senderName"
                    type="text"
                    required
                    value={formData.senderName}
                    onChange={handleChange}
                    className="w-full bg-dark-card border-neonaccent/30 text-secondary focus:border-neonaccent font-paragraph"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="emailAddress" className="font-paragraph text-sm text-secondary mb-2 block">
                    Email Address
                  </label>
                  <Input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    required
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="w-full bg-dark-card border-neonaccent/30 text-secondary focus:border-neonaccent font-paragraph"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="font-paragraph text-sm text-secondary mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-dark-card border-neonaccent/30 text-secondary focus:border-neonaccent font-paragraph"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="messageContent" className="font-paragraph text-sm text-secondary mb-2 block">
                    Message
                  </label>
                  <Textarea
                    id="messageContent"
                    name="messageContent"
                    required
                    value={formData.messageContent}
                    onChange={handleChange}
                    className="w-full bg-dark-card border-neonaccent/30 text-secondary focus:border-neonaccent font-paragraph min-h-[150px]"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-accent p-4"
                  >
                    <p className="font-paragraph text-sm text-primary">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-paragraph text-base py-6 transition-opacity"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-secondary">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 pb-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-accent aspect-[16/9] lg:aspect-[21/9] flex items-center justify-center border border-primary/10"
          >
            <div className="text-center p-8">
              <MapPin size={48} className="text-primary/40 mx-auto mb-4" />
              <p className="font-paragraph text-sm text-primary/60">
                Map location placeholder
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
