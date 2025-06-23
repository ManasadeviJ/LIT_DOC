import React from 'react';
import './UnfoldingSoonSection.css';
import avatarStoreIcon from '../../assets/AvatarStore-icon.svg';
import socialPlatformIcon from '../../assets/social-platform-icon.svg';
import irIcon from '../../assets/ir-icon.svg';

const UnfoldingSoonSection = () => {
  return (
    <section className="unfolding-soon-container" aria-label="Upcoming Features">
      <h2 className="unfolding-main-title">Unfolding Other Verticals Soon</h2>
      
      <div className="icons-container">
        <div className="section-wrapper">
          <div className="card-description">
            <h3>Avatar Store</h3>
            <p className="card-subtitle">Your Alter Ego Vault</p>
          </div>
          <div className="icon-card-wrapper">
            <div className="icon-card">
              <div className="card-front">
                <img src={avatarStoreIcon} alt="Avatar Store Feature" className="vertical-icon" id="avatar-store-icon"/>
              </div>
              <div className="card-back">
                <p>The Avatar Store offers virtual collections of clothing, shoes, bags, and accessories to style your personalized avatar with flair.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-wrapper">
          <div className="card-description">
            <h3>Social Platform</h3>
            <p className="card-subtitle">Inspire. Engage. Earn.</p>
          </div>
          <div className="icon-card-wrapper">
            <div className="icon-card">
              <div className="card-front">
                <img src={socialPlatformIcon} alt="Social Platform Feature" className="vertical-icon" id="social-platform-icon"/>
              </div>
              <div className="card-back">
                <p>Serves as a vibrant hub for fashion enthusiasts to sell their collection, share their thoughts and connect with people.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-wrapper">
          <div className="card-description">
            <h3>IR Platform</h3>
            <p className="card-subtitle">Your Lens to Instant Shopping</p>
          </div>
          <div className="icon-card-wrapper">
            <div className="icon-card">
              <div className="card-front">
                <img src={irIcon} alt="IR Platform Feature" className="vertical-icon" id="ir-platform-icon"/>
              </div>
              <div className="card-back">
                <p>Effortlessly provides users with the exact product links of any image uploaded.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnfoldingSoonSection; 