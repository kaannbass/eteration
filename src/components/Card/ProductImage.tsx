import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

interface ProductImageProps {
  imageUri: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  iconVisible: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageUri,
  isFavorite,
  onToggleFavorite,
  iconVisible,
}) => (
  <View style={styles.imageContainer}>
    <FastImage
      style={styles.image}
      source={{
        uri: imageUri,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
      testID="product-image"
    />
    {iconVisible && (
      <IconButton
        icon={isFavorite ? 'heart' : 'heart-outline'}
        iconColor={isFavorite ? '#e91e63' : '#ffffff'}
        size={30}
        onPress={onToggleFavorite}
        style={styles.favoriteIcon}
        testID="favorite-icon"
      />
    )}
  </View>
);

export default ProductImage;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
