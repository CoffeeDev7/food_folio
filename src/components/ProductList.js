import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './ProductList.css';
import ProductCard from './ProductCard';

const ProductList = () => {
    const {
        products,
        setProducts,
        searchQuery,
        selectedCategory,
        setSelectedCategory,
        categories,
        setCategories,
        sortOption,
        page,
        setPage,
        loading,
        setLoading,
    } = useContext(ProductContext);

    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        // Fetch categories on initial render
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://world.openfoodfacts.org/categories.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data.tags);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [setCategories]);

    useEffect(() => {
        // Fetch products based on the selected filter
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let url = `https://world.openfoodfacts.org/search.json?page=${page}`;

                if (selectedCategory) {
                    url = `https://world.openfoodfacts.org/category/${selectedCategory}.json?page=${page}`;
                } else if (searchQuery) {
                    url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&json=true&page=${page}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (page === 1) {
                    setProducts(data.products);
                } else {
                    setProducts((prev) => [...prev, ...data.products]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, searchQuery, selectedCategory, setProducts]);

    useEffect(() => {
        // Sort products whenever products or sortOption changes
        const applySorting = () => {
            let sorted = [...products];

            if (sortOption === 'name-asc') {
                sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
            } else if (sortOption === 'name-desc') {
                sorted.sort((a, b) => b.product_name.localeCompare(a.product_name));
            } else if (sortOption === 'nutrition-asc') {
                sorted.sort((a, b) => (a.nutrition_grades || '').localeCompare(b.nutrition_grades || ''));
            } else if (sortOption === 'nutrition-desc') {
                sorted.sort((a, b) => (b.nutrition_grades || '').localeCompare(a.nutrition_grades || ''));
            }

            setSortedProducts(sorted);
        };

        applySorting();
    }, [products, sortOption]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setPage(1); // Reset to the first page when category changes
        setProducts([]); // Clear the current product list before fetching new data
    };
    
    return (
        <main className="main">
            <div className="filter-bar">
                <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="product-list">
                {sortedProducts.map((product) => (
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

export default ProductList;
