import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="p-2 border rounded-full text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                <FiChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded-full text-xs font-semibold transition-colors ${currentPage === page ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="p-2 border rounded-full text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                <FiChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Pagination;