import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TESTIMONIALS } from './TestimonialData';
import { TestimonialProps } from './TestimonialTypes';

const Testimonial: React.FC<TestimonialProps> = () => {
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 bg-dark-800 border-y border-white/5 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center px-4"
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold">Recommendations</h2>
        <p className="text-gray-400 mt-4">Feedback from clients and colleagues.</p>
      </motion.div>

      <div className="relative w-full group">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-800 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-800 to-transparent z-10 pointer-events-none" />
        
        <div className="flex overflow-hidden">
          <div className="flex gap-8 animate-scroll pause-on-hover w-max px-4">
            {allTestimonials.map((testimonial, index) => (
              <Card 
                key={`${testimonial.id}-${index}`} 
                className="w-[350px] md:w-[400px] glass-card rounded-2xl relative shrink-0 hover:bg-white/5 transition-colors border-white/10"
              >
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-primary-600/20 absolute top-8 right-8 group-hover:text-primary-600/40 transition-colors" />
                  <p className="text-lg text-gray-300 mb-8 relative z-10 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full border-2 border-primary-600 object-cover" 
                    />
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
