export const useProductHook = jest.fn(() => ({
    handleAddToCard: jest.fn(),
    handleRemoveFromCard: jest.fn(),
    handleIncreaseQuantity: jest.fn(),
    currentQuantity: 1,
  }));
  
  export const useFavorite = jest.fn(() => ({
    isFavorite: false,
    toggleFavorite: jest.fn(),
  }));
  