import React from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IntroductionProps } from "./IntroductionTypes";
import { ProfileImage } from "@/assets"; // ✅ Import from assets index.ts

const PROFILE_IMAGE = ProfileImage; // ✅ Use imported image

const Introduction: React.FC<IntroductionProps> = () => {
  const handleViewPortfolio = () => {
    window.location.href = "#work";
  };

  const handleContactMe = () => {
    window.location.href = "#contact";
  };

  return (
    <section
      id="about"
      className="py-24 bg-dark-800/50 relative overflow-hidden border-y border-white/5"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-600/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent z-10" />
              <img
                src={PROFILE_IMAGE} // ✅ Using the imported image
                alt="Muhammad Saad Satti"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-primary-200 text-xs font-medium mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>IT Specialist & Designer</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">
                  Muhammad Saad Satti
                </h3>
              </div>
            </div>

            <div className="absolute -inset-4 border border-white/5 rounded-[2rem] -z-10 bg-white/[0.02] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
            <div className="absolute -inset-4 border border-primary-500/20 rounded-[2rem] -z-20 rotate-[-3deg] group-hover:rotate-[-6deg] transition-transform duration-500 opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
              <User className="w-4 h-4 text-primary-400" />
              Introduction
            </div>

            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 leading-tight">
              About <span className="gradient-text">My Story</span>
            </h2>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I'm currently working as a Computer Operator and IT Support
                Specialist at Rawalpindi Polytechnic Institute, where I provide
                technical support and manage digital systems. My journey began
                with a passion for technology and design, which led me to
                develop expertise in IT support, system maintenance, and graphic
                design using Adobe Photoshop and Illustrator.
              </p>
              <p>
                I'm currently pursuing my Associate Degree in Computer and
                Information Science at Virtual University of Pakistan, building
                on my foundation from Punjab Group of Colleges. With experience
                ranging from IT operations to freelance graphic design, I bring
                a unique blend of technical proficiency and creative
                problem-solving to every project.
              </p>
              <p>
                I'm passionate about bridging the gap between technology and
                creativity, constantly learning new skills, and helping others
                solve their technical challenges.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="default" size="lg" onClick={handleViewPortfolio}>
                View Portfolio <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button variant="outline" size="lg" onClick={handleContactMe}>
                Contact Me
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
