import { useContext } from 'react';
import { ProductContext } from './ProductContext';
import { ProductContextType } from '../types/types';

// Custom hook to access the ProductContext
// Ensures the hook is used within a ProductProvider
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);

  // Throw an error if the hook is used outside of the ProductProvider
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }

  return context;
};
