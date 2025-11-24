import React from 'react';
import { Hero, Introduction, CaseStudies, CallToAction, Service, Testimonial, Faq } from '@/components';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Introduction />
      <CaseStudies />
      <Service />
      <Testimonial />
      <Faq />
      <CallToAction />
    </main>
  );
};

export default Home;
