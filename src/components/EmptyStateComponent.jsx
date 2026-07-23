import React from 'react';
import { FiInbox } from 'react-icons/fi';

const EmptyStateComponent = ({ message = 'No items found matching your criteria.' }) => {
    return (
        <div className="w-full border border-dashed border-gray-300 rounded-2xl py-16 px-4 text-center bg-gray-50 flex flex-col items-center justify-center">
            <FiInbox className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-sm font-semibold text-gray-700">{message}</p>
        </div>
    );
};

export default EmptyStateComponent;