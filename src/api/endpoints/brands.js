import API from '../axios';

/**
 * Fetch all brands
 */
export const fetchBrands = async () => {
    const response = await API.get('/brands');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    }
    return Array.isArray(response.data) ? response.data : [];
};

/**
 * Fetch single brand by ID
 */
export const fetchBrandById = async (id) => {
    const response = await API.get(`/brands/${id}`);
    return response.data?.data || response.data;
};