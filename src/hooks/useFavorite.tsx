import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: string;
}

const FAVORITES_KEY = '@favorites';

const useFavorite = (product: Product) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoriteState = async () => {
      try {
        const favoriteState = await AsyncStorage.getItem(`@favorite_${product.id}`);
        if (favoriteState !== null) {
          setIsFavorite(JSON.parse(favoriteState));
        }
      } catch (error) {
        console.error('Error fetching favorite state:', error);
      }
    };

    fetchFavoriteState();
  }, [product.id]);

  const toggleFavorite = useCallback(async () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    try {
      const favoritesJSON = await AsyncStorage.getItem(FAVORITES_KEY);
      let favorites = favoritesJSON ? JSON.parse(favoritesJSON) : [];

      if (newFavoriteState) {
        favorites.push(product);
      } else {
        favorites = favorites.filter((item: any) => item.id !== product.id);
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      await AsyncStorage.setItem(`@favorite_${product.id}`, JSON.stringify(newFavoriteState));
    } catch (error) {
      console.error(`Error saving favorite state for ${product.id}:`, error);
    }
  }, [isFavorite, product]);

  return {
    isFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
