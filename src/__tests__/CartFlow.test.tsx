import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { login } from '../redux/userSlice';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../types/types';

// Mock Product Data
// Defines a sample product object to be used in the test
const mockProduct: Product = {
  id: '1',
  title: 'Flow Test Product',
  price: 25.0,
  description: 'Test description',
  category: 'Test category',
  rating: { rate: 4.5, count: 99 },
  image: 'https://via.placeholder.com/150',
};

// Test Suite for Cart Integration
describe('Cart Integration', () => {
  // Test Case: Updates NavBar cart count when adding a product
  it('updates NavBar cart count when adding product', async () => {
    // Simulate a logged-in user
    store.dispatch(login({ name: 'TestUser', email: 'test@example.com' }));

    // Render the NavBar and ProductCard components wrapped in Redux Provider and Router
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    // Verify initial cart count is 0
    const cartCount = screen.getByTestId('cart-count');
    expect(cartCount.textContent).toBe('0');

    // Simulate clicking the "Add to Cart" button
    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    // Wait for the cart count to update to 1
    await waitFor(() => {
      expect(cartCount.textContent).toBe('1');
    });
  });
});
