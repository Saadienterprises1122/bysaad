import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CallToActionProps } from './CallToActionTypes';

const EMAIL_ADDRESS = 'mxaadxatti.official@gmail.com';

const CallToAction: React.FC<CallToActionProps> = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/#contact');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${EMAIL_ADDRESS}`;
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-primary-900/20" />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary-600/30 rotate-3 group-hover:rotate-12 transition-transform duration-500">
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Build Something <br />
              <span className="gradient-text">Extraordinary?</span>
            </h2>

            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Whether you need a stunning website, a robust IT infrastructure, or data-driven insights, I'm here to
              help you achieve your goals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={handleStartProject} className="w-full sm:w-auto">
                Start a Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={handleEmailClick} className="w-full sm:w-auto">
                <Mail className="mr-2 w-5 h-5" /> Email Me
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
