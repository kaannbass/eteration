import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Searchbar, IconButton, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../types';
import { fetchProducts } from '../store/slices/productsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFilteredProducts } from '../hooks';
import { FilterModal, SkeletonLoader, ProductCard } from '../components';
import { FlashList } from '@shopify/flash-list';


interface RenderItemProps {
  item: Product;
}

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedSortOrder, setSelectedSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const numColumns = useMemo(() => (width > 600 ? 3 : 2), [width]);
  const cardWidth = useMemo(() => (width - (numColumns + 1) * 10) / numColumns, [width, numColumns]);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const filteredProducts = useFilteredProducts(products, searchQuery, selectedSortOrder);

  const navigateToProductDetail = useCallback((product: Product) => {
    navigation.navigate('ProductDetail', { product });
  }, [navigation]);

  const renderItem = useCallback(({ item }: RenderItemProps) => (
    <View style={[styles.cardContainer, { width: cardWidth }]}>
      <ProductCard product={item} onPress={() => navigateToProductDetail(item)} />
    </View>
  ), [cardWidth, navigateToProductDetail]);

  if (loading) {
    return <View style={{ backgroundColor: colors.background }}><SkeletonLoader /></View>;
  }

  if (error) return <Text style={{ color: colors.error }}>Error: {error}</Text>;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode='bar'
          style={styles.searchbar}
        />
        <IconButton
          icon={() => <Ionicons name="filter-sharp" size={30} color={colors.onBackground} />}
          onPress={() => setIsModalVisible(true)}
          style={styles.filterButton}
        />
      </View>

      <FlashList<Product>
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        estimatedItemSize={150}
      />

      <FilterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onApply={() => {
          setSelectedSortOrder(sortOrder);
          setIsModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 0,
  },
  searchbar: {
    flex: 1,
    marginRight: 10,
  },
  cardContainer: {
    margin: 5,
  },
});

export default HomeScreen;
