import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles /*, Download*/ } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from './NavbarData';
import { NavbarProps } from './NavbarTypes';
import { Button } from '@/components/ui/button';

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ⭐ WhatsApp Redirect
  const handleHireMe = () => {
    const phone = "447393642179";
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('/') && !href.includes('#')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    if (href.includes('#')) {
      const [path, hash] = href.split('#');

      if (location.pathname === path || (path === '/' && location.pathname === '/')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(path);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight">BySaad</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 mr-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === item.href ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* <Button variant="outline" size="sm" className="hidden lg:inline-flex">
                <Download className="w-4 h-4 mr-2" /> Download CV
              </Button> */}

              {/* ⭐ Hire Me → WhatsApp */}
              <Button variant="default" size="sm" onClick={handleHireMe}>
                Hire Me
              </Button>
            </div>
          </nav>

          <button className="md:hidden p-2 text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-4 space-y-3">
                {/* <Button variant="outline" className="w-full justify-center">
                  <Download className="w-4 h-4 mr-2" /> Download CV
                </Button> */}

                {/* ⭐ Mobile Hire Me → WhatsApp */}
                <Button variant="default" className="w-full justify-center" onClick={handleHireMe}>
                  Hire Me
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
