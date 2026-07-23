import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';

// API Endpoint
import { submitContactForm } from '../api/endpoints/contact';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        let errs = {};
        if (!formData.name.trim()) errs.name = 'Full name is required';
        if (!formData.phone.trim()) errs.phone = 'Phone number is required';
        if (!formData.email.trim()) {
            errs.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errs.email = 'Enter a valid email address';
        }
        if (!formData.message.trim()) errs.message = 'Message is required';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await submitContactForm(formData);
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', phone: '', email: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            setIsSubmitting(false);
            alert(err.response?.data?.message || err.message || 'Failed to submit message.');
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-gray-900">
            <nav className="text-xs text-gray-500 mb-4"><span>Contact</span></nav>

            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-2">Contact Us</h1>
                <p className="text-sm text-gray-500 max-w-xl">
                    Have a question or need assistance with your order? Reach out to our support team.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                {/* Information Side */}
                <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-6">
                    <h2 className="text-xl font-bold text-black border-b border-gray-200 pb-4">Get In Touch</h2>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                            <FiPhone className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xs text-gray-400 font-semibold uppercase">Phone</h3>
                            <p className="text-sm font-semibold text-black mt-0.5">+962 77 568 5576</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                            <FiMail className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xs text-gray-400 font-semibold uppercase">Email</h3>
                            <p className="text-sm font-semibold text-black mt-0.5">waves@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0">
                            <FiMapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xs text-gray-400 font-semibold uppercase">Location</h3>
                            <p className="text-sm font-semibold text-black mt-0.5">Amman, Jordan</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-7 border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white">
                    <h2 className="text-2xl font-bold text-black mb-6">Send Us a Message</h2>

                    {submitted && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm">
                            <FiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <span>Thank you! Your message has been sent successfully.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 text-sm rounded-full px-5 py-3.5 focus:outline-none"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1 pl-3">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Phone Number *</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 text-sm rounded-full px-5 py-3.5 focus:outline-none"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1 pl-3">{errors.phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Email Address *</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-gray-100 text-sm rounded-full px-5 py-3.5 focus:outline-none"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 pl-3">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">Message *</label>
                            <textarea
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-gray-100 text-sm rounded-2xl px-5 py-3.5 focus:outline-none resize-none"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-xs mt-1 pl-3">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-black text-white text-xs font-semibold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                        >
                            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            <FiSend className="w-3.5 h-3.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;