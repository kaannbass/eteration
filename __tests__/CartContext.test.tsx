// __tests__/CartContext.test.tsx
import React from 'react';
import { render, act, screen, fireEvent } from '@testing-library/react-native';
import { CartProvider, useCart } from '../src/context/CartContext'; 
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

// Custom hook test helper
const TestComponent: React.FC = () => {
    const { cartItemCount, updateCartItemCount, handleAddToCart } = useCart();

    return (
        <React.Fragment>
            <Text>Cart Item Count: {cartItemCount}</Text>
            <Button onPress={updateCartItemCount} testID="update-button">
                Update Cart
            </Button>
            <Button onPress={() => handleAddToCart({ id: '1', name: 'Test Product' })} testID="add-button">
                Add To Cart
            </Button>
        </React.Fragment>
    );
};

describe('CartContext', () => {
    it('should provide cart item count and context functions', async () => {
        // Render TestComponent within CartProvider
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        // Check initial cart item count
        expect(screen.getByText('Cart Item Count: 0')).toBeTruthy();

        // Trigger add to cart action
        await act(async () => {
            fireEvent.press(screen.getByTestId('add-button'));
        });

        // Wait for state update
        await act(async () => {
            // Allow time for the async state update to occur
        });

        // After adding item, cart item count should be 1
        expect(screen.getByText('Cart Item Count: 1')).toBeTruthy();
        
        // Trigger update cart item count action
        await act(async () => {
            fireEvent.press(screen.getByTestId('update-button'));
        });

        // Verify update cart item count functionality if needed
    });
});
