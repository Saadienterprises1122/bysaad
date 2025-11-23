import React from 'react';
import { Hero, Introduction, CaseStudies } from '@/components';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Introduction />
      <CaseStudies />
    </main>
  );
};

export default Home;
