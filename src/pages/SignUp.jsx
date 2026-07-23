import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // 1. Import Auth Hook

const SignUp = ({ onSuccess }) => {
    const navigate = useNavigate();
    const { register } = useAuth(); // 2. Extract register function

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all required fields.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!formData.agreeTerms) {
            setError('You must agree to the Terms & Conditions.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // 3. Register user with API payload format
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword
            });

            setIsSuccess(true);
            if (onSuccess) onSuccess();

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Failed to create account.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100/60 p-4 sm:p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50 border border-gray-100/80"
            >
                {/* Header */}
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-black tracking-tight uppercase text-black">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">
                        Join us today and discover top style brands
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-3.5 rounded-2xl bg-red-50/80 border border-red-200/60 flex items-center gap-3 text-red-600 text-xs font-semibold"
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}

                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 flex items-center gap-3 text-emerald-600 text-xs font-semibold"
                    >
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span>Account created successfully! Redirecting...</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider uppercase text-gray-700">
                            Full Name
                        </label>
                        <div className="relative flex items-center">
                            <User className="absolute left-4 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-black placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider uppercase text-gray-700">
                            Email Address
                        </label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-4 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-black placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider uppercase text-gray-700">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-4 w-4 h-4 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-12 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-black placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-200"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-gray-400 hover:text-black transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold tracking-wider uppercase text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-4 w-4 h-4 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200 rounded-2xl text-black placeholder-gray-400 text-sm focus:outline-none focus:bg-white focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="flex items-center gap-2.5 pt-2">
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="w-4 h-4 rounded-md border-gray-300 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black"
                        />
                        <label htmlFor="agreeTerms" className="text-xs text-gray-600 font-medium cursor-pointer select-none">
                            I agree to the{' '}
                            <a href="#terms" className="text-black font-semibold underline underline-offset-2">
                                Terms & Conditions
                            </a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-6 bg-black hover:bg-zinc-800 active:scale-[0.99] text-white font-bold uppercase tracking-wider text-xs rounded-2xl transition-all shadow-lg shadow-black/10 flex items-center justify-center mt-6"
                    >
                        {isLoading ? (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Sign Up'
                        )}
                    </button>
                </form>

                {/* Footer Switch */}
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 font-medium">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="font-bold text-black hover:underline ml-1 uppercase tracking-wider"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUp;