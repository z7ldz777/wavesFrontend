import React, { createContext, useContext, useState, useEffect } from 'react';

// Exported CartContext so direct useContext imports won't fail
export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Load initial state from LocalStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('waves_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [promoCode, setPromoCode] = useState('');
    const [discountPercent, setDiscountPercent] = useState(20);
    const deliveryFee = 15;

    // Sync to LocalStorage on changes
    useEffect(() => {
        localStorage.setItem('waves_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === product.id);
            if (existing) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item
                );
            }
            return [
                ...prevItems,
                {
                    id: product.id,
                    name: product.name_en || product.name,
                    size: product.selectedSize || '42',
                    color: product.selectedColor || 'White',
                    price: product.price,
                    quantity: product.quantity || 1,
                    image: product.main_image || product.image,
                },
            ];
        });
    };

    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discountAmount + (cartItems.length > 0 ? deliveryFee : 0);

    const applyPromo = (code) => {
        if (code.trim().toUpperCase() === 'SAVE20') {
            setDiscountPercent(20);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
                subtotal,
                discountPercent,
                discountAmount,
                deliveryFee,
                total,
                promoCode,
                setPromoCode,
                applyPromo,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};