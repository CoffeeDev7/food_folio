// components/ProductList.jsx
import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './ProductList.css';
import ProductCard from './ProductCard';

const ProductList = () => {
    const {
        products,
        setProducts,
        searchQuery,
        barcodeQuery,
        categories,
        setCategories,
        selectedCategory,
        sortOption,
        page,
        setPage,
        loading,
        setLoading
    } = useContext(ProductContext);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let url = `https://world.openfoodfacts.org/search.json?page=${page}`;

            if (selectedCategory) {
                url = `https://world.openfoodfacts.org/category/${selectedCategory}.json?page=${page}`;
            } else if (searchQuery) {
                url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&json=true&page=${page}`;
            }

            const response = await fetch(url);
            const data = await response.json();
            setProducts((prev) => [...prev, ...data.products]);
            setLoading(false);
        };
        fetchProducts();
    }, [page, searchQuery, selectedCategory]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://world.openfoodfacts.org/categories.json');
            const data = await response.json();
            setCategories(data.tags);
        };
        fetchCategories();
    }, []);

    return (
        <main className='main'>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            <button
                className="load-more"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loading}
            >
                Load More
            </button>
        </main>
    );
};

export default ProductList