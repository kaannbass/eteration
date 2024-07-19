import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addToCard, removeFromCard, updateQuantity } from '../store/slices/cardSlice';
import { useCart } from '../context/CartContext';
import { CartItem, Product } from '../types';
import { RootState } from '../store';

const useProductHook = (product: Product) => {
    const dispatch = useDispatch();
    const { updateCartItemCount } = useCart();
    const cartItems = useSelector((state: RootState) => state.card.cardItems);
    const cartItem = cartItems.find(item => item.productId === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    const updateStorage = async (updatedCartItems: CartItem[]) => {
        try {
            await AsyncStorage.setItem('@cart', JSON.stringify(updatedCartItems));
            updateCartItemCount();
        } catch (error) {
            console.error('Error updating storage:', error);
        }
    };

    const handleAddToCard = (item: CartItem) => {
        const newQuantity = currentQuantity <= 0 ? 1 : currentQuantity + 1;
        const updatedCartItems = cartItems.map(cartItem =>
            cartItem.productId === product.id
                ? { ...cartItem, quantity: newQuantity }
                : cartItem
        );
        if (!updatedCartItems.find(cartItem => cartItem.productId === product.id)) {
            updatedCartItems.push({
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.price.toString(),
                quantity: newQuantity,
            });
        }
        dispatch(addToCard({
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.price.toString(),
            quantity: newQuantity
        }));
        updateStorage(updatedCartItems);
    };

    const handleRemoveFromCard = () => {
        if (currentQuantity > 0) {
            const newQuantity = currentQuantity - 1;
            const updatedCartItems = cartItems
                .map(cartItem =>
                    cartItem.productId === product.id
                        ? { ...cartItem, quantity: newQuantity }
                        : cartItem
                )
                .filter(cartItem => cartItem.quantity > 0);

            dispatch(newQuantity <= 0
                ? removeFromCard({ productId: product.id })
                : updateQuantity({ productId: product.id, quantity: newQuantity }));
            updateStorage(updatedCartItems);
        }
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = (currentQuantity || 0) + 1;
        const updatedCartItems = cartItems.map(cartItem =>
            cartItem.productId === product.id
                ? { ...cartItem, quantity: newQuantity }
                : cartItem
        );

        dispatch(updateQuantity({ productId: product.id, quantity: newQuantity }));
        updateStorage(updatedCartItems);
    };

    return { handleAddToCard, handleRemoveFromCard, handleIncreaseQuantity, currentQuantity };
};

export default useProductHook