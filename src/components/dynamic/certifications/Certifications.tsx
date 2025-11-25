import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Filter, ChevronDown, Check } from 'lucide-react';
import { CERTIFICATIONS_DATA } from './CertificationsData';
import { CertificationsProps } from './CertificationsTypes';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  'All',
  'Specialization',
  'IT Courses',
  'Social Work',
  'Internship',
  'Health and Safety'
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const Certifications: React.FC<CertificationsProps> = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredItems = useMemo(() => {
    return activeFilter === 'All' 
      ? CERTIFICATIONS_DATA 
      : CERTIFICATIONS_DATA.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const currentItems = filteredItems.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const paginate = (newDirection: number) => {
    const nextPage = currentPage + newDirection;
    if (nextPage >= 0 && nextPage < totalPages) {
      setDirection(newDirection);
      setCurrentPage(nextPage);
    }
  };

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setCurrentPage(0);
    setDirection(0);
    setIsDropdownOpen(false);
  };

  return (
    <section id="certifications" className="py-20 bg-dark-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
            <Award className="w-4 h-4" />
            Credentials
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Certifications & Awards</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Continuous learning and professional development milestones.
          </p>
        </motion.div>

        {/* Desktop Filters (Tabs) */}
        <div className="hidden lg:flex justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeFilter === category
                  ? 'bg-primary-600 text-white border-primary-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Filters (Dropdown) */}
        <div className="lg:hidden relative mb-8 z-30 max-w-xs mx-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-left flex items-center justify-between text-white shadow-lg focus:outline-none focus:border-primary-500"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary-400" />
              {activeFilter}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-dark-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-40 max-h-60 overflow-y-auto custom-scrollbar"
                >
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange(category)}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-primary-600 hover:text-white transition-colors flex items-center justify-between group border-b border-white/5 last:border-none text-gray-300"
                    >
                      {category}
                      {activeFilter === category && <Check className="w-4 h-4 text-primary-400 group-hover:text-white" />}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Content Grid */}
        <div className="relative min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
                key={`${currentPage}-${activeFilter}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
                {currentItems.map((item) => (
                <div 
                    key={item.id}
                    className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-primary-500/30 hover:bg-white/10 transition-all duration-300 group flex flex-col h-full"
                >
                    <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-900/50 to-dark-900 flex items-center justify-center border border-primary-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-5 h-5 text-primary-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-dark-900 px-2 py-1 rounded border border-white/5">
                        {item.date}
                    </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors">
                        {item.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm text-gray-400">{item.issuer}</span>
                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5">
                            {item.category}
                        </span>
                    </div>
                </div>
                ))}
            </motion.div>
            </AnimatePresence>

            {currentItems.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">No certifications found in this category.</p>
                </div>
            )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(-1)}
              disabled={currentPage === 0}
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentPage ? 'bg-primary-500 w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(1)}
              disabled={currentPage === totalPages - 1}
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
