import React, { useState } from 'react';
import "../components/ProductCard.css";
import { Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [added, setAdded] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setAdded(true);
        setTimeout(() => setAdded(false), 1500); 
    };

    const handleFavoriteToggle = () => {
        setFavorited(prev => !prev);
    };

    return (
        <div className='product-card'>
            {/* ❤️ Favorite Button */}
            <button className={`favorite-btn ${favorited ? 'favorited' : ''}`} onClick={handleFavoriteToggle}>
                <i className={`fa${favorited ? 's' : 'r'} fa-heart`}></i>
            </button>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            
            <div className="product-rating">
                {Array.from({ length: 5 }, (_, i) => {
                    const full = i + 1 <= Math.floor(product.rating.rate);
                    const half = !full && i < product.rating.rate && product.rating.rate < i + 1;
                    return (
                        <i
                            key={i}
                            className={
                                full
                                    ? 'fas fa-star'
                                    : half
                                    ? 'fas fa-star-half-alt'
                                    : 'far fa-star'
                            }
                        ></i>
                    );
                })}
                <span> ({product.rating.count} reviews)</span>
            </div>
            <img src={product.image} alt={product.title} className='product-image' />
            
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

