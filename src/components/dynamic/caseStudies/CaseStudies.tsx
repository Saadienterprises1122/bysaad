import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CASE_STUDIES } from './CaseStudiesData';
import { CaseStudiesProps, SharePlatform } from './CaseStudiesTypes';

const CaseStudies: React.FC<CaseStudiesProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <motion.div
              key={study.id}
              initial="rest"
              whileHover="hover"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                hidden: { opacity: 0, scale: 0.95 },
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
        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudies;
