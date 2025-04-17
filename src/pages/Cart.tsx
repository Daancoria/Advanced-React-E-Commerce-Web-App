import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import './Cart.css'; // Optional, for styling

// Cart Component
// Displays the shopping cart, allows users to update quantities, remove items, and proceed to checkout
const Cart: React.FC = () => {
    // Access cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // Initialize Redux dispatch
    const dispatch = useDispatch();

    // Calculate total items and total price in the cart
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cartItems
        .reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
        .toFixed(2);

    // Handle removing an item from the cart
    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    // Handle updating the quantity of an item in the cart
    const handleQuantityChange = (id: number, value: number) => {
        if (value >= 1) {
            dispatch(updateQuantity({ id, quantity: value }));
        }
    };

    // Handle checkout process
    // Clears the cart and displays a confirmation message
    const handleCheckout = () => {
        dispatch(clearCart());
        alert('✅ Checkout complete! Your cart has been cleared.');
    };

    return (
        <div className="cart-page">
            {/* Page Header */}
            <h2>🛒 Shopping Cart</h2>

            {/* Display a message if the cart is empty */}
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {/* List of cart items */}
                    <ul className="cart-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                {/* Product Image */}
                                <img src={item.image} alt={item.title} />

                                {/* Product Details */}
                                <div className="cart-details">
                                    <h4>{item.title}</h4>
                                    <p>${item.price.toFixed(2)}</p>

                                    {/* Quantity Input */}
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity || 1}
                                        onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                                    />

                                    {/* Remove Button */}
                                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <p>Total Items: <strong>{totalItems}</strong></p>
                        <p>Total Price: <strong>${totalPrice}</strong></p>
                        <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
