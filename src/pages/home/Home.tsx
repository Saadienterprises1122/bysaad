
import React from 'react';
import SEOHelmet from '@/components/SEOHelmet';
import { Hero, Introduction, CaseStudies, CallToAction, Service, Testimonial, Faq, AiStrategy } from '@/components';

const Home: React.FC = () => {
  return (
    <main>
      <SEOHelmet 
        title="BySaad - Frontend Developer & IT Professional"
        description="Muhammad Saad Satti - Expert Frontend Developer specializing in React, TypeScript, and modern web technologies. Building seamless digital experiences and data-driven solutions."
        keywords="BySaad, Muhammad Saad Satti, Frontend Developer, Web Development, React, TypeScript, Portfolio, Rawalpindi"
      />
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
