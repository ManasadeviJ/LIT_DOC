import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CategoryCards from '../components/CategoryCards';
import FilterBar from '../components/FilterBar';
import ProductList from '../components/Shop/ProductList';
import { getProducts } from '../services/api';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
        setFilteredProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(products);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredProducts(
        products.filter(product =>
          product.name?.toLowerCase().includes(lowerQuery) ||
          product.description?.toLowerCase().includes(lowerQuery)
        )
      );
    }
  };

  return (
    <div className="shop-page">
      <SearchBar onSearch={handleSearch} />
      <CategoryCards />
      <FilterBar />
      {loading ? (
        <h2>Loading Products...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default Shop;