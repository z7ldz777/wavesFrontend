import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios'; // Adjust path if your axios file is in a different folder

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('customer_token') || null);
    const [loading, setLoading] = useState(true);

    // Fetch user details if a token exists on app load
    useEffect(() => {
        const fetchCustomerProfile = async () => {
            if (token) {
                try {
                    const response = await API.get('/me');
                    if (response.data?.success || response.data?.data) {
                        setUser(response.data.data || response.data);
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    // Clear invalid token if request fails with 401
                    if (error.response?.status === 401) {
                        logout();
                    }
                }
            }
            setLoading(false);
        };

        fetchCustomerProfile();
    }, [token]);

    // Handle Login
    const login = async (email, password) => {
        const response = await API.post('/login', { email, password });
        const resData = response.data;

        // Extract token from backend response
        const authToken = resData.data?.token || resData.token;
        const userData = resData.data?.user || resData.data;

        if (authToken) {
            localStorage.setItem('customer_token', authToken);
            setToken(authToken);
            setUser(userData);
        }
        return resData;
    };

    // Handle Registration
    const register = async (userData) => {
        const response = await API.post('/register', userData);
        const resData = response.data;

        const authToken = resData.data?.token || resData.token;
        const userInfo = resData.data?.user || resData.data;

        if (authToken) {
            localStorage.setItem('customer_token', authToken);
            setToken(authToken);
            setUser(userInfo);
        }
        return resData;
    };

    // Handle Logout
    const logout = async () => {
        try {
            if (token) {
                await API.post('/logout');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('customer_token');
            setToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};