import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image_url || "placeholder.jpg"} alt={product.product_name} />
      <h2>{product.product_name}</h2>
      <p>Category: {product.categories || "N/A"}</p>
      <p>Nutrition Grade: {product.nutrition_grades || "N/A"}</p>
      <Link to={`/product/${product.code}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
