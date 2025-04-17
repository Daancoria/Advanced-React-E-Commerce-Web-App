import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../components/ProductCard.css';
import '../pages/Home.css';

// Function to fetch products from Firestore
// Retrieves all products from the "products" collection in Firestore
const fetchProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Product, "id">;
    return { id: doc.id, ...data };
  });
};

const Home: React.FC = () => {
  // State for managing the selected category and search input
  const [category, setCategory] = useState('all'); // Default category is "all"
  const [search, setSearch] = useState(''); // Search input state

  // Fetch products using React Query
  // Caches the product data and handles loading state
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Derive unique categories from the fetched products
  // Creates a list of categories for the dropdown filter
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(unique)];
  }, [products]);

  // Filter products based on the selected category and search input
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="product-listing">
      {/* Page Header */}
      <h2>Browse Products</h2>

      {/* Filter Controls */}
      {/* Dropdown for category selection and search input */}
      <div className="filter-controls">
        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`category-select ${category !== 'all' ? 'filter-active' : ''}`}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Clear Filters Button */}
        {/* Visible only when a filter is active */}
        {(category !== 'all' || search) && (
          <button
            onClick={() => {
              setCategory('all');
              setSearch('');
            }}
            className="clear-filters-button"
          >
            ❌ Clear Filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {/* Displays a loading message or the filtered products */}
      {productsLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
