import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchInput = ({
    value,
    onChange,
    onClear,
    placeholder = 'Search for products...',
    onSubmit,
}) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && onSubmit) {
            e.preventDefault();
            onSubmit(value);
        }
    };

    return (
        <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full bg-gray-100 text-xs text-black rounded-full pl-11 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-black transition-all"
            />
            {value && (
                <button
                    type="button"
                    onClick={onClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-1 transition-colors"
                    aria-label="Clear search input"
                >
                    <FiX className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default SearchInput;