import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, WifiOff } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex-grow flex items-center justify-center relative overflow-hidden py-20 min-h-[60vh]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Abstract Shapes */}
      <motion.div 
        animate={{ 
          rotate: 360,
          y: [0, -20, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-white/5 opacity-20 pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          rotate: -360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full border border-primary-500/10 opacity-20 pointer-events-none" 
      />

      <div className="relative z-10 max-w-2xl px-4 text-center">
        {/* Animated 404 Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Big Background Number */}
          <h1 className="font-heading text-[120px] md:text-[240px] font-bold leading-none text-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-sm">
            404
          </h1>
          
          {/* Foreground Glowing Text */}
          <div className="relative">
             <h1 className="font-heading text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-white to-primary-600 relative z-10 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
               404
             </h1>
             <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-white to-primary-600 blur-xl opacity-20 bg-clip-text text-transparent font-heading text-8xl md:text-9xl font-bold">
               404
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
            <div className="flex items-center justify-center gap-2 mb-4 text-primary-400 bg-primary-900/10 border border-primary-500/20 rounded-full px-4 py-1.5 w-fit mx-auto">
                <WifiOff className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Signal Lost</span>
            </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you are looking for seems to have drifted into the digital void or doesn't exist in this timeline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate('/')} size="lg" className="w-full sm:w-auto shadow-lg shadow-primary-600/20 group">
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Return Home
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate(-1)} className="w-full sm:w-auto group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
