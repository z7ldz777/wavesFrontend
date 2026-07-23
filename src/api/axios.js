import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Laravel backend Base URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor to inject Token and Language dynamically
API.interceptors.request.use((config) => {
    // Use customer token for public/customer routes, admin token for admin routes
    const token = localStorage.getItem('customer_token') || localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; //
    }

    // Language header (ar or en)
    const lang = localStorage.getItem('lang') || 'en';
    config.headers['Accept-Language'] = lang; //

    return config;
});

export default API;