import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [barcodeQuery, setBarcodeQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setProducts([]);
        setPage(1);
    };

    const handleBarcodeSearch = async () => {
        if (barcodeQuery) {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcodeQuery}.json`);
            const data = await response.json();
            setProducts([data.product]);
        }
    };

    const handleSort = (option) => {
        setSortOption(option);
        const sortedProducts = [...products];
        if (option === 'name-asc') {
            sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
        } else if (option === 'name-desc') {
            sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
        } else if (option === 'nutrition-asc') {
            sortedProducts.sort((a, b) => a.nutrition_grade.localeCompare(b.nutrition_grade));
        } else if (option === 'nutrition-desc') {
            sortedProducts.sort((a, b) => b.nutrition_grade.localeCompare(a.nutrition_grade));
        }
        setProducts(sortedProducts);
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                searchQuery,
                setSearchQuery,
                barcodeQuery,
                setBarcodeQuery,
                categories,
                setCategories,
                selectedCategory,
                setSelectedCategory,
                sortOption,
                setSortOption,
                page,
                setPage,
                loading,
                setLoading,
                handleSearch,
                handleBarcodeSearch,
                handleSort
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};