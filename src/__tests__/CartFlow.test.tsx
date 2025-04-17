import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';

const mockProduct = {
  id: 1,
  title: 'Flow Test Product',
  price: 25.0,
  description: 'Test description',
  category: 'test',
  rating: { rate: 4, count: 10 },
  image: 'https://via.placeholder.com/150'
};

describe('Cart Integration', () => {
  it('updates NavBar cart count when adding product', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <ProductCard product={mockProduct} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText(/🛒/).nextSibling?.textContent).toBe('0');
    const addButton = getByText(/Add to Cart/i);
    fireEvent.click(addButton);
    expect(getByText(/🛒/).nextSibling?.textContent).toBe('1');
  });
});
