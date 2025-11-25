import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageSquare } from 'lucide-react';
import { LANGUAGES_DATA } from './LanguagesData';
import { LanguagesProps } from './LanguagesTypes';

const Languages: React.FC<LanguagesProps> = () => {
  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm font-medium mb-4 border border-white/10">
            <Globe className="w-4 h-4" />
            Communication
          </div>
          <h2 className="font-heading text-3xl font-bold mb-2">Languages</h2>
          <p className="text-gray-400">Fluent in multi-lingual communication.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {LANGUAGES_DATA.map((lang, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="bg-dark-800/50 border border-white/5 p-6 rounded-2xl flex items-center gap-6 relative overflow-hidden group hover:bg-white/5 transition-colors">
              <div className={`absolute top-0 right-0 w-24 h-24 ${lang.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                <MessageSquare className="w-5 h-5 text-gray-300" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-xl font-bold text-white">{lang.name}</h3>
                  <span className="text-sm text-primary-400 font-medium">{lang.level}</span>
                </div>
                <div className="h-2 w-full bg-dark-900 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${lang.proficiency}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className={`h-full ${lang.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
