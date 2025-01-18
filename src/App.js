// App.jsx
import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { ProductProvider } from './contexts/ProductContext';
import './App.css';

const App = () => {
    return (
        <ProductProvider>
            <div className="app-container">
                <Header />
                <ProductList />
            </div>
        </ProductProvider>
    );
};

export default App;