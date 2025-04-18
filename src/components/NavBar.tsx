import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../redux/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Navbar Component
// Displays navigation links, user information, and cart details
const Navbar: React.FC = () => {
  // Access cart items and calculate total items in the cart
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Access user information from Redux store
  const user = useSelector((state: RootState) => state.user);

  // Initialize Redux dispatch and React Router navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle user logout
  // Signs the user out of Firebase, updates Redux state, and navigates to the auth page
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      {/* Logo Link */}
      {/* Navigates to the home page */}
      <Link to="/" className="nav-logo">🛍️ Nuway</Link>

      {/* Navigation Links */}
      <div className="nav-links">
        {/* Display user greeting if logged in */}
        {user.name && <span className="nav-user">👋 Hi, {user.name}</span>}

        {/* Profile Link */}
        <Link to="/profile" className="nav-link">👤 Profile</Link>

        {/* Orders Link (only visible if user is logged in) */}
        {user.name && (
          <Link to="/orders" className="nav-link">📄 Orders</Link>
        )}

        {/* Cart Link */}
        {/* Displays the total number of items in the cart */}
        <Link to="/cart" className="nav-cart">
          🛒 <span data-testid="cart-count" className="cart-count">{totalItems}</span>
        </Link>

        {/* Authentication Links */}
        {/* Show "Logout" button if user is logged in, otherwise show "Login" link */}
        {user.name ? (
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            📕 Logout
          </button>
        ) : (
          <Link to="/auth" className="nav-link">
            🔐 Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
