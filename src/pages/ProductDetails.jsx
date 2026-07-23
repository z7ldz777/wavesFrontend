import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import LoadingComponent from '../components/LoadingComponent';
import EmptyStateComponent from '../components/EmptyStateComponent';
import { fetchProductById, fetchRelatedProducts } from '../api/endpoints/products';
import { FaStar, FaStarHalfAlt, FaRegStar, FaMinus, FaPlus } from 'react-icons/fa';
import { ShoppingBag, Tag, ShieldCheck, Box } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedImg, setSelectedImg] = useState('');
    const [selectedSize, setSelectedSize] = useState(42);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProductDetails = async () => {
            setLoading(true);
            setError(null);
            setQuantity(1); // Reset quantity on ID change

            try {
                const data = await fetchProductById(id);
                setProduct(data);

                // Set main image or fallback image array
                const mainImg = data.main_image || data.image_url || (data.images && data.images[0]) || '';
                setSelectedImg(mainImg);

                // Fetch related items by category ID
                const categoryId = data.category_id || data.category?.id;
                const related = await fetchRelatedProducts(categoryId, id);
                setRelatedProducts(related);
            } catch (err) {
                console.error('Error loading product details:', err);
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadProductDetails();
        }
    }, [id]);

    if (loading) return <LoadingComponent />;
    if (error || !product) return <EmptyStateComponent message={error || 'Product not found.'} />;

    // Construct array of all images
    const additionalImgs = Array.isArray(product.additional_images)
        ? product.additional_images
        : Array.isArray(product.images)
            ? product.images
            : [];

    const allImages = Array.from(new Set([product.main_image || product.image_url, ...additionalImgs])).filter(Boolean);

    const renderStars = (ratingVal = 4.5) => {
        const stars = [];
        const numRating = Number(ratingVal) || 4.5;
        for (let i = 1; i <= 5; i++) {
            if (numRating >= i) stars.push(<FaStar key={i} className="text-amber-400 w-3.5 h-3.5" />);
            else if (numRating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-amber-400 w-3.5 h-3.5" />);
            else stars.push(<FaRegStar key={i} className="text-gray-300 w-3.5 h-3.5" />);
        }
        return stars;
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-gray-900">
            {/* Product Gallery & Action Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">

                {/* Gallery Thumbnails */}
                {allImages.length > 0 && (
                    <div className="lg:col-span-2 flex lg:flex-col gap-3 order-2 lg:order-1 justify-center lg:justify-start">
                        {allImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImg(img)}
                                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-50 border-2 p-2 flex items-center justify-center transition-all duration-200 overflow-hidden ${selectedImg === img ? 'border-black shadow-md scale-105' : 'border-gray-100 hover:border-gray-300'
                                    }`}
                            >
                                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Main Image Display */}
                <div className={`${allImages.length > 0 ? 'lg:col-span-5' : 'lg:col-span-7'} bg-gradient-to-b from-gray-50 to-gray-100/60 rounded-3xl p-8 flex items-center justify-center order-1 lg:order-2 aspect-square border border-gray-100/80 shadow-inner`}>
                    <img
                        src={selectedImg || product.main_image || product.image_url}
                        alt={product.name_en || product.name}
                        className="w-full h-full object-contain drop-shadow-lg transition-all duration-300"
                    />
                </div>

                {/* Product Details & Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between order-3 space-y-6">
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black leading-tight">
                            {product.name_en || product.name}
                        </h1>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center space-x-1">{renderStars(product.rating)}</div>
                            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                {product.rating || 4.5} / 5.0
                            </span>
                        </div>

                        <div className="flex items-baseline gap-2 pt-2">
                            <span className="text-3xl font-black tracking-tight text-black">JD {product.price}</span>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed border-t border-b border-gray-100 py-4">
                            {product.description_en || product.description || 'No description available for this product.'}
                        </p>

                        {/* Size Selection */}
                        <div className="space-y-3 pt-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                                Choose Size
                            </span>
                            <div className="flex flex-wrap gap-2.5">
                                {[37, 40, 42, 43].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${selectedSize === size
                                                ? 'bg-black text-white shadow-md shadow-black/10 scale-105'
                                                : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/80'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quantity & Add to Cart Controls */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between bg-gray-100/80 rounded-2xl px-4 py-3 w-32 border border-gray-200/50">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="text-gray-500 hover:text-black transition-colors p-1"
                            >
                                <FaMinus className="w-2.5 h-2.5" />
                            </button>
                            <span className="font-extrabold text-sm text-black">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="text-gray-500 hover:text-black transition-colors p-1"
                            >
                                <FaPlus className="w-2.5 h-2.5" />
                            </button>
                        </div>

                        <button
                            onClick={() => addToCart({ ...product, quantity, selectedSize })}
                            className="flex-1 bg-black hover:bg-zinc-800 active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-black/10 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Specifications / Meta Info */}
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-16">
                <h3 className="text-base font-extrabold mb-5 text-black border-b border-gray-100 pb-3 flex items-center justify-between">
                    <span>تفاصيل المنتج (Product Details)</span>
                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                </h3>
                <ul className="space-y-4 text-sm">
                    <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="font-medium text-gray-500 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-gray-400" />
                            التصنيف:
                        </span>
                        <span className="font-bold text-gray-900">
                            {product.category?.name_ar || product.category?.name_en || product.category?.name || 'غير محدد'}
                        </span>
                    </li>
                    <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="font-medium text-gray-500 flex items-center gap-2">
                            <Box className="w-4 h-4 text-gray-400" />
                            البراند:
                        </span>
                        <span className="font-bold text-gray-900">
                            {product.brand?.name || 'غير محدد'}
                        </span>
                    </li>
                    <li className="flex justify-between items-center">
                        <span className="font-medium text-gray-500">حالة توفر المنتج:</span>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${(product.stock || product.quantity || 0) > 0
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                                    : 'bg-red-50 text-red-600 border border-red-200/60'
                                }`}
                        >
                            {(product.stock || product.quantity || 0) > 0 ? 'متوفر بالمخزن (In Stock)' : 'غير متوفر (Out of Stock)'}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className="pt-12 border-t border-gray-100">
                    <div className="text-center mb-10 space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight">
                            You Might Also Like
                        </h2>
                        <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                            Explore related items from our collection
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((prod) => (
                            <ProductCard key={prod.id} product={prod} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetails;