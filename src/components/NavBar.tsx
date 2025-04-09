import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional, for styling

const Navbar: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const user = useSelector((state: RootState) => state.user);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">🛍️ Nuway</Link>
            <div className="nav-links">
                {user.name && <span className="nav-user">👋 Hi, {user.name}</span>}
                <Link to="/profile" className="nav-link">👤 Profile</Link>
                <Link to="/cart" className="nav-cart">
                    🛒 <span className="cart-count">{totalItems}</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
