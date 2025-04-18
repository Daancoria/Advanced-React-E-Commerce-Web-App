import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Product } from '../types/types';

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  price: 19.99,
  description: 'A test product description',
  category: 'test-category',
  image: 'https://via.placeholder.com/150',
  rating: { rate: 4.5, count: 120 }
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByRole('heading', { name: /Test Product/i })).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Product/)).toBeInTheDocument();
  });

  it('adds product to cart on button click', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const addButton = screen.getByText(/Add to Cart/i);
    fireEvent.click(addButton);

    // Find all buttons and verify one contains "Added"
    const allButtons = screen.getAllByRole('button');
    const addedButton = allButtons.find(btn =>
      btn.textContent?.includes('Added')
    );

    expect(addedButton).toBeInTheDocument();
  });
});
