import API from '../axios';

/**
 * Fetch all data required for the Home page
 */
export const fetchHomeData = async () => {
    const [productsRes, categoriesRes, brandsRes, galleryRes] = await Promise.all([
        API.get('/products'),     // Public active products
        API.get('/categories'),   // Public categories[cite: 1]
        API.get('/brands'),       // Public brands[cite: 1]
        API.get('/gallery'),      // Public active gallery items[cite: 1]
    ]);

    // Extract arrays handling Laravel's wrapper format ({ success: true, data: [...] })[cite: 1]
    const extractData = (res) => {
        if (res.data && Array.isArray(res.data.data)) {
            return res.data.data;
        }
        return Array.isArray(res.data) ? res.data : [];
    };

    return {
        products: extractData(productsRes),
        categories: extractData(categoriesRes),
        brands: extractData(brandsRes),
        gallery: extractData(galleryRes),
    };
};