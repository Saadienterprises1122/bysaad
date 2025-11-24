import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FAQ_DATA } from './FaqData';
import { FaqProps } from './FaqTypes';

const Faq: React.FC<FaqProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-dark-800 relative overflow-hidden border-y border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm font-medium mb-4 border border-white/10">
            <HelpCircle className="w-4 h-4 text-primary-400" />
            Common Questions
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Here are answers to some of the most common questions I receive about my services and workflow.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`bg-dark-900/50 border ${activeIndex === index ? 'border-primary-500/50' : 'border-white/5'} rounded-2xl overflow-hidden transition-colors duration-300`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`text-lg font-medium transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-300'}`}>
                    {item.question}
                  </span>
                  <span className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-primary-600 text-white' : 'bg-white/5 text-gray-500'}`}>
                    {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
