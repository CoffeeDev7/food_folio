import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("https://world.openfoodfacts.org/search.json?json=true");
    const data = await res.json();
    setProducts(data.products);
    setFilteredProducts(data.products);
  };

  const fetchCategories = async () => {
    const res = await fetch("https://world.openfoodfacts.org/categories.json");
    const data = await res.json();
    const categoryNames = data.tags.map((tag) => tag.name);
    setCategories(categoryNames);
  };

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.product_name?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (category) => {
    if (!category) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.categories?.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="homepage">
      <Header onSearch={handleSearch} />
      <div className="content">
        <FilterSidebar categories={categories} onFilter={handleFilter} />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
};

export default HomePage;
