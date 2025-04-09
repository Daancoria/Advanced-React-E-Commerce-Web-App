import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';
import "../components/ProductCard.css";
import "../pages/Home.css";

const fetchCategories = async () => {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  return res.json();
};

const fetchProducts = async (category: string) => {
  const url = category === 'all'
    ? 'https://fakestoreapi.com/products'
    : `https://fakestoreapi.com/products/category/${category}`;
  const res = await fetch(url);
  return res.json();
};

const Home: React.FC = () => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category)
  });

  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-listing">
      <h2>Browse Products</h2>

      {categoriesLoading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="filter-controls">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={`category-select ${category !== 'all' ? 'filter-active' : ''}`}
          >
            <option value="all">All</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat}
                </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="🔍 Search products..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

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
      )}
      {productsLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
