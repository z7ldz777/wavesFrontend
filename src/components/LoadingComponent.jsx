import React from 'react';

const LoadingComponent = () => {
    return (
        <div className="w-full py-20 flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Loading...</p>
        </div>
    );
};

export default LoadingComponent;