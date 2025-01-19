import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}.json`);
                if (!response.ok) {
                    throw new Error(`Error fetching product with ID ${id}`);
                }

                const data = await response.json();
                if (data.status === 1) {
                    setProduct(data.product); // Use the "product" object from the response
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

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
                <p>
                    {Array.isArray(product.labels)
                        ? product.labels.join(', ')
                        : typeof product.labels === 'string'
                        ? product.labels
                        : 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default ProductDetail;
