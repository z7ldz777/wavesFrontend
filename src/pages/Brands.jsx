import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSection from '../components/FilterSection';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import LoadingComponent from '../components/LoadingComponent';
import EmptyStateComponent from '../components/EmptyStateComponent';
import { MAIN_BRANDS } from '../components/BrandCard';

// API Endpoints
import { fetchFilteredProducts, fetchFilterOptions } from '../api/endpoints/products';

const Brands = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialBrandParam = searchParams.get('brand') || '';

    // Data States
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(initialBrandParam);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortBy, setSortBy] = useState('latest');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    // Sync state with URL parameter changes
    useEffect(() => {
        const brandFromUrl = searchParams.get('brand') || '';
        setSelectedBrand(brandFromUrl);
    }, [searchParams]);

    // Update Brand URL param
    const handleBrandChange = (brandId) => {
        setSelectedBrand(brandId);
        setCurrentPage(1);

        const newParams = new URLSearchParams(searchParams);
        if (brandId) {
            newParams.set('brand', brandId);
        } else {
            newParams.delete('brand');
        }
        setSearchParams(newParams);
    };

    // Load Products & Options via standard endpoint helpers
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                const [productsData, optionsData] = await Promise.all([
                    fetchFilteredProducts({}),
                    fetchFilterOptions(),
                ]);

                const productList = Array.isArray(productsData)
                    ? productsData
                    : productsData?.data || [];

                setProducts(productList);
                setCategories(optionsData.categories || []);
                setBrands(optionsData.brands || []);
            } catch (error) {
                console.error('Failed to load brands page data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    // Merge static and API brands
    const allAvailableBrands = useMemo(() => {
        const merged = [...(MAIN_BRANDS || [])];
        brands.forEach((b) => {
            const bName = b.name || '';
            if (!merged.some((m) => String(m.id) === String(b.id) || m.name?.toLowerCase() === bName.toLowerCase())) {
                merged.push({ id: b.id, name: bName });
            }
        });
        return merged;
    }, [brands]);

    // Client-side filtering & sorting
    const filteredProducts = useMemo(() => {
        return products
            .filter((p) => {
                const nameEn = p.name_en || p.name || '';
                const matchesSearch = !searchTerm || nameEn.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesCategory =
                    !selectedCategory ||
                    String(p.category_id) === String(selectedCategory) ||
                    String(p.category?.id) === String(selectedCategory);

                const targetBrand = String(selectedBrand).toLowerCase();
                const productBrandId = String(p.brand_id || p.brand?.id || '').toLowerCase();
                const productBrandName = (p.brand?.name || p.brand_name || '').toLowerCase();

                const matchesBrand =
                    !selectedBrand ||
                    productBrandId === targetBrand ||
                    productBrandName === targetBrand ||
                    productBrandName.includes(targetBrand);

                const matchesPrice = Number(p.price) <= Number(maxPrice);

                return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
            })
            .sort((a, b) => {
                if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
                if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
                return new Date(b.created_at || b.date || 0) - new Date(a.created_at || a.date || 0);
            });
    }, [products, searchTerm, selectedCategory, selectedBrand, maxPrice, sortBy]);

    // Pagination Calculation
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    if (loading) return <LoadingComponent />;

    const activeBrandObj = allAvailableBrands.find(
        (b) => String(b.id).toLowerCase() === String(selectedBrand).toLowerCase()
    );
    const currentBrandLabel = activeBrandObj ? activeBrandObj.name : selectedBrand || 'All Brands';

    return (
        <div className="w-full min-h-screen bg-white font-sans text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="inline-flex items-center gap-2 text-xs sm:text-sm px-4 py-2 rounded-full bg-gray-50 border border-gray-200/80 mb-8 backdrop-blur-md">
                    <Link to="/" className="text-gray-500 hover:text-[#81A6C6] transition-colors">Home</Link>
                    <span className="text-gray-400">/</span>
                    <span
                        className="text-gray-500 hover:text-[#81A6C6] cursor-pointer transition-colors"
                        onClick={() => handleBrandChange('')}
                    >
                        Brands
                    </span>
                    <span className="text-gray-400">/</span>
                    <span className="text-black font-semibold capitalize">{currentBrandLabel}</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-gray-100">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-black tracking-tight">
                            Brand Collection
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Explore iconic styles from top global footwear brands.</p>
                    </div>
                    <div className="w-full md:w-80">
                        <SearchInput
                            value={searchTerm}
                            onChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
                            onClear={() => setSearchTerm('')}
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="bg-gray-50/70 p-5 rounded-3xl border border-gray-100 sticky top-24 backdrop-blur-md">
                            <FilterSection
                                categories={categories}
                                brands={brands}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={(val) => { setSelectedCategory(val); setCurrentPage(1); }}
                                selectedBrand={selectedBrand}
                                setSelectedBrand={handleBrandChange}
                                maxPrice={maxPrice}
                                setMaxPrice={(val) => { setMaxPrice(val); setCurrentPage(1); }}
                            />
                        </div>
                    </aside>

                    {/* Grid */}
                    <main className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-gray-50/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                Showing <span className="font-bold text-black">{paginatedProducts.length}</span> of <span className="font-bold text-black">{filteredProducts.length}</span> Products
                            </span>
                            <div className="flex items-center gap-3 text-xs sm:text-sm">
                                <span className="text-gray-500 font-semibold">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-semibold text-black focus:outline-none focus:ring-2 focus:ring-[#81A6C6] transition-all cursor-pointer shadow-sm"
                                >
                                    <option value="latest">Latest Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {paginatedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <EmptyStateComponent message="No products match your selected brand or filter criteria." />
                        )}

                        {filteredProducts.length > itemsPerPage && (
                            <div className="mt-10">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Brands;