import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.code}`} className="product-card-link">
            <div className="product-card">
                <img src={product.image_url} alt={product.product_name} />
                <h3>{product.product_name}</h3>
            </div>
        </Link>
    );
};

export default ProductCard;
