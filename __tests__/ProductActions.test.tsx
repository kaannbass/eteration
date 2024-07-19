import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductActions } from '../src/components';

describe('ProductActions Component', () => {
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnIncrease = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render "Add To Card" button when quantity is 0', () => {
    const { getByText } = render(
      <ProductActions 
        quantity={0}
        onAdd={mockOnAdd}
        onRemove={mockOnRemove}
        onIncrease={mockOnIncrease}
        testID="product-actions"
      />
    );

    expect(getByText('Add To Card')).toBeTruthy();
  });

  it('should render quantity controls when quantity is greater than 0', () => {
    const { getByText, getByRole } = render(
      <ProductActions 
        quantity={1}
        onAdd={mockOnAdd}
        onRemove={mockOnRemove}
        onIncrease={mockOnIncrease}
        testID="product-actions"
      />
    );

    expect(getByText('1')).toBeTruthy();
    expect(getByRole('button', { name: '-' })).toBeTruthy();
    expect(getByRole('button', { name: '+' })).toBeTruthy();
  });

  it('should call onAdd when "Add To Card" button is pressed', () => {
    const { getByText } = render(
      <ProductActions 
        quantity={0}
        onAdd={mockOnAdd}
        onRemove={mockOnRemove}
        onIncrease={mockOnIncrease}
        testID="product-actions"
      />
    );

    fireEvent.press(getByText('Add To Card'));
    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  it('should call onRemove when "-" button is pressed', () => {
    const { getByRole } = render(
      <ProductActions 
        quantity={1}
        onAdd={mockOnAdd}
        onRemove={mockOnRemove}
        onIncrease={mockOnIncrease}
        testID="product-actions"
      />
    );

    fireEvent.press(getByRole('button', { name: '-' }));
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it('should call onIncrease when "+" button is pressed', () => {
    const { getByRole } = render(
      <ProductActions 
        quantity={1}
        onAdd={mockOnAdd}
        onRemove={mockOnRemove}
        onIncrease={mockOnIncrease}
        testID="product-actions"
      />
    );

    fireEvent.press(getByRole('button', { name: '+' }));
    expect(mockOnIncrease).toHaveBeenCalledTimes(1);
  });
});
