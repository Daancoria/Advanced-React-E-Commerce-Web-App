import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { login } from '../redux/userSlice';

describe('NavBar', () => {
  it('shows login link if user not logged in', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText(/🔐 Login/i)).toBeInTheDocument();
  });

  it('shows logout if user is logged in', () => {
    store.dispatch(login({ name: 'Daniel', email: 'daniel@example.com' }));

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText(/👋 Hi, Daniel/)).toBeInTheDocument();
    expect(getByText(/📕 Logout/)).toBeInTheDocument();
  });
});
