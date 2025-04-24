// src/context/ProductContext.tsx
import React from 'react';
import { ReactNode, useReducer } from 'react';
import { Product } from '../types/types';
import { ProductContext } from './ProductContext';
import { ProductContextType } from '../types/types';

type ProductAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string };

interface ProductState {
  products: Product[];
  selectedCategory: string;
}

const initialState: ProductState = {
  products: [],
  selectedCategory: '',
};

const productReducer = (
    state: ProductState,
    action: ProductAction 
  ): ProductState => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return { ...state, products: action.payload };
      case 'SET_SELECTED_CATEGORY':
        return { ...state, selectedCategory: action.payload };
      default: {
        const _exhaustiveCheck: never = action;
        throw new Error(`Unhandled action type: ${JSON.stringify(_exhaustiveCheck)}`);
      }
    }
};
interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const value: ProductContextType = { ...state, dispatch };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
export default { ProductContext };

