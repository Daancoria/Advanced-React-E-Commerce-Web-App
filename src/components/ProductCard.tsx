import React, { useState } from 'react';
import "../components/ProductCard.css";
import { Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

// ProductCard Component
// This component displays individual product details, including title, price, description, category, rating, and image.
// It also provides functionality to add the product to the cart and toggle it as a favorite.
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    // State to track if the product has been added to the cart
    const [added, setAdded] = useState(false);

    // State to track if the product is marked as a favorite
    const [favorited, setFavorited] = useState(false);

    // Redux dispatch to trigger actions (e.g., adding to cart)
    const dispatch = useDispatch();

    // Handler for adding the product to the cart
    const handleAddToCart = () => {
        dispatch(addToCart(product)); // Dispatch the add-to-cart action
        setAdded(true); // Set the "added" state to true
        setTimeout(() => setAdded(false), 1500); // Reset the "added" state after 1.5 seconds
    };

    // Handler for toggling the favorite state
    const handleFavoriteToggle = () => {
        setFavorited(prev => !prev); // Toggle the "favorited" state
    };

    return (
        <div className='product-card'>
            {/* Favorite Button */}
            {/* Allows the user to mark/unmark the product as a favorite */}
            <button className={`favorite-btn ${favorited ? 'favorited' : ''}`} onClick={handleFavoriteToggle}>
                <i className={`fa${favorited ? 's' : 'r'} fa-heart`}></i>
            </button>

            {/* Product Title, Price, and Description */}
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            
            {/* Product Rating */}
            {/* Displays a 5-star rating system with full, half, and empty stars based on the product's rating */}
            <div className="product-rating">
                {Array.from({ length: 5 }, (_, i) => {
                    const full = i + 1 <= Math.floor(product.rating.rate); // Full star condition
                    const half = !full && i < product.rating.rate && product.rating.rate < i + 1; // Half star condition
                    return (
                        <i
                            key={i}
                            className={
                                full
                                    ? 'fas fa-star' // Full star icon
                                    : half
                                    ? 'fas fa-star-half-alt' // Half star icon
                                    : 'far fa-star' // Empty star icon
                            }
                        ></i>
                    );
                })}
                <span> ({product.rating.count} reviews)</span>
            </div>

            {/* Product Image */}
            {/* Displays the product image */}
            <img src={product.image} alt={product.title} className='product-image' />
            
            {/* Add-to-Cart Button */}
            {/* Allows the user to add the product to the cart */}
            <button
                className={`add-to-cart ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
            >
                {added ? '✓ Added!' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductCard;

