import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, AlertCircle, Send, MessageCircle, Globe, Clock, ChevronDown, Check, Linkedin, Twitter, Facebook, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactProps, ContactFormData, ContactErrors } from './ContactTypes';
import { SERVICE_OPTIONS, GOAL_OPTIONS } from './ContactData';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    goal: '',
    message: ''
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'service' | 'goal' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelect = (name: 'service' | 'goal', value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setOpenDropdown(null);
  };

  const validate = () => {
    const newErrors: ContactErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.service) newErrors.service = 'Please select a topic';
    if (!formData.goal) newErrors.goal = 'Please select a goal';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Submitting form:", formData);
      
      setIsSubmitting(false);
      setFormData({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        service: '', 
        goal: '',
        message: '' 
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#c4b5fd', '#ffffff']
      });

      toast.success("Message Sent!", {
        description: "Thanks for reaching out. I will get back to you shortly.",
        duration: 5000,
      });
    }
  };

  const inputClass = (error: boolean) => 
    `w-full bg-dark-800/50 border rounded-lg px-4 py-3 text-white outline-none transition-all duration-300 placeholder-gray-500
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]' 
      : 'border-white/10 hover:border-white/20 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:shadow-[0_0_25px_rgba(139,92,246,0.25)]'
    }`;

  return (
    <section id="contact" className="py-24 bg-dark-900 relative">
      {openDropdown && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setOpenDropdown(null)} />
      )}

      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div className="flex flex-col justify-center">
            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-green-900/80 to-green-800/40 border border-green-500/50 shadow-[0_0_25px_rgba(34,197,94,0.15)] text-green-400 text-sm font-bold mb-8 w-fit cursor-default transition-all"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Open to opportunities
            </motion.div>
            
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              I am always looking for new challenges and projects. Whether you need a website, data analysis, or IT support, feel free to contact me.
            </p>

            <div className="space-y-6">
              <a 
                href="mailto:mxaadxatti.official@gmail.com"
                className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
              >
                <div className="w-14 h-14 rounded-full bg-primary-900/30 flex items-center justify-center text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-[0_0_0_0_rgba(139,92,246,0)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Email</div>
                  <div className="text-lg font-medium text-white break-all group-hover:text-primary-400 transition-colors">mxaadxatti.official@gmail.com</div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400 bg-white/5 px-2 py-1 rounded w-fit">
                    <Clock className="w-3.5 h-3.5" />
                    Replies within 24 hours
                  </div>
                </div>
              </a>
              
              <a 
                href="https://wa.me/447393642179" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
              >
                <div className="w-14 h-14 rounded-full bg-primary-900/30 flex items-center justify-center text-primary-400 group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300 shadow-[0_0_0_0_rgba(37,211,102,0)] group-hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">WhatsApp</div>
                  <div className="text-lg font-medium text-white group-hover:text-[#25D366] transition-colors">+44 7393 642179</div>
                </div>
              </a>

              <a 
                href="tel:+923472788527" 
                className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
              >
                <div className="w-14 h-14 rounded-full bg-primary-900/30 flex items-center justify-center text-primary-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-[0_0_0_0_rgba(37,99,235,0)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Mobile</div>
                  <div className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">+92 347 2788527</div>
                </div>
              </a>

              <motion.a 
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(139, 92, 246, 0.15)" }}
                href="https://www.google.com/maps/search/?api=1&query=Rawalpindi+Polytechnic+Institute+NE273+Tipu+Road+Rawalpindi+near+Rawalpindi+Medical+University" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-5 group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-primary-500/20"
              >
                <div className="w-14 h-14 rounded-full bg-primary-900/30 flex items-center justify-center text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] shrink-0 mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Location</div>
                  <div className="text-base font-medium text-white leading-relaxed group-hover:text-primary-400 transition-colors max-w-sm">
                    Rawalpindi Polytechnic Institute, NE273 Tipu Road, Rawalpindi (Near RMU)
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs font-bold text-primary-300 bg-primary-900/30 px-3 py-1.5 rounded-full w-fit border border-primary-500/20">
                    <Globe className="w-3.5 h-3.5" />
                    Available for Remote Work
                  </div>
                </div>
              </motion.a>

              <div className="pt-8 mt-4 border-t border-white/5">
                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Follow Me</h4>
                 <div className="flex gap-4">
                    <a href="#" className="group relative">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 group-hover:bg-[#0077b5] group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-[0_5px_20px_rgba(0,119,181,0.3)]">
                         <Linkedin className="w-5 h-5" />
                      </div>
                    </a>
                    <a href="#" className="group relative">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 group-hover:bg-[#1DA1F2] group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-[0_5px_20px_rgba(29,161,242,0.3)]">
                         <Twitter className="w-5 h-5" />
                      </div>
                    </a>
                    <a href="#" className="group relative">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:-translate-y-1 group-hover:shadow-[0_5px_20px_rgba(255,255,255,0.2)]">
                         <Github className="w-5 h-5" />
                      </div>
                    </a>
                    <a href="#" className="group relative">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 group-hover:bg-[#1877F2] group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-[0_5px_20px_rgba(24,119,242,0.3)]">
                         <Facebook className="w-5 h-5" />
                      </div>
                    </a>
                 </div>
              </div>
            </div>
          </div>

          <div className="relative lg:pt-8">
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl space-y-6 border border-white/10 shadow-2xl relative z-30">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                  <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="John"
                    className={inputClass(!!errors.firstName)}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                  <input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text" 
                    placeholder="Doe"
                    className={inputClass(!!errors.lastName)}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email" 
                  placeholder="john@company.com"
                  className={inputClass(!!errors.email)}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Regarding</label>
                  <button 
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === 'service' ? null : 'service')}
                    className={`w-full bg-dark-800/50 border rounded-lg px-4 py-3 text-left flex items-center justify-between outline-none transition-all duration-300 ${errors.service ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:shadow-[0_0_25px_rgba(139,92,246,0.25)]'} ${formData.service ? 'text-white' : 'text-gray-500'}`}
                  >
                    {formData.service || "Select a topic..."}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'service' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === 'service' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-dark-800 border border-white/10 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleSelect('service', option)}
                            className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors flex items-center justify-between group"
                          >
                            {option}
                            {formData.service === option && <Check className="w-4 h-4 text-white" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.service && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.service}</p>}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Goal</label>
                  <button 
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === 'goal' ? null : 'goal')}
                    className={`w-full bg-dark-800/50 border rounded-lg px-4 py-3 text-left flex items-center justify-between outline-none transition-all duration-300 ${errors.goal ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 focus:shadow-[0_0_25px_rgba(139,92,246,0.25)]'} ${formData.goal ? 'text-white' : 'text-gray-500'}`}
                  >
                    {formData.goal || "Purpose of contact"}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === 'goal' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === 'goal' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-dark-800 border border-white/10 rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
                      >
                        {GOAL_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleSelect('goal', option)}
                            className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-primary-600 hover:text-white transition-colors flex items-center justify-between group"
                          >
                            {option}
                            {formData.goal === option && <Check className="w-4 h-4 text-white" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.goal && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.goal}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="How can I help you?"
                  className={inputClass(!!errors.message)}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
              </div>

              <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
