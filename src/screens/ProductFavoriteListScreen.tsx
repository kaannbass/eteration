import { View, FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCard from '../components/Card/ProductCard';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

const FAVORITES_KEY = '@favorites';

const ProductFavoriteListScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const loadFavorites = useCallback(async () => {
    try {
      const favoritesJSON = await AsyncStorage.getItem(FAVORITES_KEY);
      if (favoritesJSON) {
        const parsedFavorites = JSON.parse(favoritesJSON);
        const validFavorites = parsedFavorites.filter((item: any) => item.id);
        setFavorites(validFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  const removeFavorite = async (productId: string) => {
    const updatedFavorites = favorites.filter(item => item.id !== productId);
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cardContainer}>
      <CustomCard product={item} onPress={() => removeFavorite(item.id)} iconVisible={false} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Products</Text>
      {favorites.length === 0 ? (
        <Text>No favorite products found.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id ? item.id.toString() : 'unknown'}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    marginBottom: 10,
  },
});

export default ProductFavoriteListScreen;
