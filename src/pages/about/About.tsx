import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Introduction, 
  Experience, 
  Education, 
  Skills, 
  Certifications, 
  Languages, 
  Faq, 
  CallToAction 
} from '@/components';
import { User } from 'lucide-react';

const About: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-900 min-h-screen pt-20">
      {/* Simple Page Header */}
      <div className="relative py-20 md:py-32 px-4 text-center overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
         
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
         >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
                <User className="w-4 h-4 text-primary-400" />
                My Journey
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">About <span className="gradient-text">Me</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                A deeper look into my background, education, and professional experience in the world of technology and design.
            </p>
         </motion.div>
      </div>

      {/* Bio */}
      <Introduction />
      
      {/* Timeline Sections */}
      <Experience />
      <Education />
      
      {/* Skills */}
      <Skills />

      {/* Certifications */}
      <Certifications />

      {/* Languages */}
      <Languages />
      
      {/* FAQ */}
      <Faq />

      {/* CTA */}
      <CallToAction />
    </div>
  );
};

export default About;
