import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { login } from '../redux/userSlice';

// Test Suite for NavBar Component
// Verifies the behavior of the NavBar based on user authentication state
describe('NavBar', () => {
  beforeEach(() => {
    // Reset the Redux store to its initial state before each test
    store.dispatch({ type: 'user/logout' });
  });

  // Test Case: Displays login link when user is not logged in
  it('shows login link if user not logged in', () => {
    // Render the NavBar component wrapped in Redux Provider and BrowserRouter
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    // Assert that the "Login" link is displayed
    expect(getByText(/🔐 Login/i)).toBeInTheDocument();
  });

  // Test Case: Displays logout and user greeting when user is logged in
  it('shows logout if user is logged in', () => {
    // Simulate a logged-in user by dispatching a login action to the Redux store
    store.dispatch(login({ name: 'Daniel', email: 'daniel@example.com' }));

    // Render the NavBar component wrapped in Redux Provider and BrowserRouter
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    // Assert that the user greeting and "Logout" button are displayed
    expect(getByText(/👋 Hi, Daniel/)).toBeInTheDocument();
    expect(getByText(/📕 Logout/)).toBeInTheDocument();
  });
});
