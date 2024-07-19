import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../src/components';
import { Product } from '../src/types';

const mockToggleFavorite = jest.fn();

jest.mock('../src/hooks', () => ({
    useProductHook: jest.fn(() => ({
        handleAddToCard: jest.fn(),
        handleRemoveFromCard: jest.fn(),
        handleIncreaseQuantity: jest.fn(),
        currentQuantity: 1,
    })),
    useFavorite: jest.fn(() => ({
        isFavorite: false,
        toggleFavorite: mockToggleFavorite,
    })),
}));

// Sample product data
const mockProduct: Product = {
    id: '1',
    name: 'Sample Product',
    price: '19.99',
    image: 'http://example.com/image.jpg',
};

describe('ProductCard Component', () => {
    it('should render product details correctly', () => {
        const { getByText, getByTestId } = render(
            <ProductCard product={mockProduct} />
        );

        expect(getByText('Sample Product')).toBeTruthy();
        expect(getByText('$19.99')).toBeTruthy();
        expect(getByTestId('product-image')).toBeTruthy();
    });

    it('should call onPress when the card is pressed', () => {
        const mockOnPress = jest.fn();
        const { getByTestId } = render(
            <ProductCard product={mockProduct} onPress={mockOnPress} />
        );

        fireEvent.press(getByTestId('product-card'));
        expect(mockOnPress).toHaveBeenCalled();
    });

    it('should call toggleFavorite when the favorite icon is pressed', () => {
        const { getByTestId } = render(
            <ProductCard product={mockProduct} iconVisible={true} />
        );

        fireEvent.press(getByTestId('favorite-icon'));
        expect(mockToggleFavorite).toHaveBeenCalled();
    });

    it('should render the product image with correct uri', () => {
        const { getByTestId } = render(
            <ProductCard product={mockProduct} />
        );

        const productImage = getByTestId('product-image');
        expect(productImage.props.source).toEqual({
            uri: mockProduct.image,
            priority: 'high',
        });
    });
});
