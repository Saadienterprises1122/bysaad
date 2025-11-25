import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import { CaseStudies, Faq, CallToAction } from '@/components';

const Projects: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-900 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 px-4 text-center overflow-hidden border-b border-white/5">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
         
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
         >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
                <FolderGit2 className="w-4 h-4 text-purple-400" />
                My Portfolio
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Recent <span className="gradient-text">Projects</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Explore my latest work, case studies, and technical experiments. From web applications to data analysis pipelines.
            </p>
         </motion.div>
      </div>

      {/* Projects Grid */}
      <CaseStudies />

      {/* FAQ */}
      <Faq />

      {/* CTA */}
      <CallToAction />
    </div>
  );
};

export default Projects;
