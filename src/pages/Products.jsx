import React, { useState, useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import FilterSection from '../components/FilterSection';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import LoadingComponent from '../components/LoadingComponent';
import EmptyStateComponent from '../components/EmptyStateComponent';
import { fetchFilteredProducts, fetchFilterOptions } from '../api/endpoints/products';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);

    // Filters & State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortOrder, setSortOrder] = useState('newest');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Initial Load: Fetch Categories and Brands for Sidebar
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const { categories, brands } = await fetchFilterOptions();
                setCategories(categories);
                setBrands(brands);
            } catch (error) {
                console.error("Failed to fetch filter options:", error);
            }
        };

        loadInitialData();
    }, []);

    // Fetch Products whenever Filters or Page change
    useEffect(() => {
        const loadProducts = async () => {
            setProductsLoading(true);
            try {
                const response = await fetchFilteredProducts({
                    search: searchTerm,
                    category: selectedCategory,
                    brand: selectedBrand,
                    max_price: maxPrice,
                    page: currentPage,
                });

                // Handle Laravel Paginated Response vs Plain Array Response
                if (response && response.data && Array.isArray(response.data)) {
                    setProducts(response.data);
                    setTotalPages(response.meta?.last_page || response.last_page || 1);
                    setTotalResults(response.meta?.total || response.total || response.data.length);
                } else if (Array.isArray(response)) {
                    setProducts(response);
                    setTotalPages(1);
                    setTotalResults(response.length);
                } else {
                    setProducts([]);
                    setTotalPages(1);
                    setTotalResults(0);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
                setProductsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            loadProducts();
        }, 300); // Debounce search requests

        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory, selectedBrand, maxPrice, currentPage]);

    // Client-side Sorting
    const sortedProducts = [...products].sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        if (sortOrder === 'price-low') return priceA - priceB;
        if (sortOrder === 'price-high') return priceB - priceA;
        return (b.id || 0) - (a.id || 0); // Default newest
    });

    if (loading) return <LoadingComponent />;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-3xl font-extrabold uppercase tracking-tight">All Products</h1>

                {/* Search Bar */}
                <div className="w-full md:w-80">
                    <SearchInput
                        value={searchTerm}
                        onChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
                        onClear={() => { setSearchTerm(''); setCurrentPage(1); }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Filter Sidebar */}
                <div className="lg:col-span-3">
                    <FilterSection
                        categories={categories}
                        brands={brands}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={(val) => { setSelectedCategory(val); setCurrentPage(1); }}
                        selectedBrand={selectedBrand}
                        setSelectedBrand={(val) => { setSelectedBrand(val); setCurrentPage(1); }}
                        maxPrice={maxPrice}
                        setMaxPrice={(val) => { setMaxPrice(val); setCurrentPage(1); }}
                    />
                </div>

                {/* Product Grid & Sorting */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
                        <span className="font-semibold text-gray-600">
                            Showing {totalResults} results
                        </span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="bg-white border rounded-lg px-3 py-1.5 font-semibold text-gray-700 outline-none"
                        >
                            <option value="newest">Sort by: Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    {productsLoading ? (
                        <LoadingComponent />
                    ) : sortedProducts.length === 0 ? (
                        <EmptyStateComponent message="No products found matching your search and filter criteria." />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {sortedProducts.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;