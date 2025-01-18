// // components/ProductCard.jsx
// import React from 'react';
// import './ProductCard.css';

// const ProductCard = ({ product }) => {
//     return (
//         <div className="product-card">
//             <img src={product.image_url} alt={product.product_name} />
//             <h3>{product.product_name}</h3>
//             <p>Category: {product.categories}</p>
//             <p>Nutrition Grade: {product.nutrition_grades}</p>
//             <p>Ingredients: {product.ingredients_text || 'N/A'}</p>
//         </div>
//     );
// };

// export default ProductCard;
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card">
                <img src={product.image_url} alt={product.product_name} />
                <h3>{product.product_name}</h3>
            </div>
        </Link>
    );
};

export default ProductCard;
