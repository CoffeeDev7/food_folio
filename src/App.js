import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Header from './components/Header';
import ProductList from './components/ProductList';
import { ProductProvider } from './contexts/ProductContext';
import ProductDetail from './components/ProductDetail'; // Import ProductDetail
import './App.css';

const App = () => {
    return (
        <ProductProvider>
            <Router>  {/* Wrap everything in Router */}
                <div className="app-container">
                    <Header />
                    <Routes>  {/* Use Routes to handle routes */}
                        <Route path="/" element={<ProductList />} />  {/* Use element prop */}
                        <Route path="/product/:id" element={<ProductDetail />} />  {/* Use element prop */}
                    </Routes>
                </div>
            </Router>
        </ProductProvider>
    );
};

export default App;
