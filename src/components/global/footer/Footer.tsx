import React from 'react';
import { Sparkles } from 'lucide-react';
import { FooterProps } from './FooterTypes';
import { SOCIAL_LINKS } from './FooterData';
import { NAV_ITEMS } from '../navbar/NavbarData';

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-2xl">BySaad</span>
            </a>
            <p className="text-gray-500 max-w-sm">
              Frontend Developer & IT Professional dedicated to building seamless digital experiences and data-driven solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Navigate</h4>
            <ul className="space-y-4 text-gray-500">
              {NAV_ITEMS.map((item) => (
                 <li key={item.label}><a href={item.href} className="hover:text-primary-400 transition-colors">{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Socials</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social, i) => (
                <a key={i} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} BySaad. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
