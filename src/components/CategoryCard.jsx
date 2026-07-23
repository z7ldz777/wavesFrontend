import React from 'react';
import { Link } from 'react-router-dom';

import sportsImg from '../assets/sports-shoes.jpg';
import mensImg from '../assets/mens-shoes.jpg';
import heelsImg from '../assets/high-heels.jpg';
import kidsImg from '../assets/kids-shoes.jpg';

export const MAIN_CATEGORIES = [
    {
        id: 'sports',
        name: 'Sports Shoes',
        image: sportsImg,
        link: '/categories?category=sports',
        gridSpan: 'md:col-span-1 lg:col-span-1',
    },
    {
        id: 'mens',
        name: "Men's Shoes",
        image: mensImg,
        link: '/categories?category=mens',
        gridSpan: 'md:col-span-1 lg:col-span-2',
    },
    {
        id: 'heels',
        name: 'High Heels',
        image: heelsImg,
        link: '/categories?category=heels',
        gridSpan: 'md:col-span-1 lg:col-span-2',
    },
    {
        id: 'kids',
        name: 'Kids Shoes',
        image: kidsImg,
        link: '/categories?category=kids',
        gridSpan: 'md:col-span-1 lg:col-span-1',
    },
];

const CategoryCard = ({ name, image, link, gridSpan = '' }) => {
    return (
        <Link
            to={link}
            className={`group relative h-64 sm:h-72 overflow-hidden rounded-3xl bg-neutral-900 border border-gray-200/80 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 ${gridSpan}`}
        >
            {/* Category Image */}
            <img
                src={image}
                alt={name}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x600?text=Category+Image';
                }}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark Linear Gradient Overlay for High Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

            {/* Modern Clean Content Layer */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                {/* Title with Animated Accent Bar */}
                <div className="self-start">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {name}
                    </h3>
                    <div className="h-1 w-8 bg-[#81A6C6] rounded-full mt-2 transition-all duration-500 group-hover:w-16" />
                </div>

                {/* Minimalist Explore Button */}
                <div className="self-start flex items-center gap-2 bg-white text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md transition-all duration-300 group-hover:bg-[#81A6C6] group-hover:text-white">
                    <span>Explore Collection</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
            </div>
        </Link>
    );
};

export default CategoryCard;