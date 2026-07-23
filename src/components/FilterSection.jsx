import React from 'react';
import { MAIN_CATEGORIES } from './CategoryCard';
import { MAIN_BRANDS } from './BrandCard';

const FilterSection = ({
    categories = [],
    brands = [],
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    maxPrice,
    setMaxPrice,
}) => {
    // Merge Main Categories with dynamic backend categories
    const mergedCategories = [...MAIN_CATEGORIES];
    categories.forEach((cat) => {
        const catName = cat.name_en || cat.name;
        if (!mergedCategories.some((m) => String(m.id) === String(cat.id) || m.name.toLowerCase() === catName.toLowerCase())) {
            mergedCategories.push({
                id: cat.id,
                name: catName,
            });
        }
    });

    // Merge Main Brands with dynamic backend brands
    const mergedBrands = [...MAIN_BRANDS];
    brands.forEach((b) => {
        if (!mergedBrands.some((m) => String(m.id) === String(b.id) || m.name.toLowerCase() === (b.name || '').toLowerCase())) {
            mergedBrands.push({
                id: b.id,
                name: b.name,
            });
        }
    });

    return (
        <div className="border border-gray-200 rounded-2xl p-5 bg-white space-y-6 text-sm shadow-sm">
            <h3 className="font-bold text-black border-b pb-3 text-base">Filters</h3>

            {/* Categories Filter List */}
            <div>
                <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">Category</h4>
                <div className="space-y-1.5">
                    <button
                        onClick={() => setSelectedCategory('')}
                        className={`block w-full text-left text-xs py-1 transition-colors ${!selectedCategory ? 'font-bold text-black' : 'text-gray-600 hover:text-black'}`}
                    >
                        All Categories
                    </button>
                    {mergedCategories.map((cat) => {
                        const isSelected =
                            String(selectedCategory).toLowerCase() === String(cat.id).toLowerCase() ||
                            String(selectedCategory).toLowerCase() === cat.name.toLowerCase();

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`block w-full text-left text-xs py-1 transition-colors ${isSelected ? 'font-bold text-black' : 'text-gray-600 hover:text-black'}`}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Brands Filter List */}
            <div>
                <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">Brand</h4>
                <div className="space-y-1.5">
                    <button
                        onClick={() => setSelectedBrand('')}
                        className={`block w-full text-left text-xs py-1 transition-colors ${!selectedBrand ? 'font-bold text-black' : 'text-gray-600 hover:text-black'}`}
                    >
                        All Brands
                    </button>
                    {mergedBrands.map((b) => {
                        const isSelected =
                            String(selectedBrand).toLowerCase() === String(b.id).toLowerCase() ||
                            String(selectedBrand).toLowerCase() === (b.name || '').toLowerCase();

                        return (
                            <button
                                key={b.id}
                                onClick={() => setSelectedBrand(b.id)}
                                className={`block w-full text-left text-xs py-1 transition-colors ${isSelected ? 'font-bold text-black' : 'text-gray-600 hover:text-black'}`}
                            >
                                {b.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Slider Filter */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider">Max Price</h4>
                    <span className="font-bold text-xs">JD{maxPrice}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full accent-black cursor-pointer"
                />
            </div>
        </div>
    );
};

export default FilterSection;