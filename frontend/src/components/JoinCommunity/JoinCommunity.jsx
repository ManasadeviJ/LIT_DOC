import React from 'react';
import './JoinCommunity.css';
import joinCommunityBg from '../../assets/join-community-bg.mp4';

const JoinCommunity = () => {
  return (
    <section className="join-community">
      <div className="video-container">
        <video autoPlay muted loop playsInline className="background-video">
          <source src={joinCommunityBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
      </div>
      
      <div className="content">
        <h1>Join our Community</h1>
        <p>Join our exclusive community!
        Be the first to know about the latest releases, market trends, exciting launches, and special offers. Stay ahead, Stay LIT.</p>
        <div className="button-container">
          <a href="#footer-community-section" className="cta-button">Join our Community</a>
          <button className="secondary-button" onClick={() => window.location.href='/shop'}>Explore Marketplace</button>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity; 