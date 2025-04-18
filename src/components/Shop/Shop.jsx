import React from 'react';
import './Shop.css';
import shopSustainableImage from '../../assets/shop-section-girl.jpg';
import shopLuxuryImage from '../../assets/shop-section-man.jpg';

const Shop = () => {
  return (
    <section className="shop-container">
      <div className="shop-header">
        <h1>Shop Luxury & Sustainable Fashion</h1>
        <p>Explore New Sustainable Products, Brands, and Enjoy Exclusive Discounts on Luxury Goods, and Much More—Only on Our Platform.</p>
      </div>
      
      <div className="shop-cards">
        <div className="shop-card">
          <div className="card-text">
            <h2>SUSTAINABLE</h2>
            <p>Our sustainable e-commerce platform offers a curated selection of eco-friendly products, from fashion to everyday essentials. Discover brands committed to sustainability, reduce your carbon footprint, and shop with a purpose. Join us in making a positive impact</p>
            <button className="coming-soon-btn">Coming Soon</button>
          </div>
          <div className="shop-card-image">
            <img src={shopSustainableImage} alt="Sustainable Fashion" />
          </div>
        </div>

        <div className="shop-card">
          <div className="card-text">
            <h2>LUXURY</h2>
            <p>Our luxury e-commerce platform offers a curated selection of the finest luxury products with exclusive discounts. From timeless pieces to everyday luxury, only on our platform.</p>
            <button className="coming-soon-btn">Coming Soon</button>
          </div>
          <div className="shop-card-image">
            <img src={shopLuxuryImage} alt="Luxury Fashion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop; 