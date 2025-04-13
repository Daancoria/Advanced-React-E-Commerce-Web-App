import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../redux/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Navbar component
const Navbar: React.FC = () => {
  // Get cart items and calculate the total number of items
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Get user information from the Redux store
  const user = useSelector((state: RootState) => state.user);

  // Initialize Redux dispatch and React Router navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler: Signs out the user and redirects to the login page
  const handleLogout = async () => {
    await signOut(auth); // Sign out from Firebase authentication
    dispatch(logout()); // Dispatch the logout action to update Redux state
    navigate('/auth'); // Redirect to the authentication page
  };

  return (
    <nav className="navbar">
      {/* Logo linking to the home page */}
      <Link to="/" className="nav-logo">🛍️ Nuway</Link>

      {/* Navigation links */}
      <div className="nav-links">
        {/* Display a greeting if the user is logged in */}
        {user.name && <span className="nav-user">👋 Hi, {user.name}</span>}

        {/* Profile link */}
        <Link to="/profile" className="nav-link">👤 Profile</Link>

        {/* Orders link (only visible if the user is logged in) */}
        {user.name && (
          <Link to="/orders" className="nav-link">📄 Orders</Link>
        )}

        {/* Cart link with the total number of items */}
        <Link to="/cart" className="nav-cart">
          🛒 <span className="cart-count">{totalItems}</span>
        </Link>

        {/* Conditional rendering for login/logout button */}
        {user.name ? (
          // Logout button (visible if the user is logged in)
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            📕 Logout
          </button>
        ) : (
          // Login link (visible if the user is not logged in)
          <Link to="/auth" className="nav-link">
            🔐 Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
