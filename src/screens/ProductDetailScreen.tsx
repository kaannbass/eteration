import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import ProductImage from '../components/Card/ProductImage';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { HStack, ProductActions } from '../components';
import { RootStackParamList } from '../types/NavigationTypes';
import { useFavorite, useProductHook } from '../hooks';

const { width } = Dimensions.get('window');

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();
  const { product } = route.params ?? {};
  const navigation = useNavigation();
  const { colors } = useTheme();

  if (!product) {
    return <Text style={{ color: colors.error }}>Product not found</Text>;
  }

  const { handleAddToCard, handleRemoveFromCard, handleIncreaseQuantity, currentQuantity } = useProductHook(product);
  const { isFavorite, toggleFavorite } = useFavorite(product);

  const formattedPrice = Number(product.price).toFixed(2);

  return (<>
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction onPress={() => { navigation.goBack() }} />
      <Appbar.Content title="Product Detail" />
    </Appbar.Header>
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.imageContainer}>
        <ProductImage
          imageUri={product.image}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          iconVisible={true}
        />
      </View>
      <Text style={[styles.title, { color: colors.surface }]}>{product.name}</Text>
      <Text style={[styles.description, { color: colors.surface }]}>{product.description}</Text>
      <HStack style={styles.actionsContainer}>
        <Text style={[styles.price, { color: colors.primary }]}>Price: ${formattedPrice}</Text>
        <ProductActions
          quantity={currentQuantity}
          onAdd={handleAddToCard}
          onRemove={handleRemoveFromCard}
          onIncrease={handleIncreaseQuantity}
        />
      </HStack>
    </ScrollView>
  </>
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
