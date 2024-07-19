import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartContextProps {
    cartItemCount: number;
    updateCartItemCount: () => void;
    handleAddToCart: (product: any) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItemCount, setCartItemCount] = useState<number>(0);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            try {
                const cartJSON = await AsyncStorage.getItem('@cart');
                const cart = cartJSON ? JSON.parse(cartJSON) : [];
                setCartItemCount(cart.length);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItemCount();
    }, []);

    const updateCartItemCount = async () => {
        try {
            const cartJSON = await AsyncStorage.getItem('@cart');
            const cart = cartJSON ? JSON.parse(cartJSON) : [];
            setCartItemCount(cart.length);
        } catch (error) {
            console.error('Error updating cart items:', error);
        }
    };

    const handleAddToCart = async (product: any) => {
        try {
            const cartJSON = await AsyncStorage.getItem('@cart');
            const cart = cartJSON ? JSON.parse(cartJSON) : [];
            cart.push(product);
            await AsyncStorage.setItem('@cart', JSON.stringify(cart));
            updateCartItemCount();
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const value = useMemo(() => ({ cartItemCount, updateCartItemCount, handleAddToCart }), [cartItemCount, updateCartItemCount]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
