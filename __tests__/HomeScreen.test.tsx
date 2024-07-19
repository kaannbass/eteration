import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/store'; 
import HomeScreen from '../src/screens/HomeScreen'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { CartProvider } from '../src/context/CartContext'; 

describe('HomeScreen', () => {
  it('renders error message when there is an error', async () => {
    // Mock the API call to simulate an error
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Failed to fetch'))
    );

    render(
      <Provider store={store}>
        <NavigationContainer>
          <CartProvider>
            <HomeScreen />
          </CartProvider>
        </NavigationContainer>
      </Provider>
    );

    // Wait for and check for the error message
    expect(await screen.findByText(/Error: Failed to fetch/i)).toBeTruthy();

    // Clean up mocks
    (global.fetch as jest.Mock).mockRestore();
  });

  it('displays products correctly', async () => {
    // Mock the API call
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({
        products: [
          { id: 1, name: 'Product 1', image: 'image1.png', price: 100 },
          { id: 2, name: 'Product 2', image: 'image2.png', price: 200 },
        ],
      }),
    });

    // Render the component with CartProvider, NavigationContainer, and Redux Provider
    render(
      <Provider store={store}>
        <NavigationContainer>
          <CartProvider>
            <HomeScreen />
          </CartProvider>
        </NavigationContainer>
      </Provider>
    );

    // Wait for and check for the products
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeTruthy();
      expect(screen.getByText('Product 2')).toBeTruthy();
    });

    // Clean up mocks
    (global.fetch as jest.Mock).mockRestore();
  });
});
