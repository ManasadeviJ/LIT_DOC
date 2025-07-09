import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCards from '../components/CategoryCards';
import FilterBar from '../components/FilterBar';
import ProductList from '../components/Shop/ProductList';
import { getProducts } from '../services/api';

const Shop = () => {
  const location = useLocation();
  const initialCategory = location.state?.selectedCategory || null;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productListRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        const productArray = Array.isArray(data) ? data : [];

        setProducts(productArray);

        let filtered = initialCategory
          ? productArray.filter(p => p.category === initialCategory)
          : productArray;

        filtered = applySort(filtered, activeSort);
        setFilteredProducts(filtered);

        setLoading(false);

        if (initialCategory && productListRef.current) {
          setTimeout(() => {
            productListRef.current.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialCategory]);

  const applySort = (productsArray, sortOption) => {
    const sorted = [...productsArray];

    if (sortOption === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'discount-high') {
      sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return sorted;
  };

  const handleSearch = (query) => {
    const source = activeCategory
      ? products.filter(p => p.category === activeCategory)
      : products;

    const filtered = query
      ? source.filter(product =>
          product.name?.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase())
        )
      : source;

    setFilteredProducts(applySort(filtered, activeSort));
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);

    let filtered = category
      ? products.filter(p => p.category === category)
      : products;

    filtered = applySort(filtered, activeSort);
    setFilteredProducts(filtered);

    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSortChange = (sortOption) => {
    setActiveSort(sortOption);

    const filtered = activeCategory
      ? products.filter(p => p.category === activeCategory)
      : products;

    const sorted = applySort(filtered, sortOption);
    setFilteredProducts(sorted);
  };

  return (
    <div className="shop-page">
      <SearchBar onSearch={handleSearch} />

      <div
        style={{
          fontSize: '2.8rem',
          fontFamily: '"Poppins", sans-serif',
          fontWeight: '600',
          color: '#ffffff',
          textAlign: 'center',
          marginTop: '2rem',
          marginBottom: '1rem',
          letterSpacing: '0.1em',
        }}
      >
        THE HOUSE OF LIT
      </div>

      <div style={{ marginTop: '4rem' }}>
        <CategoryCards />
      </div>

      <FilterBar
        onCategorySelect={handleCategorySelect}
        onSortChange={handleSortChange}
      />

      {loading ? (
        <h2>Loading Products...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div ref={productListRef}>
          <ProductList products={filteredProducts} />
        </div>
      )}
    </div>
  );
};

export default Shop;
