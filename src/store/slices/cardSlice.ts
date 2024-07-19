import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface CardItem {
  productId: string;
  name?: string;
  image?: string;
  price?: string;
  quantity: number;
}

interface CardState {
  cardItems: CardItem[];
}

const initialState: CardState = {
  cardItems: [],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CardItem[]>) => {
      state.cardItems = action.payload;
    },
    addToCard: (state, action: PayloadAction<CardItem>) => {
      const { productId, quantity, name, image, price } = action.payload;
      const existingItem = state.cardItems.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cardItems.push({ productId, name, image, price, quantity });
      }
    },
    removeFromCard: (state, action: PayloadAction<{ productId: string }>) => {
      const { productId } = action.payload;
      state.cardItems = state.cardItems.filter(item => item.productId !== productId);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cardItems.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
        if (existingItem.quantity <= 0) {
          state.cardItems = state.cardItems.filter(item => item.productId !== productId);
        }
      }
    },
  },
});

export const { setCartItems, addToCard, removeFromCard, updateQuantity } = cardSlice.actions;
export default cardSlice.reducer;

export const selectCardItems = (state: RootState) => state.card.cardItems;
