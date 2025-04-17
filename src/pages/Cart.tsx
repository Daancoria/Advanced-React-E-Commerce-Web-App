import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import './Cart.css';
import { CartItem } from '../types/types'; 

const Cart: React.FC = () => {
    const cartItems: CartItem[] = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cartItems
        .reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
        .toFixed(2);

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
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
                                        value={item.quantity}
                                        onChange={e => handleQuantityChange(item.id, e)}
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
