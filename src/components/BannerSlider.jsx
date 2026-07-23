import React, { useState, useEffect } from 'react';
import HeroPromoSlider from '../components/HeroPromoSlider';

const BannerSlider = () => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/sliders')
            .then((res) => res.json())
            .then((data) => setSlides(Array.isArray(data) ? data : []))
            .catch(() => []);
    }, []);

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides]);

    if (!slides.length) {
        return (
            <div className="w-full">
                <HeroPromoSlider />
            </div>
        );
    }

    const currentSlide = slides[currentIndex];

    return (
        <div className="w-full rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md border border-white/50 shadow-xl flex flex-col">
            <div className="h-64 sm:h-80 bg-gradient-to-b from-white/80 to-[#F3E3D0]/30 flex items-center justify-center p-6 relative">
                <img
                    src={currentSlide.image || currentSlide.image_url}
                    alt={currentSlide.title || 'Promotion'}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md transition-all duration-500"
                />
            </div>
            <div className="bg-[#81A6C6]/90 backdrop-blur-md p-5 text-gray-900 border-t border-white/30">
                <p className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                    {currentSlide.title || currentSlide.caption || 'Nike sport shoe 50% off just for 2 days'}
                </p>
            </div>
        </div>
    );
};

export default BannerSlider;