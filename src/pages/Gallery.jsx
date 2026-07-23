import React, { useState, useEffect } from 'react';
import GalleryCard from '../components/GalleryCard';
import LoadingComponent from '../components/LoadingComponent';
import EmptyStateComponent from '../components/EmptyStateComponent';
import { FiX } from 'react-icons/fi';

// API Endpoint
import { fetchGallery } from '../api/endpoints/gallery';

const Gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const loadGallery = async () => {
            try {
                setLoading(true);
                const data = await fetchGallery();
                setGalleryItems(data);
            } catch (err) {
                console.error('Failed to fetch gallery:', err);
                setError(err.message || 'Failed to load gallery items.');
            } finally {
                setLoading(false);
            }
        };

        loadGallery();
    }, []);

    if (loading) return <LoadingComponent />;
    if (error || !galleryItems.length) {
        return <EmptyStateComponent message={error || 'No gallery items available.'} />;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-gray-900">
            <nav className="text-xs text-gray-500 mb-4">
                <span>Gallery</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-8">
                Explore Gallery
            </h1>

            {/* Responsive Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                    <GalleryCard key={item.id} item={item} onClick={() => setSelectedImage(item)} />
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-white text-2xl p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all cursor-pointer"
                    >
                        <FiX />
                    </button>
                    <div className="max-w-4xl w-full text-center">
                        <img
                            src={selectedImage.image || selectedImage.image_url}
                            alt={selectedImage.title || 'Gallery Item'}
                            className="max-h-[80vh] mx-auto rounded-lg object-contain"
                        />
                        <h3 className="text-white text-xl font-bold mt-4">{selectedImage.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{selectedImage.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;