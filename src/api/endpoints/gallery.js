import API from '../axios';

/**
 * Fetch all gallery items
 */
export const fetchGallery = async () => {
    const response = await API.get('/gallery');
    if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
    }
    return Array.isArray(response.data) ? response.data : [];
};

/**
 * Fetch a single gallery item by ID
 */
export const fetchGalleryItemById = async (id) => {
    const response = await API.get(`/gallery/${id}`);
    return response.data?.data || response.data;
};