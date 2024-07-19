import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import ProductImage from '../components/Card/ProductImage';
import { Text } from 'react-native-paper';
import { HStack, ProductActions } from '../components';
import { RootStackParamList } from '../types/NavigationTypes';
import { useFavorite, useProductHook } from '../hooks';

const { width } = Dimensions.get('window');

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const { product } = route.params ?? {};

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const { handleAddToCard, handleRemoveFromCard, handleIncreaseQuantity, currentQuantity } = useProductHook(product);

  const { isFavorite, toggleFavorite } = useFavorite(product);

  const formattedPrice = Number(product.price).toFixed(2);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <ProductImage
          imageUri={product.image}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          iconVisible={true}
        />
      </View>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <HStack style={styles.actionsContainer}>
        <Text style={styles.price}>Price: ${formattedPrice}</Text>
        <ProductActions
          quantity={currentQuantity}
          onAdd={handleAddToCard}
          onRemove={handleRemoveFromCard}
          onIncrease={handleIncreaseQuantity}
        />
      </HStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
  },
  imageContainer: {
    width: width - 30,
    height: 200,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionsContainer: {
    justifyContent: 'space-between',
  },
});

export default ProductDetailScreen;
