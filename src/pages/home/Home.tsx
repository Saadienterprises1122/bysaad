
import React from 'react';
import { Hero, Introduction, CaseStudies, CallToAction, Service, Testimonial, Faq, AiStrategy } from '@/components';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Service />
      <Introduction />
      <CaseStudies />
      <AiStrategy />
      <Testimonial />
      <Faq />
      <CallToAction />
    </main>
  );
};

export default Home;
