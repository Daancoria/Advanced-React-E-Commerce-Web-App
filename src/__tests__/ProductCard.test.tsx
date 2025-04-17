import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const { getByRole, getByText, getByAltText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(getByRole('heading', { name: /Test Product/i })).toBeInTheDocument();
    expect(getByText(/\$19.99/)).toBeInTheDocument();
    expect(getByAltText(/Test Product/)).toBeInTheDocument();
  });

  it('adds product to cart on button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const addButton = getByText(/Add to Cart/i);
    fireEvent.click(addButton);
    expect(getByText(/✔ Added!/i)).toBeInTheDocument();
  });
});
