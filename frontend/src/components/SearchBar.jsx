import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    if (!inputValue) {
      setIsFocused(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(inputValue);
    }
  };
  
  return (
    <div className="search-container">
      <form className="search-wrapper" onSubmit={handleSubmit}>
        <div className={`search-box ${isFocused || inputValue ? 'has-text' : ''}`}> 
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="search-input"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button className="search-button" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 