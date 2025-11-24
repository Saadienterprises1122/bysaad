import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Loader2, 
  Sparkles, 
  FileText, 
  Hash, 
  PenTool, 
  Newspaper, 
  Target, 
  List, 
  Lightbulb, 
  Code, 
  Webhook, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateMarketingContent, ContentType } from '@/lib/api/geminiService';
import { ContentTab, ValidationErrors, AiStrategyProps } from './AiStrategyTypes';

const CONTENT_TABS: ContentTab[] = [
  { id: 'taglines', label: 'Taglines', icon: Sparkles },
  { id: 'blog-ideas', label: 'Blog Ideas', icon: FileText },
  { id: 'social-posts', label: 'Social Posts', icon: Hash },
  { id: 'news-feed', label: 'News Feed', icon: Newspaper },
  { id: 'marketing-angles', label: 'Angles', icon: Target },
  { id: 'content-outlines', label: 'Outlines', icon: List },
  { id: 'topic-ideas', label: 'Topics', icon: Lightbulb },
  { id: 'code-snippets', label: 'Code Snippets', icon: Code },
  { id: 'api-integrations', label: 'API Ideas', icon: Webhook },
];

const FEATURE_HIGHLIGHTS = [
  'Industry-Specific Insights',
  'Automated Content Outlines',
  'Trend-Aware Topic Generation'
];

const AiStrategy: React.FC<AiStrategyProps> = () => {
  const [topic, setTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [contentType, setContentType] = useState<ContentType>('taglines');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};
    if (!topic.trim()) newErrors.topic = 'Please enter a topic or niche';
    if (!industry.trim()) newErrors.industry = 'Please enter an industry';
    return newErrors;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    
    setLoading(true);
    setResults([]);
    
    const content = await generateMarketingContent(topic, industry, contentType);
    setResults(content);
    setLoading(false);
  };

  const handleInputChange = (field: 'topic' | 'industry', value: string) => {
    if (field === 'topic') setTopic(value);
    if (field === 'industry') setIndustry(value);
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="ai-strategy" className="py-16 md:py-24 bg-dark-800 relative overflow-hidden border-y border-white/5">
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-b md:bg-gradient-to-l from-primary-900/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Bot className="w-4 h-4" />
              BySaad AI Studio
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Strategic Content <br /> <span className="text-primary-400">Generated Instantly</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
              Unlock limitless creativity. Generate high-converting taglines, blog ideas, social posts, and strategic marketing angles tailored to your niche in seconds.
            </p>
            <ul className="space-y-3 md:space-y-4 mb-8">
              {FEATURE_HIGHLIGHTS.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Generator Form Section */}
          <div className="order-1 lg:order-2 glass-card p-6 md:p-8 rounded-3xl border border-primary-500/30 shadow-2xl relative overflow-hidden">
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                <PenTool className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                AI Strategy Generator
              </h3>
              <p className="text-sm text-gray-400">Select a tool and enter your details below.</p>
            </div>

            {/* Content Type Tabs */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
              {CONTENT_TABS.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setContentType(tab.id as ContentType)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 border ${
                    contentType === tab.id 
                      ? 'bg-primary-600 border-primary-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Topic Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Topic / Niche
                  </label>
                  <motion.input 
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)" }}
                    transition={{ duration: 0.2 }}
                    type="text" 
                    value={topic}
                    onChange={(e) => handleInputChange('topic', e.target.value)}
                    className={`w-full bg-dark-900/60 border rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none transition-colors text-base ${
                      errors.topic 
                        ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                        : 'border-white/10 focus:border-primary-500'
                    }`}
                    placeholder="e.g. Sustainable Fashion"
                  />
                  <AnimatePresence mode="wait">
                    {errors.topic && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="flex items-center gap-2 mt-2 text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errors.topic}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Industry Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    Industry
                  </label>
                  <motion.input 
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)" }}
                    transition={{ duration: 0.2 }}
                    type="text" 
                    value={industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className={`w-full bg-dark-900/60 border rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:outline-none transition-colors text-base ${
                      errors.industry 
                        ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                        : 'border-white/10 focus:border-primary-500'
                    }`}
                    placeholder="e.g. Retail / E-commerce"
                  />
                  <AnimatePresence mode="wait">
                    {errors.industry && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -5, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="flex items-center gap-2 mt-2 text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {errors.industry}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full py-4 text-base font-semibold shadow-lg shadow-primary-600/20 hover:shadow-primary-600/50 transition-shadow"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 
                      Generating Strategy...
                    </>
                  ) : (
                    'Generate Ideas'
                  )}
                </Button>
              </div>
            </form>

            {/* Results Section */}
            <div className="mt-10 space-y-4 min-h-[160px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  {loading ? 'Processing Data...' : 'AI Results'}
                </p>
                {results.length > 0 && !loading && (
                  <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Generated
                  </span>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 animate-pulse"
                  >
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 bg-white/5 rounded-xl border border-white/5" />
                    ))}
                  </motion.div>
                ) : results.length > 0 ? (
                  <div className="space-y-3">
                    {results.map((res, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                        className="p-4 bg-primary-900/20 border border-primary-500/20 rounded-xl text-sm text-gray-200 shadow-inner relative group hover:bg-primary-900/30 transition-colors flex items-start gap-3"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-l-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                        <div className="mt-1 min-w-[6px] h-1.5 rounded-full bg-primary-400/60" />
                        <span className="leading-relaxed whitespace-pre-wrap font-mono text-xs md:text-sm">{res}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-gray-500 text-sm border border-dashed border-white/10 rounded-xl py-8 text-center px-4 bg-white/[0.02]"
                  >
                    <Sparkles className="w-6 h-6 mb-3 opacity-40" />
                    <p>Enter your topic and industry above to unlock AI-powered insights.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiStrategy;
