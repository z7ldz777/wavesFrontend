import React, { useState, useEffect } from 'react';
import { FiUser, FiPackage, FiMapPin, FiLogOut, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const Profile = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('orders');

    // States for backend integration
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state for Personal Info updates
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setIsLoading(true);

                // TODO: Replace with your actual backend API calls
                // const userResponse = await fetch('/api/user/profile');
                // const userData = await userResponse.json();

                // const ordersResponse = await fetch('/api/user/orders');
                // const ordersData = await ordersResponse.json();

                // Example placeholder structure:
                // setUser(userData);
                // setOrders(ordersData);
                // setFormData({ name: userData.name, email: userData.email, phone: userData.phone });

            } catch (err) {
                setError('Failed to load profile data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    // Helper function to map backend order status to badge styles
    const getBadgeColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'confirmed':
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            // TODO: Call your backend update endpoint
            // await fetch('/api/user/profile', { method: 'PUT', body: JSON.stringify(formData) });
            console.log('Updating profile with:', formData);
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center font-sans font-bold text-gray-500">
                Loading profile...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center font-sans text-red-500 font-bold">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
            {/* Header Banner */}
            <div className="bg-[#A4C2DC] rounded-3xl p-6 sm:p-10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-extrabold uppercase shadow-md">
                        {user?.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase text-black tracking-tight">
                            {user?.name || 'User Name'}
                        </h1>
                        <p className="text-gray-700 text-sm">{user?.email || 'email@example.com'}</p>
                        {user?.joined && (
                            <p className="text-xs text-gray-600 mt-1">Member since {user.joined}</p>
                        )}
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-800 transition shadow"
                >
                    <FiLogOut /> Logout
                </button>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition text-left ${activeTab === 'orders'
                            ? 'bg-black text-white shadow-md'
                            : 'bg-gray-50 text-black hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        <FiPackage className="text-lg" /> My Orders
                    </button>

                    <button
                        onClick={() => setActiveTab('info')}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition text-left ${activeTab === 'info'
                            ? 'bg-black text-white shadow-md'
                            : 'bg-gray-50 text-black hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        <FiUser className="text-lg" /> Personal Info
                    </button>

                    <button
                        onClick={() => setActiveTab('address')}
                        className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition text-left ${activeTab === 'address'
                            ? 'bg-black text-white shadow-md'
                            : 'bg-gray-50 text-black hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        <FiMapPin className="text-lg" /> Saved Address
                    </button>
                </div>

                {/* Tab Display Area */}
                <div className="lg:col-span-3">
                    {activeTab === 'orders' && (
                        <div className="border-4 border-[#A4C2DC] rounded-3xl p-6 sm:p-8 bg-white">
                            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-black mb-6">
                                Order History
                            </h2>

                            {orders.length === 0 ? (
                                <p className="text-sm text-gray-500 font-medium">No orders found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div
                                            key={order.id || order._id}
                                            className="border border-gray-200 rounded-2xl p-5 hover:border-[#A4C2DC] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                        >
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-extrabold text-black">{order.id || order._id}</span>
                                                    <span
                                                        className={`text-xs px-3 py-0.5 rounded-full border font-semibold ${getBadgeColor(order.status)}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500">Placed on {order.date || order.createdAt}</p>
                                                <p className="text-xs text-gray-600 mt-1">{order.itemsCount || order.items?.length || 0} Items</p>
                                            </div>

                                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                                                <span className="text-lg font-black text-black">
                                                    {typeof order.total === 'number' ? `$${order.total.toFixed(2)}` : order.total}
                                                </span>
                                                <button className="text-xs font-bold text-black underline hover:text-gray-600 mt-1">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'info' && (
                        <div className="border-4 border-[#A4C2DC] rounded-3xl p-6 sm:p-8 bg-white">
                            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-black mb-6">
                                Personal Information
                            </h2>

                            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-black"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-black text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition mt-4"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'address' && (
                        <div className="border-4 border-[#A4C2DC] rounded-3xl p-6 sm:p-8 bg-white">
                            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-black mb-6">
                                Shipping Address
                            </h2>

                            {user?.address ? (
                                <div className="border border-gray-200 rounded-2xl p-5 max-w-md bg-gray-50">
                                    <p className="font-extrabold text-black mb-1">{user.name}</p>
                                    <p className="text-sm text-gray-600">{user.address}</p>
                                    <p className="text-sm text-gray-600">{user.phone}</p>
                                    <button className="text-xs font-bold text-black underline hover:text-gray-600 mt-4">
                                        Edit Address
                                    </button>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 font-medium">No saved address found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;