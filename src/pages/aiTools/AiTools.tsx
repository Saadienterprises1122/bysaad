import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { AiStrategy, AiLab, CallToAction } from '@/components';

const AiToolsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-dark-900 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative py-20 md:py-32 px-4 text-center overflow-hidden border-b border-white/5">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
         
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
         >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
                <Bot className="w-4 h-4 text-primary-400" />
                AI Innovation Hub
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">AI <span className="gradient-text">Tools</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Leverage the power of Artificial Intelligence to generate creative content strategies, optimize code, and visualize design concepts.
            </p>
         </motion.div>
      </div>

      {/* AI Content Strategy */}
      <AiStrategy />
      
      {/* AI Developer Lab */}
      <AiLab />

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                  <h3 className="font-bold mb-2">Select a Tool</h3>
                  <p className="text-gray-400 text-sm">Choose specifically from Content, Code, or Design tools.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                  <h3 className="font-bold mb-2">Input Context</h3>
                  <p className="text-gray-400 text-sm">Provide code snippets, mood descriptions, or topics.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                  <h3 className="font-bold mb-2">Instant Results</h3>
                  <p className="text-gray-400 text-sm">Get optimized code, color palettes, or marketing hooks.</p>
              </div>
          </div>
      </div>

      {/* CTA */}
      <CallToAction />
    </div>
  );
};

export default AiToolsPage;
