import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import packagingImage from './image.png'; // Import the packaging image

const ProductCard = ({ product }) => {
    // Use a fallback image if the product image is not available
    const productImage = product.image_url ? product.image_url : packagingImage;

    return (
        <Link to={`/product/${product.code}`} className="product-card-link">
            <div className="product-card">
                <img src={productImage} alt={product.product_name} />
                <h3>{product.product_name}</h3>
            </div>
        </Link>
    );
};

export default ProductCard;
