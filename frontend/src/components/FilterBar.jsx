import React, { useEffect, useRef } from 'react';
import '../styles/FilterBar.css';

const FilterBar = () => {
  const filterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          filterRef.current.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (filterRef.current) {
      observer.observe(filterRef.current);
    }

    return () => {
      if (filterRef.current) {
        observer.unobserve(filterRef.current);
      };
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'kids', name: 'Kids' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'newest', name: 'Newest First' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' }
  ];

  return (
    <div className="filter-bar" ref={filterRef}>
      <div className="filter-container">
        <div className="select-wrapper">
          <select className="filter-select">
            <option value="" disabled>Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="select-wrapper">
          <select className="filter-select">
            <option value="" disabled>Sort By</option>
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 