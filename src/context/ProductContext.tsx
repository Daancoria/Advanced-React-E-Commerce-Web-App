import { createContext, useContext, ReactNode, useReducer } from "react";
import { Product } from "../types/types";

// Define allowed actions for the product context
type ProductAction = 
  { type: 'SET_PRODUCTS'; payload: Product[] } |
  { type: 'SET_SELECTED_CATEGORY'; payload: string };

// Define the shape of the state
interface ProductState {
  products: Product[];
  selectedCategory: string;
}

// Initial state
const initialState: ProductState = {
  products: [],
  selectedCategory: '',
};

// Reducer function
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
      // Exhaustiveness check for future action types
      const _exhaustiveCheck: never = action;
      throw new Error(`Unhandled action type: ${JSON.stringify(_exhaustiveCheck)}`);
    }
  }
};

// Define the context shape
interface ProductContextType extends ProductState {
  dispatch: React.Dispatch<ProductAction>;
}

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider props type
interface ProductProviderProps {
  children: ReactNode;
}
// Context Provider component
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const value: ProductContextType = { ...state, dispatch };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to access product context
export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
