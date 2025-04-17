import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import './Cart.css'; // optional, for styling

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: number, value: number) => {
        if (value >= 1) {
        dispatch(updateQuantity({ id, quantity: value }));
        }
    };

    const handleCheckout = () => {
        dispatch(clearCart());
        alert('✅ Checkout complete! Your cart has been cleared.');
    };

    return (
        <div className="cart-page">
        <h2>🛒 Shopping Cart</h2>

        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <>
            <ul className="cart-list">
                {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div className="cart-details">
                    <h4>{item.title}</h4>
                    <p>${item.price.toFixed(2)}</p>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                    />
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                </li>
                ))}
            </ul>

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
