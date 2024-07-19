import React from 'react';
import { render } from '@testing-library/react-native';
import ProductImage from '../src/components/Card/ProductImage';

describe('ProductImage Component', () => {
  const mockOnToggleFavorite = jest.fn();

  it('should match snapshot when isFavorite is true', () => {
    const { toJSON } = render(
      <ProductImage 
        imageUri="http://example.com/image.jpg"
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
        iconVisible={true}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should match snapshot when isFavorite is false', () => {
    const { toJSON } = render(
      <ProductImage 
        imageUri="http://example.com/image.jpg"
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
        iconVisible={true}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
