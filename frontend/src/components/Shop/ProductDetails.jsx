import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/api';
import '../../styles/productDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);

        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Update selectedImages when color or product changes
  useEffect(() => {
    if (!product || !product.images) return;
    const colorGroup = product.images.find(group => group.color === selectedColor);
    setSelectedImages(colorGroup?.images || []);
    setActiveImageIndex(0);
  }, [selectedColor, product]);

  const handleColorSelect = (color) => setSelectedColor(color);
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(Math.max(1, isNaN(value) ? 1 : value));
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }

    alert(`Added to cart: ${product.name} - ${selectedColor} - ${selectedSize} - Qty: ${quantity}`);
    // You can dispatch your Redux addToCart here
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }

    const orderItem = {
      productId: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageUrl: selectedImages[0] || '',
      color: selectedColor,
      size: selectedSize,
      quantity,
      stock: product.stock,
    };

    navigate('/checkout', { state: { items: [orderItem] } });
  };

  if (!product) return <div className="product-details-loading">Loading...</div>;

  return (
    <div className="product-details-page">
      <div className="product-details-grid">
        {/* Product Images */}
        <div className="product-images-section">
          <div className="main-image-container">
            {selectedImages[activeImageIndex] ? (
              <img
                src={selectedImages[activeImageIndex]}
                alt={`${product.name} - ${selectedColor}`}
                className="main-product-image"
              />
            ) : (
              <div className="main-product-image placeholder">No Image</div>
            )}
          </div>
          <div className="thumbnail-container">
            {selectedImages.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <div className="brand-name">{product.brand}</div>
          <h1 className="product-name">{product.name}</h1>

          <div className="price-container">
            <div className="current-price">Rs. {product.price.toLocaleString()}</div>
            {product.originalPrice && (
              <div className="original-price">Rs. {product.originalPrice.toLocaleString()}</div>
            )}
            {product.discount && (
              <div className="discount">{product.discount}% OFF</div>
            )}
          </div>

          <div className="product-description">
            {product.description}
          </div>

          {/* Color Selection */}
          <div className="selection-container">
            <h3>Color</h3>
            <div className="color-options">
              {(product.colors || []).map((color) => (
                <button
                  key={color}
                  className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => handleColorSelect(color)}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                >
                  {selectedColor === color && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="white"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="selection-container">
            <h3>Size</h3>
            <div className="size-options">
              {(product.sizes || []).map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="selection-container">
            <h3>Quantity</h3>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
              <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>

          {/* Features */}
          <div className="product-details-list">
            <h3>Product Details</h3>
            <ul>
              {(product.features || []).map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
