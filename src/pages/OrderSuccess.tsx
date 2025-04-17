import React from 'react';
import { Link } from 'react-router-dom';

// OrderSuccess Component
// This component displays a confirmation message after a successful order placement.
const OrderSuccess: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      {/* Success Message */}
      {/* Displays a thank-you message to the user */}
      <h2>✅ Thank you for your purchase!</h2>
      <p>Your order has been placed and saved to your history.</p>

      {/* Navigation Links */}
      {/* Provides links to view order history or continue shopping */}
      <Link to="/orders" style={{ marginRight: '20px' }}>📄 View Order History</Link>
      <Link to="/">🏠 Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
