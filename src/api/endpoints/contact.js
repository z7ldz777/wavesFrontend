import API from '../axios';

/**
 * Submit contact form payload
 * @param {Object} formData { name, phone, email, message }
 */
export const submitContactForm = async (formData) => {
    const response = await API.post('/contact', formData);
    return response.data;
};