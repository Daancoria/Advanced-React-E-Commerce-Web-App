import axios, { AxiosResponse } from "axios"; // Import Axios and its response type
import { Product } from "../types/types"; // Import the Product type for type safety

// Create an Axios instance with a base URL for the Fake Store API
const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com" // Base URL for all API requests
});

// Function to fetch products from the API
export const fetchProducts = (): Promise<AxiosResponse<Product[]>> => 
    apiClient.get<Product[]>("/products"); // Perform a GET request to the "/products" endpoint

