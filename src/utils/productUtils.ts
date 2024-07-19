import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addToCard, removeFromCard, updateQuantity } from '../store/slices/cardSlice';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { RootState } from '../store';

export const useProductUtils = (product: Product) => {
    const dispatch = useDispatch();
    const { updateCartItemCount } = useCart();
    const cartItems = useSelector((state: RootState) => state.card.cardItems);
    const cartItem = cartItems.find(item => item.productId === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const updateStorage = async (productId: string, quantity: number) => {
        try {
            const cartJSON = await AsyncStorage.getItem('@cart');
            let cartItems = cartJSON ? JSON.parse(cartJSON) : [];

            if (quantity <= 0) {
                cartItems = cartItems.filter((item: any) => item.productId !== productId);
            } else {
                const existingItem = cartItems.find((item: any) => item.productId === productId);
                if (existingItem) {
                    existingItem.quantity = quantity;
                } else {
                    cartItems.push({ productId, quantity });
                }
            }

            await AsyncStorage.setItem('@cart', JSON.stringify(cartItems));
            updateCartItemCount();
        } catch (error) {
            console.error('Error updating storage:', error);
        }
    };

    const handleAddToCard = () => {
        dispatch(addToCard({
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price.toString(), // Convert to string if needed
            quantity: 1
        }));
        updateStorage(product.id, 1);
    };

    const handleRemoveFromCard = () => {
        dispatch(removeFromCard({ productId: product.id }));
        updateStorage(product.id, 0);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = (currentQuantity || 0) + 1;
        dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
        updateStorage(product.id, newQuantity);
    };

    const handleDecreaseQuantity = () => {
        const newQuantity = (currentQuantity || 0) - 1;
        if (newQuantity <= 0) {
            handleRemoveFromCard();
        } else {
            dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
            updateStorage(product.id, newQuantity);
        }
    };

    return { handleAddToCard, handleRemoveFromCard, handleIncreaseQuantity, handleDecreaseQuantity };
};
