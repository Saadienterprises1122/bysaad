import React from 'react';
import { Hero, Introduction, CaseStudies, CallToAction } from '@/components';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Introduction />
      <CaseStudies />
      <CallToAction />
    </main>
  );
};

export default Home;
