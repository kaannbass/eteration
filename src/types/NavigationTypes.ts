import { Product } from ".";

export type RootStackParamList = {
    HomeScreen: undefined;
    AccountScreen:undefined;
    ProductDetail: { product: Product };
};

export type TabParamList = {
    Home: undefined;
    ProductBuy: undefined;
    ProductFavorite: undefined;
    AccountScreen: undefined;
};