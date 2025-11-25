import React from 'react';
import { 
  Introduction, 
  Experience, 
  Education, 
  Skills, 
  Certifications, 
  Languages, 
  Faq, 
  CallToAction 
} from '@/components';

const About: React.FC = () => {
  return (
    <main>
      <Introduction />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Languages />
      <Faq />
      <CallToAction />
    </main>
  );
};

export default About;
