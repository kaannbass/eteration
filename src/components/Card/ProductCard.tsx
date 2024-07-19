import React, { memo, useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card as PaperCard, Text } from 'react-native-paper';
import { useFavorite, useProductHook } from '../../hooks';
import ProductImage from './ProductImage';
import ProductActions from './ProductActions';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  iconVisible?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, onPress = () => {}, iconVisible = true }) => {
  const { handleAddToCard, handleRemoveFromCard, handleIncreaseQuantity, currentQuantity } = useProductHook(product);
  const { isFavorite, toggleFavorite } = useFavorite(product);

  // Memoization of formatted price
  const formattedPrice = useMemo(() => Number(product.price).toFixed(2), [product.price]);

  return (
    <PaperCard style={styles.card} onPress={onPress} testID="product-card">
      <View style={styles.container}>
        <ProductImage
          imageUri={product.image}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          iconVisible={iconVisible}
          testID="product-image"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.price}>${formattedPrice}</Text>
        </View>
        <ProductActions
          quantity={currentQuantity}
          onAdd={handleAddToCard}
          onRemove={handleRemoveFromCard}
          onIncrease={handleIncreaseQuantity}
          testID="product-actions"
        />
      </View>
    </PaperCard>
  );
});

const styles = StyleSheet.create({
  card: {
    margin: 10,
    height: 350,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductCard;
