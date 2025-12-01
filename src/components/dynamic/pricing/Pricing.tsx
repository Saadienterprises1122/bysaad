import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Check } from 'lucide-react';
import { PRICING_DATA } from './PricingData';
import { PricingProps } from './PricingTypes';

const Pricing: React.FC<PricingProps> = () => {
  const [activeService, setActiveService] = useState<'Web Development' | 'Graphic Design' | 'Data Analysis'>('Web Development');

  const currentPricing = PRICING_DATA.find(p => p.service === activeService);

  return (
    <section className="py-24 bg-dark-800 relative overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            <DollarSign className="w-4 h-4" />
            Transparent Pricing
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Starting Prices for <span className="gradient-text">Quality Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the service that fits your needs. All prices are starting rates and can be customized.
          </p>
        </motion.div>

        {/* Service Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-dark-900 border border-white/10 rounded-2xl p-2 gap-2 flex-wrap">
            {PRICING_DATA.map((item) => (
              <button
                key={item.service}
                onClick={() => setActiveService(item.service)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeService === item.service
                    ? 'bg-primary-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.service}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {currentPricing?.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-br from-primary-900/20 to-dark-800 border-primary-500/50 shadow-[0_0_40px_rgba(139,92,246,0.2)] scale-105'
                    : 'bg-dark-900/50 border-white/10 hover:border-white/20 hover:bg-dark-900'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-600 text-white text-xs font-bold rounded-full shadow-lg">
                    POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-primary-400">{plan.price}</span>
                  <span className="text-gray-500 text-sm">starting</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          *All prices are estimates. Final quotes provided after consultation.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
