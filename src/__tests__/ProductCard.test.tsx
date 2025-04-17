import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  description: 'A test product description',
  category: 'test-category',
  rating: { rate: 4.5, count: 120 },
  image: 'https://via.placeholder.com/150'
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(getByText(/Test Product/i)).toBeInTheDocument();
    expect(getByText(/\$19.99/)).toBeInTheDocument();
    expect(getByAltText(/Test Product/)).toBeInTheDocument();
  });

  it('toggles favorite on click', () => {
    const { container } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const favoriteButton = container.querySelector('.favorite-btn')!;
    expect(favoriteButton.classList.contains('favorited')).toBe(false);
    fireEvent.click(favoriteButton);
    expect(favoriteButton.classList.contains('favorited')).toBe(true);
  });

  it('adds product to cart on button click', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const addButton = getByText(/Add to Cart/i);
    fireEvent.click(addButton);
    expect(getByText(/✓ Added!/i)).toBeInTheDocument();
  });
});
