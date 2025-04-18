import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { logout } from '../redux/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">🛍️ Nuway</Link>

      <div className="nav-links">
        {user.name && <span className="nav-user">👋 Hi, {user.name}</span>}
        <Link to="/profile" className="nav-link">👤 Profile</Link>

        {user.name && (
          <Link to="/orders" className="nav-link">📄 Orders</Link>
        )}

        <Link to="/cart" className="nav-cart">
          🛒 <span data-testid="cart-count" className="cart-count">{totalItems}</span>
        </Link>

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
