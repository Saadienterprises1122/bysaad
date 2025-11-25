import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, Github, Layers, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CallToAction } from '@/components';

// Import case studies data
import { CASE_STUDIES } from '@/components/dynamic/caseStudies/CaseStudiesData';
import { CaseStudy } from '@/components/dynamic/caseStudies/CaseStudiesTypes';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<CaseStudy | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProject = CASE_STUDIES.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/projects');
    }
  }, [id, navigate]);

  if (!project) return null;

  return (
    <div className="bg-dark-900 min-h-screen pt-20">
      
      {/* Header / Hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-dark-900/60 z-10" />
        <img src={project.image} alt={project.client} className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Link to="/projects" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
                </Link>
                <div className="text-primary-400 font-bold tracking-widest uppercase mb-3">{project.category}</div>
                <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">{project.client}</h1>
                <div className="flex items-center justify-center gap-4 mt-4">
                   {project.year && (
                       <span className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 text-sm">
                           <Calendar className="w-4 h-4" /> {project.year}
                       </span>
                   )}
                </div>
            </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative -mt-20 z-30">
         <div className="bg-dark-800 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            
            {/* Main Description */}
            <div className="grid md:grid-cols-3 gap-12 mb-16 border-b border-white/5 pb-12">
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                    
                    {project.liveUrl && (
                        <div className="mt-8 flex gap-4">
                            <Button onClick={() => window.open(project.liveUrl, '_blank')}>
                                View Live Site <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                            {project.githubUrl && (
                                <Button variant="outline" onClick={() => window.open(project.githubUrl, '_blank')}>
                                    <Github className="mr-2 w-4 h-4" /> Source Code
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="space-y-6">
                    <div>
                        <h4 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Role / Services</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-sm">{project.category}</span>
                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-sm">{project.result}</span>
                        </div>
                    </div>
                    
                    {project.technologies && (
                        <div>
                            <h4 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-primary-900/20 text-primary-300 rounded-lg border border-primary-500/20 text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-12">
                {project.challenge && (
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-500/10 rounded-lg">
                                <Layers className="w-6 h-6 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold">The Challenge</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
                    </div>
                )}

                {project.solution && (
                    <div>
                         <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Rocket className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold">The Solution</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed">{project.solution}</p>
                    </div>
                )}
            </div>

         </div>
      </div>

      {/* CTA */}
      <CallToAction />

    </div>
  );
};

export default ProjectDetailPage;
