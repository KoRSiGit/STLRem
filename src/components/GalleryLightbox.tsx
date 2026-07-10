import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import sandMixerXTC from '../assets/images/sand_mixer_xtc_1781504511099.jpg';

interface GalleryLightboxProps {
  images: string[];
  index: number;
  setIndex: (i: number | ((prev: number) => number)) => void;
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  lang: 'ru' | 'en';
}

export default function GalleryLightbox({ images, index, setIndex, isOpen, setIsOpen, lang }: GalleryLightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && images.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-8 select-none"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with actions */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#e65410] uppercase font-black">
                {lang === 'en' ? 'Siberian Foundry Technologies photo viewer' : 'ПРОСМОТР ФОТОГРАФИЙ — СИБТЕХЛИТ'}
              </span>
              <div className="text-xs font-bold text-gray-300">
                {index + 1} / {images.length}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 sm:p-3 bg-white/5 hover:bg-[#e65410]/20 hover:text-[#e65410] border border-white/10 text-white transition rounded-none flex items-center gap-1.5 cursor-pointer text-xs uppercase font-mono font-black"
              aria-label="Close viewer"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Close' : 'Закрыть (ESC)'}</span>
            </button>
          </div>

          {/* Main Content Area: Large Image & Nav buttons */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-6">
            {/* Backdrop Click Dismiss Wrapper */}
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setIsOpen(false)}
            />

            {/* Left navigation arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((prev: number) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-1 sm:left-4 z-40 p-3 sm:p-4 bg-black/80 hover:bg-[#e65410] text-white transition-all rounded-none border border-white/10 flex items-center justify-center cursor-pointer font-black"
                id="lightbox-prev-btn"
              >
                ◀
              </button>
            )}

            {/* Large responsive high-res image */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-h-[65vh] md:max-h-[70vh] max-w-full z-10 overflow-hidden bg-slate-900 border-2 border-white/10 shadow-2xl"
            >
              <img
                src={images[index]}
                alt="Equipment high resolution review"
                className="object-contain max-h-[65vh] md:max-h-[70vh] w-auto h-auto mx-auto select-none"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = sandMixerXTC;
                }}
              />
            </motion.div>

            {/* Right navigation arrow */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex((prev: number) => (prev + 1) % images.length);
                }}
                className="absolute right-1 sm:right-4 z-40 p-3 sm:p-4 bg-black/80 hover:bg-[#e65410] text-white transition-all rounded-none border border-white/10 flex items-center justify-center cursor-pointer font-black"
                id="lightbox-next-btn"
              >
                ▶
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip for instant swap */}
          {images.length > 1 && (
            <div className="w-full max-w-xl bg-white/5 border border-white/10 p-3 sm:p-4 rounded-none z-10">
              <div className="flex items-center justify-center gap-3">
                {images.map((img, idx) => {
                  const isActive = idx === index;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setIndex(idx)}
                      className={`relative aspect-video w-16 sm:w-20 overflow-hidden border-2 cursor-pointer transition-all duration-150 ${
                        isActive ? 'border-[#e65410] scale-105 shadow-md' : 'border-white/20 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Mini preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = sandMixerXTC;
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
