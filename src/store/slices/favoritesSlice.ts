import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteProduct {
  id: string;
  name: string;
  image: string;
  price: string;
}

interface FavoritesState {
  favoriteProducts: FavoriteProduct[];
}

const initialState: FavoritesState = {
  favoriteProducts: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<FavoriteProduct[]>) {
      state.favoriteProducts = action.payload;
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favoriteProducts = state.favoriteProducts.filter(product => product.id !== action.payload);
    },
  },
});

export const { setFavorites, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
