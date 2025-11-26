import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SEOHelmet from '@/components/SEOHelmet';
import { Mail, MapPin } from 'lucide-react';
import { Contact, Faq } from '@/components';

const ContactUs: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-900 min-h-screen pt-20">
      <SEOHelmet 
        title="Contact Me - BySaad Portfolio"
        description="Get in touch with Muhammad Saad Satti for web development projects, IT support, or collaboration opportunities. Based in Rawalpindi, Pakistan."
        keywords="Contact BySaad, Hire Frontend Developer, Web Development Services, Rawalpindi Developer, Contact Form"
      />
      {/* Hero Section */}
      <div className="relative py-20 md:py-28 px-4 text-center overflow-hidden border-b border-white/5">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
         
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
         >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
                <Mail className="w-4 h-4 text-primary-400" />
                Get in Touch
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Contact <span className="gradient-text">Me</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Ready to start your next project? Reach out for a consultation, quote, or just to say hello.
            </p>
         </motion.div>
      </div>

      {/* Contact Form & Info */}
      <Contact />

      {/* Google Map */}
      <section className="py-20 bg-dark-800 relative overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm font-medium mb-4 border border-white/10">
                    <MapPin className="w-4 h-4 text-green-400" />
                    Visit Me
                </div>
                <h2 className="font-heading text-3xl font-bold mb-4">Location</h2>
                <p className="text-gray-400">Based in Rawalpindi, Pakistan. Available globally.</p>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-dark-900 relative"
            >
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.6399666046754!2d73.06909131506356!3d33.60634298072892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94e136356041%3A0x4655955300467688!2sRawalpindi%20Polytechnic%20Institute!5e0!3m2!1sen!2s!4v1646810000000!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                ></iframe>
                
                <div className="absolute inset-0 pointer-events-none border-[3px] border-white/5 rounded-3xl"></div>
            </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <Faq />
    </div>
  );
};

export default ContactUs;
