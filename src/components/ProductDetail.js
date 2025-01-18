import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();  // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching product data (Replace with your actual data fetch logic)
        const fetchProduct = async () => {
            try {
                // Replace this with actual API request or context fetch
                const response = await fetch(`https://api.example.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);  // Re-run when the product ID changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found! {id}</div>;
    }

    return (
        <div className="product-detail">
            <h2>{product.product_name}</h2>
            <img src={product.image_url} alt={product.product_name} />
            <div className="product-info">
                <h3>Ingredients:</h3>
                <p>{product.ingredients_text || 'N/A'}</p>
                <h3>Nutritional Values:</h3>
                <ul>
                    <li>Energy: {product.nutriments.energy || 'N/A'}</li>
                    <li>Fat: {product.nutriments.fat || 'N/A'}</li>
                    <li>Carbs: {product.nutriments.carbohydrates || 'N/A'}</li>
                    <li>Proteins: {product.nutriments.proteins || 'N/A'}</li>
                </ul>
                <h3>Labels:</h3>
                <p>{product.labels.join(', ') || 'N/A'}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
