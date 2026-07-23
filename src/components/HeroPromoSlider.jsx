import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const PROMO_SLIDES = [
    {
        id: 1,
        title: 'New Summer Arrivals',
        discount: 'UP TO 40% OFF',
        tag: 'Trending Now',
        bgGradient: 'from-zinc-900/90 via-gray-900/80 to-black/90',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Exclusive Streetwear',
        discount: 'LIMITED EDITION',
        tag: 'Waves Exclusive',
        bgGradient: 'from-gray-900/90 via-zinc-800/80 to-black/90',
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'Footwear Collection',
        discount: 'FLAT 20% OFF',
        tag: 'Best Sellers',
        bgGradient: 'from-neutral-900/90 via-zinc-900/80 to-stone-900/90',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
    },
];

const HeroPromoSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const slide = PROMO_SLIDES[currentIndex];

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % PROMO_SLIDES.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + PROMO_SLIDES.length) % PROMO_SLIDES.length);

    return (
        <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/30 backdrop-blur-xl font-sans">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} backdrop-blur-md flex flex-row items-center justify-between p-6 sm:p-8 text-white overflow-hidden`}
                >
                    {/* Left Content Side */}
                    <div className="z-10 w-1/2 pr-4 space-y-3">
                        <motion.span
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-white/15 rounded-full backdrop-blur-md border border-white/20"
                        >
                            <Tag className="w-3 h-3 text-[#AACDDC]" />
                            {slide.tag}
                        </motion.span>

                        <motion.h3
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight"
                        >
                            {slide.title}
                        </motion.h3>

                        <motion.div
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-xs sm:text-sm font-black tracking-widest uppercase bg-gradient-to-r from-amber-200 to-yellow-400 bg-clip-text text-transparent">
                                {slide.discount}
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Image Side with Frosted Frame */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="relative w-1/2 h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20"
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="absolute bottom-5 left-6 z-20 flex gap-1.5">
                {PROMO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2">
                <button
                    onClick={handlePrev}
                    className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition border border-white/20 shadow-sm active:scale-95"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={handleNext}
                    className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition border border-white/20 shadow-sm active:scale-95"
                    aria-label="Next Slide"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default HeroPromoSlider;