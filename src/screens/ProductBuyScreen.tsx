import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Alert, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../store';
import { setCartItems, addToCard, updateQuantity, removeFromCard } from '../store/slices/cardSlice';
import { HStack, ProductActions, VStack } from '../components';
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, useTheme, Button } from 'react-native-paper';

const ProductBuyScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const cartItems = useSelector((state: RootState) => state.card.cardItems);
  const { updateCartItemCount } = useCart();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useFocusEffect(
    useCallback(() => {
      const fetchCartItems = async () => {
        try {
          const cartJSON = await AsyncStorage.getItem('@cart');
          const fetchedCartItems = cartJSON ? JSON.parse(cartJSON) : [];
          dispatch(setCartItems(fetchedCartItems));
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };

      fetchCartItems();
    }, [dispatch])
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isModalVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleRedirect();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isModalVisible, countdown]);

  const handleRedirect = async () => {
    try {
      await AsyncStorage.removeItem('@cart');
      updateCartItemCount();
      navigation.navigate('HomeScreen');
      setModalVisible(false);
      setCountdown(5);
    } catch (error) {
      console.error('Error clearing cart storage:', error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.price ? parseFloat(item.price) : 0;
    return total + itemPrice * item.quantity;
  }, 0);

  const updateStorage = useCallback(async (updatedCart: CartItem[]) => {
    try {
      await AsyncStorage.setItem('@cart', JSON.stringify(updatedCart));
      updateCartItemCount();
    } catch (error) {
      console.error('Error updating storage:', error);
    }
  }, [updateCartItemCount]);

  const handleAddToCard = useCallback((product: CartItem) => {
    const newQuantity = product.quantity + 1;
    const updatedCart = cartItems.map((item) =>
      item.productId === product.productId ? { ...item, quantity: newQuantity } : item
    );
    if (!cartItems.find(item => item.productId === product.productId)) {
      updatedCart.push({ ...product, quantity: newQuantity });
    }
    dispatch(addToCard({ productId: product.productId, quantity: newQuantity }));
    updateStorage(updatedCart);
  }, [dispatch, cartItems]);

  const handleRemoveFromCard = useCallback((product: CartItem) => {
    const newQuantity = product.quantity - 1;
    const updatedCart = cartItems
      .map((item) =>
        item.productId === product.productId ? { ...item, quantity: newQuantity } : item
      )
      .filter(item => item.quantity > 0);

    if (newQuantity > 0) {
      dispatch(updateQuantity({ productId: product.productId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCard({ productId: product.productId }));
    }
    updateStorage(updatedCart);
  }, [dispatch, cartItems]);

  const handleIncreaseQuantity = useCallback((product: CartItem) => {
    const newQuantity = product.quantity + 1;
    const updatedCart = cartItems.map((item) =>
      item.productId === product.productId ? { ...item, quantity: newQuantity } : item
    );
    dispatch(updateQuantity({ productId: product.productId, quantity: newQuantity }));
    updateStorage(updatedCart);
  }, [dispatch, cartItems]);

  const handleComplete = () => {
    if (!isLoggedIn) {
      Alert.alert("Login Required", "Please log in to complete the purchase.");
    } else {
      setModalVisible(true);
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={[styles.itemContainer, { backgroundColor: colors.background }]}>
        <HStack>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          <VStack style={{ justifyContent: 'center', alignContent: 'center', marginHorizontal: 5, gap: 5 }}>
            <View>
              <Text variant="bodyMedium"> Name: {item.name}</Text>
              <Text variant="bodyLarge" style={{ marginLeft: 4 }}>
                Price: <Text variant="bodyLarge" style={{ color: colors.primary, fontWeight: 'bold' }}> ${item.price}</Text>
              </Text>
            </View>
            <ProductActions
              quantity={item.quantity}
              onAdd={() => handleAddToCard(item)}
              onRemove={() => handleRemoveFromCard(item)}
              onIncrease={() => handleIncreaseQuantity(item)}
            />
          </VStack>
        </HStack>
      </View>
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={styles.title}>Your Cart is Empty</Text>
        <Text>Please add items to your cart before proceeding.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Cart Items</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId ?? item.name ?? Math.random().toString()}
        renderItem={renderItem}
      />

      <HStack style={{ justifyContent: 'space-between' }}>
        <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>
        <Button
          onPress={handleComplete}
          mode="contained"
        >Complete</Button>
      </HStack>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setCountdown(5);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>Your purchase was completed successfully! Please wait {countdown} seconds.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 0,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProductBuyScreen;
