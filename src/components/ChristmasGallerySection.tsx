import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ArrowRight } from 'lucide-react';

import img1 from "../assets/christmas/1.jpeg";
import img2 from "../assets/christmas/2.jpeg";
import img3 from "../assets/christmas/3.jpeg";
import img4 from "../assets/christmas/4.jpeg";
import img5 from "../assets/christmas/5.jpeg";
import img6 from "../assets/christmas/6.jpeg";
import img7 from "../assets/christmas/7.jpeg";
import img8 from "../assets/christmas/8.jpeg";
import img9 from "../assets/christmas/9.jpeg";
import img10 from "../assets/christmas/10.jpeg";
import img11 from "../assets/christmas/11.jpeg";
import img12 from "../assets/christmas/12.jpeg";

export function ChristmasGallerySection() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
  const setA = images.slice(0, 6);
  const setB = images.slice(6, 12);

  const row1Images = [...setA, ...setB, ...setA, ...setB];
  const row2Images = [...setB, ...setA, ...setB, ...setA];

  const MarqueeRow = ({ images, direction = "left", speed = 40 }: { images: string[], direction?: "left" | "right", speed?: number }) => (
    <div className="relative w-full overflow-hidden py-1">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        {images.map((img, i) => (
          <div
            key={`${direction}-${i}`}
            className="w-[300px] h-[400px] lg:w-[450px] lg:h-[600px] flex-shrink-0 relative cursor-pointer group overflow-hidden border border-gray-100 p-2 bg-white"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt="Gallery"
              className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110"
            />
            <div className="absolute inset-x-2 inset-y-2 bg-black/0 group-hover:bg-[#121212]/30 transition-all duration-700 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="border border-white/30 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <ZoomIn className="text-white w-8 h-8" />
              </div>
            </div>

            {/* Sequential Index Overlay */}
            <div className="absolute bottom-6 left-6 text-white text-[10px] tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700 uppercase">
              Moment ID: {(i % 12) + 1}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
          <div className="lg:col-span-8">
            <span className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              {t('gallery.badge')}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight tracking-tight">
              {t('gallery.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-gray-400 text-sm leading-relaxed italic border-l lg:border-l-0 lg:border-r border-gray-100 lg:pr-8 pl-8 lg:pl-0">
              {t('gallery.subtitle')}
            </p>
          </div>
        </div>

        {/* Dynamic Architectural Marquee */}
        <div className="flex flex-col gap-4 mt-24 -mx-6 sm:-mx-12 lg:-mx-16">
          <MarqueeRow images={row1Images} direction="left" speed={90} />
          <MarqueeRow images={row2Images} direction="right" speed={90} />
        </div>

        <div className="mt-20 flex justify-center">
          <div className="flex items-center space-x-6 text-[10px] tracking-[0.4em] uppercase font-bold text-gray-300">
            <span>{t('gallery.explore_instruction')}</span>
            <ArrowRight size={14} className="text-[#C5A059]" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121212]/95 p-4 sm:p-8 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 text-white hover:text-[#C5A059] transition-colors"
                aria-label="Close modal"
              >
                <X size={40} strokeWidth={1} />
              </button>
              <img
                src={selectedImage}
                alt="Enlarged gallery view"
                className="max-w-full max-h-[80vh] object-contain shadow-2xl p-2 bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
