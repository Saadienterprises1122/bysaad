import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { EDUCATION_DATA } from './EducationData';
import { EducationProps } from './EducationTypes';

const Education: React.FC<EducationProps> = () => {
  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            <GraduationCap className="w-4 h-4" />
            Academic Background
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Education</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My academic journey has laid a strong foundation in computer science and information technology.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 md:translate-x-0" />

          <div className="space-y-12">
            {EDUCATION_DATA.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-dark-900 shadow-[0_0_0_4px_rgba(139,92,246,0.2)] -translate-x-1/2 md:translate-x-[calc(50%-1px)] top-0 z-10" />

                <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                  <div className={`p-6 rounded-2xl bg-dark-800/50 border border-white/5 hover:border-primary-500/30 transition-colors relative group ${
                    index % 2 === 0 ? 'text-left' : 'text-left md:text-right'
                  }`}>
                    <span className="inline-flex items-center gap-2 text-primary-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Calendar className="w-3 h-3" />
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-gray-400 font-medium mb-3">{item.institution}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
