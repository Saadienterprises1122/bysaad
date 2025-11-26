import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Twitter, Linkedin, Facebook, Share2, Search, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CASE_STUDIES } from './CaseStudiesData';
import { CaseStudiesProps, SharePlatform } from './CaseStudiesTypes';

const CaseStudies: React.FC<CaseStudiesProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');

  // Extract unique categories and technologies
  const categories = useMemo(() => {
    const cats = new Set(CASE_STUDIES.map(study => study.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const technologies = useMemo(() => {
    const techs = new Set(CASE_STUDIES.flatMap(study => study.technologies));
    return ['All', ...Array.from(techs)];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return CASE_STUDIES.filter(study => {
      const matchesSearch = study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          study.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          study.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory;
      const matchesTech = selectedTech === 'All' || study.technologies.includes(selectedTech);
      
      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [searchQuery, selectedCategory, selectedTech]);

  const shareCaseStudy = (platform: SharePlatform, title: string, id: string) => {
    const url = encodeURIComponent(`https://portfolio-bysaad.netlify.app/projects/${id}`);
    const text = encodeURIComponent(`Check out this project by Muhammad Saad Satti: ${title}`);

    const shareUrls: Record<SharePlatform, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const handleCaseStudyClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTech('All');
  };

  return (
    <section id="work" className="py-24 bg-dark-900">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Projects & Experience</h2>
            <p className="text-gray-400">A showcase of my professional work and technical projects.</p>
          </div>
          {location.pathname !== '/projects' && (
            <Link
              to="/projects"
              className="text-primary-400 font-medium hover:text-primary-300 flex items-center gap-2 transition-colors"
            >
              View All Projects <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Filters Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search projects by name, description, or technology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category and Tech Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">Technology</label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
              >
                {technologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters and Clear Button */}
          {(searchQuery || selectedCategory !== 'All' || selectedTech !== 'All') && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {filteredProjects.length} of {CASE_STUDIES.length} projects
              </div>
              <button
                onClick={clearFilters}
                className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial="rest"
                  whileHover="hover"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
                    hidden: { opacity: 0, scale: 0.95, y: 20 },
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-dark-800 border border-white/5 flex flex-col h-full cursor-pointer"
                  onClick={() => handleCaseStudyClick(study.id)}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <motion.img
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.1 },
                      }}
                      transition={{ duration: 0.5 }}
                      src={study.image}
                      alt={study.client}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent" />
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 z-10"
                    variants={{
                      rest: { y: 0 },
                      hover: { y: -10 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-primary-400 text-xs font-bold tracking-widest uppercase mb-2">
                      {study.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{study.client}</h3>

                    <motion.div
                      variants={{
                        rest: { height: 0, opacity: 0, marginBottom: 0 },
                        hover: { height: 'auto', opacity: 1, marginBottom: 16 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-300 text-sm line-clamp-3">{study.description}</p>
                      <span className="inline-block mt-3 text-xs font-bold text-white border-b border-white pb-0.5">
                        Read Case Study
                      </span>
                    </motion.div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white border border-white/10">
                        {study.result}
                      </div>

                      <div className="group/share relative flex items-center justify-end" onClick={(e) => e.stopPropagation()}>
                        <div className="relative flex items-center bg-dark-700/50 backdrop-blur-sm border border-white/10 rounded-full h-9 transition-all duration-300 w-[85px] group-hover/share:w-[130px] overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity duration-300 opacity-100 group-hover/share:opacity-0">
                            <Share2 className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Share</span>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 opacity-0 translate-y-4 group-hover/share:translate-y-0 group-hover/share:opacity-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                shareCaseStudy('twitter', study.client, study.id);
                              }}
                              className="p-1.5 hover:bg-[#1DA1F2] rounded-full text-white transition-colors"
                              title="Share on Twitter"
                            >
                              <Twitter className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                shareCaseStudy('linkedin', study.client, study.id);
                              }}
                              className="p-1.5 hover:bg-[#0077b5] rounded-full text-white transition-colors"
                              title="Share on LinkedIn"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                shareCaseStudy('facebook', study.client, study.id);
                              }}
                              className="p-1.5 hover:bg-[#1877F2] rounded-full text-white transition-colors"
                              title="Share on Facebook"
                            >
                              <Facebook className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg mb-4">No projects found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default CaseStudies;
