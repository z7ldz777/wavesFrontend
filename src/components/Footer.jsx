import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#81A6C6]/80 backdrop-blur-md text-gray-900 pt-16 pb-8 font-sans border-t border-white/30 shadow-lg relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-black/10">

                    {/* Brand Info */}
                    <div className="md:col-span-1 space-y-4">
                        <Link to="/" className="text-3xl font-black text-black tracking-tight flex items-center gap-1">
                            <span>WAVES</span>
                            <span className="w-2 h-2 rounded-full bg-black"></span>
                        </Link>
                        <p className="text-xs text-gray-800 leading-relaxed font-medium">
                            We have shoes that suit your style and which you’re proud to wear. Designed for quality and everyday elegance.
                        </p>
                        {/* Social Icons with Glass pill effect */}
                        <div className="flex space-x-2.5 pt-2">
                            <a href="#" className="w-9 h-9 rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/80 border border-white/50 flex items-center justify-center text-black hover:scale-110 transition-all shadow-sm">
                                <FaTwitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-black/90 text-white flex items-center justify-center hover:scale-110 transition-all shadow-sm">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/80 border border-white/50 flex items-center justify-center text-black hover:scale-110 transition-all shadow-sm">
                                <FaInstagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/80 border border-white/50 flex items-center justify-center text-black hover:scale-110 transition-all shadow-sm">
                                <FaGithub className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Column 1: COMPANY */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4">Company</h3>
                        <ul className="space-y-2.5 text-xs font-semibold text-gray-800">
                            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link to="/works" className="hover:text-white transition-colors">Works</Link></li>
                            <li><Link to="/career" className="hover:text-white transition-colors">Career</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2: HELP */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4">Help</h3>
                        <ul className="space-y-2.5 text-xs font-semibold text-gray-800">
                            <li><Link to="/support" className="hover:text-white transition-colors">Customer Support</Link></li>
                            <li><Link to="/delivery" className="hover:text-white transition-colors">Delivery Details</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3: FAQ */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4">FAQ</h3>
                        <ul className="space-y-2.5 text-xs font-semibold text-gray-800">
                            <li><Link to="/account" className="hover:text-white transition-colors">Account</Link></li>
                            <li><Link to="/manage-deliveries" className="hover:text-white transition-colors">Manage Deliveries</Link></li>
                            <li><Link to="/orders" className="hover:text-white transition-colors">Orders</Link></li>
                            <li><Link to="/payments" className="hover:text-white transition-colors">Payments</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 4: RESOURCES */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4">Resources</h3>
                        <ul className="space-y-2.5 text-xs font-semibold text-gray-800">
                            <li><Link to="/ebooks" className="hover:text-white transition-colors">Free eBooks</Link></li>
                            <li><Link to="/tutorials" className="hover:text-white transition-colors">Development Tutorial</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors">How to - Blog</Link></li>
                            <li><Link to="/youtube" className="hover:text-white transition-colors">Youtube Playlist</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar Section */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-800">
                    <div>
                        Waves © 2000-2026, All Rights Reserved
                    </div>
                    <div>
                        Contact: +962 77 568 5576 | Email: waves@gmail.com
                    </div>
                    {/* Payment Badges */}
                    <div className="flex items-center space-x-2">
                        <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-blue-600 border border-white/60 shadow-sm">VISA</span>
                        <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-red-500 border border-white/60 shadow-sm">Mastercard</span>
                        <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-blue-800 border border-white/60 shadow-sm">PayPal</span>
                        <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-black border border-white/60 shadow-sm">Pay</span>
                        <span className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold text-gray-600 border border-white/60 shadow-sm">GPay</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;