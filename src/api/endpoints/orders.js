import API from '../axios';

/**
 * Submit / Create a new order
 * @param {Object} orderData Order details (items, shipping_address, payment_method, etc.)
 */
export const createOrder = async (orderData) => {
    const response = await API.post('/orders', orderData);
    return response.data;
};

/**
 * Fetch past orders for the authenticated user (Optional for Profile page)
 */
export const fetchUserOrders = async () => {
    const response = await API.get('/orders');
    return response.data?.data || response.data;
};