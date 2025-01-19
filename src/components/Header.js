// components/Header.jsx
import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import './Header.css';

const Header = () => {
    const {
        searchQuery,
        setSearchQuery,
        barcodeQuery,
        setBarcodeQuery,
        handleSearch,
        handleBarcodeSearch,
        categories,
        selectedCategory,
        setSelectedCategory,
        handleSort
    } = useContext(ProductContext);

    return (
        <header className="header">
            <h1>Food Product Explorer</h1>
            <div className="search-bar">
                
                    <input
                        type="text"
                        placeholder="Search by product name (eg. try Choco)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Search</button>
            </div>
            <div className="barcode-search">
                <input
                    type="text"
                    placeholder="Search by barcode"
                    value={barcodeQuery}
                    onChange={(e) => setBarcodeQuery(e.target.value)}
                />
                <button onClick={handleBarcodeSearch}>Search Barcode</button>
            </div>
            
            <div className="sort-options">
                <select onChange={(e) => handleSort(e.target.value)}>
                    <option value="">Sort By</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="nutrition-asc">Nutrition Grade (Asc)</option>
                    <option value="nutrition-desc">Nutrition Grade (Desc)</option>
                </select>
            </div>
        </header>
    );
};

export default Header;