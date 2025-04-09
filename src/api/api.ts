import axios, {AxiosResponse} from "axios";
import { Product } from "../types/types";

const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com"
})

export const fetchProducts = (): Promise<AxiosResponse<Product[]>> => 
apiClient.get<Product[]>("/products")

