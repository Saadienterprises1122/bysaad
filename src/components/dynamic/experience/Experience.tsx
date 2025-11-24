import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { EXPERIENCE_DATA } from './ExperienceData';
import { ExperienceProps } from './ExperienceTypes';

const Experience: React.FC<ExperienceProps> = () => {
  return (
    <section className="py-20 bg-dark-800 relative overflow-hidden border-y border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20">
            <Briefcase className="w-4 h-4" />
            Professional Career
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A chronological overview of my professional journey and contributions.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 md:translate-x-0" />

          <div className="space-y-12">
            {EXPERIENCE_DATA.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-dark-800 shadow-[0_0_0_4px_rgba(59,130,246,0.2)] -translate-x-1/2 md:translate-x-[calc(50%-1px)] top-0 z-10" />

                <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                  <div className={`relative group ${
                    index % 2 === 0 ? 'text-left' : 'text-left md:text-right'
                  }`}>
                    <div className={`mb-1 flex flex-col ${
                      index % 2 === 0 ? 'items-start' : 'items-start md:items-end'
                    }`}>
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">
                        <Calendar className="w-3 h-3 text-blue-400" />
                        {item.period}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {item.role}
                      </h3>
                      <div className="text-blue-400 font-medium text-lg mb-4">{item.company}</div>
                    </div>

                    <div className={`p-6 rounded-2xl bg-dark-900/50 border border-white/5 hover:border-blue-500/30 transition-all shadow-lg ${
                      index % 2 === 0 ? 'rounded-tl-none' : 'rounded-tl-none md:rounded-tr-none md:rounded-tl-2xl'
                    }`}>
                      <p className="text-gray-400 leading-relaxed mb-4 text-sm md:text-base">
                        {item.description}
                      </p>
                      
                      <div className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? 'justify-start' : 'justify-start md:justify-end'
                      }`}>
                        {item.skills.map((skill, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-300 border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
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

export default Experience;
