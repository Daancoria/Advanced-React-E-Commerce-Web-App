import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { login } from '../redux/userSlice';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../types/types';

const mockProduct: Product = {
  id: '1',
  title: 'Flow Test Product',
  price: 25.0,
  description: 'Test description',
  category: 'Test category',
  rating: { rate: 4.5, count: 99 },
  image: 'https://via.placeholder.com/150',
};

describe('Cart Integration', () => {
  it('updates NavBar cart count when adding product', async () => {
    // Simulate a logged-in user
    store.dispatch(login({ name: 'TestUser', email: 'test@example.com' }));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    const cartCount = screen.getByTestId('cart-count');
    expect(cartCount.textContent).toBe('0');

    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(cartCount.textContent).toBe('1');
    });
  });
});
