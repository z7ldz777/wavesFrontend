import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

import defaultProductImg from '../assets/prada-shoe.jpg';

const ProductCard = ({ product }) => {
    const {
        id = 1,
        name = 'Prada Pumps',
        price = 145,
        oldPrice = null,
        discount = null,
        rating = 3.5,
        maxRating = 5,
        image = defaultProductImg,
    } = product || {};

    const renderStars = (ratingVal) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (ratingVal >= i) {
                stars.push(<FaStar key={i} className="text-amber-400 w-3.5 h-3.5" />);
            } else if (ratingVal >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-amber-400 w-3.5 h-3.5" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300 w-3.5 h-3.5" />);
            }
        }
        return stars;
    };

    return (
        <div className="group flex flex-col w-full bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#AACDDC] transition-all duration-300">
            {/* Product Image Container */}
            <Link to={`/products/${id}`} className="block w-full">
                <div className="w-full aspect-square bg-[#F3E3D0]/30 rounded-xl overflow-hidden flex items-center justify-center p-4 relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    {discount && (
                        <span className="absolute top-2.5 left-2.5 bg-[#81A6C6] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                            {typeof discount === 'number' ? `-${discount}%` : discount}
                        </span>
                    )}
                </div>
            </Link>

            {/* Product Details */}
            <div className="mt-3 flex flex-col gap-1.5 px-1">
                <Link to={`/products/${id}`}>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate tracking-tight group-hover:text-[#81A6C6] transition-colors">
                        {name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center space-x-0.5">
                        {renderStars(rating)}
                    </div>
                    <span className="text-xs font-semibold text-gray-500">
                        {rating}/<span className="text-gray-400">{maxRating}</span>
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg sm:text-xl font-black text-black tracking-tight">
                        JD{price}
                    </span>

                    {oldPrice && (
                        <span className="text-xs sm:text-sm font-semibold text-gray-400 line-through">
                            JD{oldPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;