import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Service, Faq, CallToAction } from '@/components';

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-900 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 px-4 text-center overflow-hidden border-b border-white/5">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
         
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
         >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
                <Layers className="w-4 h-4 text-blue-400" />
                Solutions & Offerings
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">My <span className="gradient-text">Services</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Specialized technical and creative services designed to help businesses grow, innovate, and streamline operations.
            </p>
         </motion.div>
      </div>

      {/* Services List */}
      <div className="bg-dark-900">
        <Service />
      </div>

      {/* FAQ */}
      <Faq />

      {/* CTA */}
      <CallToAction />
    </div>
  );
};

export default Services;
