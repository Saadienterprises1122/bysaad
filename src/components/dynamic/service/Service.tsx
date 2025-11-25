import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, CheckCircle2, Layers, Wrench, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SERVICES } from './ServiceData';
import { ServiceItem, ServiceProps } from './ServiceTypes';
import { generateMarketingContent } from '@/lib/api/geminiService';

const Service: React.FC<ServiceProps> = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      setAiSuggestions([]);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  const handleGenerateAiInsights = async () => {
    if (!selectedService) return;
    setIsAiLoading(true);
    try {
      const suggestions = await generateMarketingContent(
        selectedService.title,
        "Technology & Digital Services",
        'innovative-expansions'
      );
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to generate insights");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleContactClick = () => {
    setSelectedService(null);
    window.location.href = '/contact';
  };

  return (
    <section id="services" className="py-24 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">My Services</h2>
          <p className="text-gray-400 text-lg">
            Specialized solutions in Development, Design, and Data Analysis. Click on a service to explore the details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedService(service)}
              className="glass-card p-8 rounded-3xl group relative overflow-hidden cursor-pointer hover:border-primary-500/50 transition-colors border border-white/10 h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors group-hover:scale-110 duration-300">
                  <service.icon className="w-7 h-7 text-primary-400 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-300 transition-colors">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 flex-grow">{service.description}</p>
                
                <div className="flex items-center text-primary-400 font-medium group-hover:text-white transition-colors mt-auto">
                  View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setSelectedService(null)}
            />

            <motion.div
              layoutId={`service-${selectedService.title}`}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-dark-800 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative p-8 pb-0 z-10 flex justify-between items-start bg-dark-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                    <selectedService.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{selectedService.title}</h3>
                    <p className="text-primary-400 font-medium">Professional Services</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400 hover:text-white" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar">
                <p className="text-gray-300 text-lg leading-relaxed mb-10 border-b border-white/10 pb-8">
                  {selectedService.description} I strive to deliver excellence by combining technical expertise with creative innovation tailored to your specific requirements.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Layers className="w-5 h-5 text-primary-400" />
                      <h4 className="text-xl font-bold">What I Offer</h4>
                    </div>
                    <div className="grid gap-4">
                      {selectedService.subServices.map((sub, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary-500/30 transition-all"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                          <span className="text-gray-300">{sub}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Wrench className="w-5 h-5 text-blue-400" />
                      <h4 className="text-xl font-bold">Technologies & Tools</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedService.tools.map((tool, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="px-4 py-2 rounded-lg bg-dark-900 border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:border-primary-500 transition-colors cursor-default shadow-sm"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                    
                    <Card className="mt-10 bg-gradient-to-br from-primary-900/20 to-transparent border-primary-500/20">
                      <CardContent className="p-6">
                        <h5 className="text-white font-bold mb-2">Ready to start a project?</h5>
                        <p className="text-sm text-gray-400 mb-4">Let's discuss how I can help you with {selectedService.title}.</p>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="w-full"
                          onClick={handleContactClick}
                        >
                          Get a Quote
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-blue-600 flex items-center justify-center shadow-lg shadow-primary-600/20">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold flex items-center gap-2">
                          AI Strategy Engine 
                          <span className="text-[10px] bg-primary-500/20 text-primary-300 border border-primary-500/30 px-1.5 py-0.5 rounded uppercase tracking-wide font-bold">Beta</span>
                        </h4>
                        <p className="text-sm text-gray-400">Generate innovative ideas & sub-services</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateAiInsights}
                      disabled={isAiLoading}
                      className="border-primary-500/30 hover:bg-primary-500/10 text-primary-300 w-full sm:w-auto"
                    >
                      {isAiLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Sparkles className="w-4 h-4 mr-2" />}
                      {aiSuggestions.length > 0 ? 'Regenerate Ideas' : 'Discover Innovations'}
                    </Button>
                  </div>

                  {aiSuggestions.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {aiSuggestions.map((suggestion, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="bg-white/5 border border-white/5 p-4 rounded-xl text-sm text-gray-300 flex items-start gap-3 hover:bg-white/10 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                          <span className="leading-relaxed">{suggestion}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {!isAiLoading && aiSuggestions.length === 0 && (
                    <div className="text-center text-gray-500 py-10 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
                      <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-20" />
                      <p>Click the button above to let AI suggest trending opportunities <br/> and cutting-edge tools for {selectedService.title}.</p>
                    </div>
                  )}
                  
                  {isAiLoading && (
                    <div className="grid sm:grid-cols-2 gap-4 animate-pulse">
                      <div className="h-16 bg-white/5 rounded-xl border border-white/5"></div>
                      <div className="h-16 bg-white/5 rounded-xl border border-white/5"></div>
                      <div className="h-16 bg-white/5 rounded-xl border border-white/5"></div>
                      <div className="h-16 bg-white/5 rounded-xl border border-white/5"></div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Service;
