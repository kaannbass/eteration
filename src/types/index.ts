export interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    description: string;
    model: string;
    brand: string;
}
export interface CartItem {
    productId: string;
    image?: string;
    name?: string;
    price?: string;
    quantity: number;
  }
export interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};


