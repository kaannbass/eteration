import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { useRoute } from '@react-navigation/native';
import { useProductHook, useFavorite } from '../hooks';
import { RootStackParamList } from '../types/NavigationTypes';

// Mocking hooks
jest.mock('../hooks', () => ({
  useProductHook: jest.fn(),
  useFavorite: jest.fn(),
}));

// Mocking useRoute
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

const productMock = {
  id: '1',
  name: 'Product Name',
  description: 'Product Description',
  price: '29.99',
  image: 'https://example.com/image.jpg',
};

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: { product: productMock },
    });

    (useProductHook as jest.Mock).mockReturnValue({
      handleAddToCard: jest.fn(),
      handleRemoveFromCard: jest.fn(),
      handleIncreaseQuantity: jest.fn(),
      currentQuantity: 1,
    });

    (useFavorite as jest.Mock).mockReturnValue({
      isFavorite: false,
      toggleFavorite: jest.fn(),
    });
  });

  it('renders the product details correctly', () => {
    render(
      <MockedProvider>
        <ProductDetailScreen />
      </MockedProvider>
    );

    expect(screen.getByText('Product Name')).toBeTruthy();
    expect(screen.getByText('Product Description')).toBeTruthy();
    expect(screen.getByText('Price: $29.99')).toBeTruthy();
  });

  it('handles add to cart action', () => {
    const { handleAddToCard } = useProductHook() as jest.Mocked<any>;
    render(
      <MockedProvider>
        <ProductDetailScreen />
      </MockedProvider>
    );

    fireEvent.press(screen.getByText('Add to Cart'));
    expect(handleAddToCard).toHaveBeenCalled();
  });

  it('handles remove from cart action', () => {
    const { handleRemoveFromCard } = useProductHook() as jest.Mocked<any>;
    render(
      <MockedProvider>
        <ProductDetailScreen />
      </MockedProvider>
    );

    fireEvent.press(screen.getByText('Remove from Cart'));
    expect(handleRemoveFromCard).toHaveBeenCalled();
  });

  it('handles increase quantity action', () => {
    const { handleIncreaseQuantity } = useProductHook() as jest.Mocked<any>;
    render(
      <MockedProvider>
        <ProductDetailScreen />
      </MockedProvider>
    );

    fireEvent.press(screen.getByText('Increase Quantity'));
    expect(handleIncreaseQuantity).toHaveBeenCalled();
  });

  it('toggles favorite status', () => {
    const { toggleFavorite } = useFavorite() as jest.Mocked<any>;
    render(
      <MockedProvider>
        <ProductDetailScreen />
      </MockedProvider>
    );

    fireEvent.press(screen.getByText('Favorite'));
    expect(toggleFavorite).toHaveBeenCalled();
  });
});
