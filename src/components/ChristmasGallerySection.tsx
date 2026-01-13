import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from 'lucide-react';

import img1 from "figma:asset/c52dcf6d8978403dfdbd3495c4571d88affb0be8.png";
import img2 from "figma:asset/cc63f756a1cc4888736afb89b04dd405b05d8e3e.png";
import img3 from "figma:asset/c62a622fccacf2337a86dd9ee849f5d7a5f507ff.png";
import img4 from "figma:asset/f9dc8216b641ccc2c9360e846a3b101fefbef5f2.png";
import img5 from "figma:asset/ddbc44cea15a191aabf00f9e06f4b4e167c210ee.png";
import img6 from "figma:asset/df6700830d053abe9073dab4cfa92f9e4f5bf6aa.png";
import img7 from "figma:asset/ec167724869c6f1aa837394fc593ae4679c11737.png";
import img8 from "figma:asset/af616380a6f28733882435477fcb9f2aaa687b29.png";
import img9 from "figma:asset/c8529bcd2aa945b42d73e5071288148da793bb2d.png";
import img10 from "figma:asset/ddb31fe7ed80179e4ec64e0579e45f69295d1a24.png";
import img11 from "figma:asset/27ed6e8289a6971fff283ef31e6d4a84eb48925b.png";
import img12 from "figma:asset/2691a191d33dd07803bc32fb7faab8daeb5531ab.png";

export function ChristmasGallerySection() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

  // Define two distinct sets of images
  const setA = images.slice(0, 6);
  const setB = images.slice(6, 12);
  
  // Create interleaved sequences for the "swapping" effect
  // Row 1: [A, B, A, B] -> Starts with A, then B scrolls in (Top row "becomes" Bottom row content)
  const row1Images = [...setA, ...setB, ...setA, ...setB];
  
  // Row 2: [B, A, B, A] -> Starts with B, then A scrolls in (Bottom row "becomes" Top row content)
  const row2Images = [...setB, ...setA, ...setB, ...setA];

  const MarqueeRow = ({ images, direction = "left", speed = 40 }: { images: string[], direction?: "left" | "right", speed?: number }) => (
    <div className="relative w-full overflow-hidden py-2">
        <motion.div 
          className="flex gap-4 sm:gap-6 w-max"
          // If direction is left, we move from 0 to -50% (Showing Set 1 then Set 2)
          // If direction is right, we move from -50% to 0 (Showing Set 1 then Set 2 coming from left)
          animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: speed }}
        >
          {images.map((img, i) => (
            <div 
              key={`${direction}-${i}`} 
              className="w-[200px] h-[150px] sm:w-[300px] sm:h-[225px] md:w-[400px] md:h-[300px] flex-shrink-0 rounded-xl overflow-hidden relative cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img} alt="Gallery" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <ZoomIn className="text-white w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" />
              </div>
            </div>
          ))}
        </motion.div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50 overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-[#A32020] text-white mb-4 hover:bg-[#8a1b1b]">
            {t('gallery.badge')}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('gallery.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Dual Interleaved Marquee Rows */}
        <div className="flex flex-col gap-4 sm:gap-8 -mx-4 sm:-mx-8">
            {/* Top Row: A -> B -> A... */}
            <MarqueeRow images={row1Images} direction="left" speed={60} />
            
            {/* Bottom Row: B -> A -> B... */}
            <MarqueeRow images={row2Images} direction="right" speed={60} />
        </div>
        
        <p className="text-center text-sm text-gray-400 mt-8 flex items-center justify-center gap-2">
            <ZoomIn size={14} /> {t('gallery.badge') === 'Galeria' ? 'Toque para ampliar' : 'Click to expand'}
        </p>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged gallery view"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
