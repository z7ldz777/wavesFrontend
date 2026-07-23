import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BannerSlider from '../components/BannerSlider';
import ProductCard from '../components/ProductCard';
import CategoryCard, { MAIN_CATEGORIES } from '../components/CategoryCard';
import BrandCard, { MAIN_BRANDS } from '../components/BrandCard';
import LoadingComponent from '../components/LoadingComponent';
import bannerBg from '../assets/banner-bg.jpg';
import { fetchHomeData } from '../api/endpoints/home';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [galleryItems, setGalleryItems] = useState([]);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const { products, categories, brands, gallery } = await fetchHomeData();
                setProducts(products);
                setCategories(categories);
                setBrands(brands);
                setGalleryItems(gallery);
            } catch (error) {
                console.error("Failed to load home page data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleNextGallery = () => {
        if (galleryItems.length > 0) {
            setCurrentGalleryIndex((prev) => (prev + 1) % galleryItems.length);
        }
    };

    const handlePrevGallery = () => {
        if (galleryItems.length > 0) {
            setCurrentGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
        }
    };

    if (loading) return <LoadingComponent />;

    // Use dynamic categories if returned from API, otherwise fallback to local constant[cite: 3]
    const displayCategories = categories.length > 0
        ? categories.slice(0, 6).map((cat, idx) => ({
            id: cat.id,
            name: cat.name || cat.name_en || cat.name_ar, // API handles bilingual field[cite: 1]
            image: cat.image || cat.image_url,
            link: `/categories/${cat.id}`,
            gridSpan: idx === 0 || idx === 3 ? 'col-span-1 md:col-span-2' : 'col-span-1'
        }))
        : MAIN_CATEGORIES;

    // Use dynamic brands if returned from API, otherwise fallback[cite: 3]
    const displayBrands = brands.length > 0
        ? brands.slice(0, 4).map((b) => ({
            id: b.id,
            name: b.name,
            logo: b.logo || b.logo_url,
            rating: b.rating || 5,
            description: b.description || '',
            link: `/brands/${b.id}`
        }))
        : MAIN_BRANDS;

    return (
        <div className="w-full font-sans bg-gray-50/50">
            {/* 1. Hero / Main Banner Section */}
            <section
                className="relative bg-cover bg-center py-8 md:py-12 px-4 sm:px-8 border-b border-gray-100/60 overflow-hidden"
                style={{ backgroundImage: `url(${bannerBg})` }}
            >
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Left Text & Stats */}
                    <div className="max-w-xl text-center lg:text-left">
                        <span className="inline-block px-3 py-1 bg-[#81A6C6]/20 border border-[#81A6C6]/30 text-[#81A6C6] text-xs font-bold uppercase tracking-widest rounded-full mb-3">
                            New Collection 2026
                        </span>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-gray-900 tracking-tight leading-tight mb-4">
                            FIND WHAT MATCHES YOUR STYLE
                        </h1>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                            Browse through our diverse range of meticulously crafted footwear, designed to elevate your everyday outfit with signature elegance.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                            <Link
                                to="/products"
                                className="w-full sm:w-auto bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#81A6C6] transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Shop Collection
                            </Link>
                            <Link
                                to="/categories"
                                className="w-full sm:w-auto bg-white/70 backdrop-blur-md text-gray-900 border border-gray-300/80 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-all duration-300 shadow-sm"
                            >
                                Explore Categories
                            </Link>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/10">
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black text-black">{brands.length > 0 ? `${brands.length}+` : '200+'}</h3>
                                <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Brands</p>
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black text-black">{products.length > 0 ? `${products.length}+` : '2,000+'}</h3>
                                <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Products</p>
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-black text-black">30k+</h3>
                                <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Customers</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Banner Slider Component */}
                    <div className="w-full lg:w-[500px]">
                        <BannerSlider />
                    </div>
                </div>
            </section>

            {/* 2. Top Brands Logo Strip */}
            <section className="bg-black/90 backdrop-blur-md py-6 border-y border-white/10 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-6 opacity-90">
                    <span className="text-white text-xl sm:text-2xl font-black italic tracking-widest uppercase hover:text-[#AACDDC] transition-colors">PUMA</span>
                    <span className="text-white text-xl sm:text-2xl font-serif tracking-widest hover:text-[#AACDDC] transition-colors">Christian Louboutin</span>
                    <span className="text-white text-xl sm:text-2xl font-extrabold tracking-widest uppercase hover:text-[#AACDDC] transition-colors">GUCCI</span>
                    <span className="text-white text-xl sm:text-2xl font-bold tracking-widest uppercase hover:text-[#AACDDC] transition-colors">PRADA</span>
                    <span className="text-white text-xl sm:text-2xl font-black tracking-widest uppercase italic hover:text-[#AACDDC] transition-colors">NIKE</span>
                </div>
            </section>

            {/* 3. Main Categories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-[#81A6C6]/15 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/40 shadow-sm">
                    <h2 className="text-2xl sm:text-3xl font-black text-center uppercase tracking-tight text-gray-900 mb-6">
                        Main Categories
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {displayCategories.map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                name={cat.name}
                                image={cat.image}
                                link={cat.link}
                                gridSpan={cat.gridSpan}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Brands Showcase Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tight uppercase">
                            Featured Brands
                        </h2>
                        <p className="text-xs text-gray-500 font-medium mt-1">Discover top international creators</p>
                    </div>
                    <Link
                        to="/brands"
                        className="text-xs font-bold text-gray-900 hover:text-[#81A6C6] flex items-center gap-1 transition-colors"
                    >
                        <span>View All Brands</span> →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {displayBrands.map((brand) => (
                        <BrandCard
                            key={brand.id}
                            name={brand.name}
                            logo={brand.logo}
                            rating={brand.rating}
                            description={brand.description}
                            link={brand.link}
                        />
                    ))}
                </div>
            </section>

            <hr className="max-w-7xl mx-auto border-gray-200/80 my-4" />

            {/* 5. Trending Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
                            Trending Products
                        </h2>
                        <p className="text-xs text-gray-500 font-medium mt-1">Handpicked style favorites for you</p>
                    </div>
                    <Link
                        to="/products"
                        className="text-xs font-bold text-gray-900 hover:text-[#81A6C6] flex items-center gap-1 transition-colors"
                    >
                        <span>Explore Catalog</span> →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* 6. Interactive Glass Gallery Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-lg overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-black">
                            Gallery Highlights
                        </h2>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevGallery}
                                className="w-8 h-8 flex items-center justify-center text-black bg-white/80 hover:bg-white rounded-full shadow-sm border border-gray-200 transition-all active:scale-95"
                                aria-label="Previous image"
                            >
                                ←
                            </button>
                            <button
                                onClick={handleNextGallery}
                                className="w-8 h-8 flex items-center justify-center text-black bg-white/80 hover:bg-white rounded-full shadow-sm border border-gray-200 transition-all active:scale-95"
                                aria-label="Next image"
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {galleryItems.length > 0 ? (
                        <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-inner">
                            <img
                                src={galleryItems[currentGalleryIndex]?.image || galleryItems[currentGalleryIndex]?.image_url}
                                alt="Gallery Highlight"
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur-md p-6 border-t border-white/20 text-white">
                                <p className="text-xl sm:text-2xl font-black tracking-tight">
                                    {galleryItems[currentGalleryIndex]?.title || galleryItems[currentGalleryIndex]?.name || 'Featured Highlight'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 flex items-center justify-center text-gray-400 font-medium">
                            No gallery items available.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;