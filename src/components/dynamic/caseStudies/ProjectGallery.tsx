import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images, Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, projectName }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 pt-16 border-t border-white/5"
      >
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="p-2 bg-primary-500/10 rounded-lg"
          >
            <Images className="w-6 h-6 text-primary-400" />
          </motion.div>
          <h3 className="text-2xl font-bold">Project Gallery</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => {
            // Parallax effect for each image
            const yOffset = useTransform(
              scrollYProgress,
              [0, 1],
              [0, -50 * (index % 2 === 0 ? 1 : -1)]
            );

            return (
              <motion.div
                key={index}
                style={{ y: yOffset }}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                className="aspect-square overflow-hidden rounded-xl cursor-pointer relative group perspective-1000"
                onClick={() => openLightbox(index)}
              >
                <motion.img
                  src={image}
                  alt={`${projectName} - Gallery Image ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Overlay with reveal animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent transition-opacity duration-300 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-white"
                  >
                    <Maximize2 className="w-8 h-8 mb-2" />
                    <p className="text-sm font-medium">View Full Size</p>
                  </motion.div>
                </motion.div>

                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary-400/50 transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors group"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Image Counter */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium"
            >
              {selectedImage + 1} / {images.length}
            </motion.div>

            {/* Previous Button */}
            {images.length > 1 && (
              <motion.button
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>
            )}

            {/* Next Button */}
            {images.length > 1 && (
              <motion.button
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            )}

            {/* Main Image with advanced animations */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="relative"
            >
              <motion.img
                src={images[selectedImage]}
                alt={`${projectName} - Gallery Image ${selectedImage + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Glow effect around image */}
              <div className="absolute inset-0 -z-10 blur-3xl bg-primary-500/20 rounded-lg" />
            </motion.div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/10 backdrop-blur-sm p-2 rounded-full max-w-[90vw] overflow-x-auto"
              >
                {images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(idx);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      idx === selectedImage 
                        ? 'ring-2 ring-primary-400 ring-offset-2 ring-offset-black' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectGallery;
