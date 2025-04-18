import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Product } from '../types/types';

// Mock Product Data
// Defines a sample product object to be used in the tests
const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  price: 19.99,
  description: 'A test product description',
  category: 'test-category',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 4.5, count: 120 }
};

// Test Suite for ProductCard Component
describe('ProductCard', () => {
  // Test Case: Renders product details correctly
  it('renders product details correctly', () => {
    // Render the ProductCard component wrapped in Redux Provider
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    // Assertions to verify product details are displayed
    expect(screen.getByRole('heading', { name: /Test Product/i })).toBeInTheDocument(); // Product title
    expect(screen.getByText(/\$19.99/)).toBeInTheDocument(); // Product price
    expect(screen.getByAltText(/Test Product/)).toBeInTheDocument(); // Product image
  });

  // Test Case: Adds product to cart on button click
  it('adds product to cart on button click', () => {
    // Render the ProductCard component wrapped in Redux Provider
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    // Simulate clicking the "Add to Cart" button
    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    // Verify that the button text changes to "Added"
    const allButtons = screen.getAllByRole('button');
    const addedButton = allButtons.find(btn =>
      btn.textContent?.includes('Added')
    );

    expect(addedButton).toBeInTheDocument(); // Ensure the "Added" button is displayed
  });
});
