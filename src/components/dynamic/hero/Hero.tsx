import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play, Terminal } from 'lucide-react';
import { TypewriterEffectProps, AnimatedCounterProps, HeroProps } from './HeroTypes';
import { Button } from '@/components/ui/button';

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) {
      setIndex(0);
      return;
    }

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="gradient-text min-h-[1.2em] inline-block">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? 'opacity-100' : 'opacity-0'} ml-1 text-primary-400`}>|</span>
    </span>
  );
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="text-3xl font-bold text-white" />;
};

const Hero: React.FC<HeroProps> = () => {
  const roles = ['Frontend Developer', 'IT Professional', 'Data Analyst', 'Graphics Designer'];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-300 text-sm font-medium mb-8">
            <Terminal className="w-4 h-4" />
            Portfolio & Resume
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Hi, I'm <br /> Muhammad Saad Satti
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-2xl md:text-4xl font-bold mb-8 h-16"
        >
          I am a <TypewriterEffect words={roles} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Passionate about crafting digital experiences, analyzing data, and solving complex technical problems. Welcome
          to my personal portfolio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" onClick={() => (window.location.href = '#contact')}>
            Contact Me <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => (window.location.href = '#work')}>
            View Projects <Play className="ml-2 w-4 h-4 fill-current" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10"
        >
          <div>
            <AnimatedCounter value={5} suffix="+" />
            <p className="text-gray-500 text-sm uppercase tracking-wider mt-1">Years Experience</p>
          </div>
          <div>
            <AnimatedCounter value={20} suffix="+" />
            <p className="text-gray-500 text-sm uppercase tracking-wider mt-1">Projects Done</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-0.5">
              <AnimatedCounter value={100} suffix="%" />
            </div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mt-1">Commitment</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">24/7</div>
            <p className="text-gray-500 text-sm uppercase tracking-wider mt-1">Available</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
