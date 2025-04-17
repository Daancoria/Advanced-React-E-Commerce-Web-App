import { createContext, useContext, ReactNode, useReducer } from "react";
import { Product } from "../types/types";


//Actions are instructions to change states
type ProductAction = 
    {type: 'SET_PRODUCTS', payload: Product[]} | 
    {type: 'SET_SELECTED_CATEGORY', payload: string }; 

    //Define shape of state
interface ProductState {
    products: Product[];
    selectedCategory: string;
}

const initialState: ProductState = {
    products: [],
    selectedCategory: '',
};

//Reducer Function listens for action and changes the state based on the action type
const productReducer = (
    state: ProductState, 
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_SELECTED_CATEGORY':
            return { ...state, selectedCategory: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

//Create Context
interface ProductContextType extends ProductState {    
    //dispatch is a function that allows us to trigger the action such as
    //SET_PRODUCTS or SET_SELECTED_CATEGORY to update the state
    dispatch: React.Dispatch<ProductAction>; 
}

const ProductContext = createContext<ProductContextType | undefined>
(undefined);

interface ProductProviderProps {
    children: ReactNode;
}
//Provider component to wrap around the app and provide state to all components

export const ProductProvider: React.FC<ProductProviderProps> = ({ 
    children, 
}) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProductContext = () : ProductContextType => {
    //useContext is a hook that allows us to access the context value
    const context = useContext(ProductContext);
    if (context == undefined) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
};
