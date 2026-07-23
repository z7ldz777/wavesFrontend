import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { useCart } from '../context/CartContext';
import EmptyStateComponent from '../components/EmptyStateComponent';
import { FaTrashAlt, FaTag, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate to checkout
    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        subtotal,
        discountPercent,
        discountAmount,
        deliveryFee,
        total,
        promoCode,
        setPromoCode,
        applyPromo,
    } = useCart();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 font-sans text-gray-900">
            <nav className="text-xs text-gray-500 mb-6"><span>Cart</span></nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-8">Your cart</h1>

            {cartItems.length === 0 ? (
                <EmptyStateComponent message="Your cart is currently empty." />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Cart Items List */}
                    <div className="lg:col-span-7 border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white space-y-6">
                        {cartItems.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <div className="flex gap-4 items-center">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F0F0F0] rounded-2xl p-2 flex-shrink-0 flex items-center justify-center">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between self-stretch py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-base sm:text-lg text-black leading-tight">{item.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">Size: <span className="text-gray-700">{item.size}</span></p>
                                                <p className="text-xs text-gray-500">Color: <span className="text-gray-700">{item.color}</span></p>
                                            </div>

                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1">
                                                <FaTrashAlt className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-end mt-2">
                                            <span className="text-xl font-bold text-black">${item.price}</span>

                                            <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-1.5 w-24">
                                                <button onClick={() => decreaseQuantity(item.id)} className="text-gray-600 hover:text-black">
                                                    <FaMinus className="w-2.5 h-2.5" />
                                                </button>
                                                <span className="font-bold text-xs">{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id)} className="text-gray-600 hover:text-black">
                                                    <FaPlus className="w-2.5 h-2.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {index < cartItems.length - 1 && <hr className="border-gray-100 my-4" />}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-5 border border-gray-200 rounded-2xl p-6 bg-white space-y-5">
                        <h2 className="text-xl font-bold text-black">Order Summary</h2>

                        <div className="space-y-3 text-sm border-b border-gray-100 pb-5">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-bold text-black">${subtotal}</span>
                            </div>

                            {discountAmount > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Discount (-{discountPercent}%)</span>
                                    <span className="font-bold text-red-500">-${discountAmount}</span>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery Fee</span>
                                <span className="font-bold text-black">${deliveryFee}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-lg font-bold text-black">
                            <span>Total</span>
                            <span className="text-xl">${total}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <div className="relative flex-1">
                                <FaTag className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Add promo code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="w-full bg-gray-100 text-xs text-black rounded-full pl-10 pr-4 py-3 focus:outline-none"
                                />
                            </div>
                            <button
                                onClick={() => applyPromo(promoCode)}
                                className="bg-black text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-gray-800"
                            >
                                Apply
                            </button>
                        </div>

                        {/* ========================================================= */}
                        {/* UPDATED: Go to Checkout button now redirects to /checkout */}
                        {/* ========================================================= */}
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-black text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 text-sm mt-4 cursor-pointer"
                        >
                            <span>Go to Checkout</span>
                            <FaArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Cart;