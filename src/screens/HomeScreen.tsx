import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, useWindowDimensions, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { RadioButton, Searchbar, Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/Card/ProductCard';
import { Product } from '../types';
import { fetchProducts } from '../store/slices/productsSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFilteredProducts } from '../hooks';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [selectedSortOrder, setSelectedSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const numColumns = useMemo(() => (width > 600 ? 3 : 2), [width]);
  const cardWidth = useMemo(() => (width - (numColumns + 1) * 10) / numColumns, [width, numColumns]);

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const filteredProducts = useFilteredProducts(products, searchQuery, selectedSortOrder);

  const navigateToProductDetail = useCallback((product: Product) => navigation.navigate('ProductDetail', { product }), [navigation]);

  const renderItem = useCallback(({ item }: { item: Product }) => (
    <View style={[styles.cardContainer, { width: cardWidth }]}>
      <ProductCard product={item} onPress={() => navigateToProductDetail(item)} />
    </View>
  ), [cardWidth, navigateToProductDetail]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode='bar'
          style={styles.searchbar}
        />
        <IconButton
          icon={() => <Ionicons name="filter-sharp" size={30} color="black" />}
          onPress={() => setModalVisible(true)}
          style={styles.filterButton}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={numColumns}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />

      {/* Modal for Filter */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort by Price</Text>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButtonItem}>
                <RadioButton
                  value="asc"
                  status={sortOrder === 'asc' ? 'checked' : 'unchecked'}
                  onPress={() => setSortOrder('asc')}
                />
                <Text>Price Low to High</Text>
              </View>
              <View style={styles.radioButtonItem}>
                <RadioButton
                  value="desc"
                  status={sortOrder === 'desc' ? 'checked' : 'unchecked'}
                  onPress={() => setSortOrder('desc')}
                />
                <Text>Price High to Low</Text>
              </View>
            </View>
            <Button
              mode="contained"
              onPress={() => {
                setSelectedSortOrder(sortOrder);
                setModalVisible(false);
              }}
              style={styles.applyButton}
            >
              Apply
            </Button>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButtonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  applyButton: {
    marginTop: 10,
  },
});

export default HomeScreen;
