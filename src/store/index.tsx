import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cardSlice from './slices/cardSlice';
import favoritesSlice from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    card: cardSlice,
    favorites: favoritesSlice, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
