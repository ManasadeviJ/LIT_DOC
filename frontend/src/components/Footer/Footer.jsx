import React, { useState } from 'react';
import './Footer.css';
import logo from '../../assets/lit-logo.png';
import emailIcon from '../../assets/email-logo.svg';
import linkedinIcon from '../../assets/linkedin-logo.svg';
import instagramIcon from '../../assets/instagram-logo.svg';
import twitterIcon from '../../assets/twitter-logo.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Subscribed successfully! Please check your email.');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.message || 'Subscription failed.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
  };

  return (
    <footer className="footer-container" id="footer-community-section">
      <nav className="footer-top-nav">
        <a href="/">Home</a>
        <a href="/shop">Marketplace</a>
        <a href="/game-modes">Game Modes</a>
        <a href="/about-us">About Us</a>
        <a href="/contact-us">Contact Us</a>
        <a href="/faq">FAQ</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
      </nav>

      <div className="footer-main-body">
        <div className="footer-left">
          <img src={logo} alt="LIT Logo" className="footer-logo" />
        </div>

        <div className="footer-center">
          <h3>Join our Community</h3>
          <form className="footer-email-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter Your Email" 
              className="footer-email-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer-subscribe-btn">Subscribe</button>
          </form>
          {message && (
            <div className={`footer-subscribe-message ${messageType}`}>{message}</div>
          )}
        </div>

        <div className="footer-right">
          <h3 className="footer-contact-title">Contact Us</h3>
          <div className="footer-links-grid">
            <a href="mailto:info@luxuryintaste.com" className="contact-label">Email</a>
            <a href="mailto:info@luxuryintaste.com" className="contact-icon"><img src={emailIcon} alt="Email" /></a>
            <a href="#" className="store-link">Get it on Google Play</a>

            <a href="https://www.linkedin.com/company/luxury-in-taste/" target="_blank" rel="noopener noreferrer" className="contact-label">LinkedIn</a>
            <a href="https://www.linkedin.com/company/luxury-in-taste/" target="_blank" rel="noopener noreferrer" className="contact-icon"><img src={linkedinIcon} alt="LinkedIn" /></a>
            <a href="#" className="store-link">Download on the App Store</a>

            <a href="https://www.instagram.com/luxuryintaste/" target="_blank" rel="noopener noreferrer" className="contact-label">Instagram</a>
            <a href="https://www.instagram.com/luxuryintaste/" target="_blank" rel="noopener noreferrer" className="contact-icon"><img src={instagramIcon} alt="Instagram" /></a>
            <span className="store-link-placeholder"></span>

            <a href="https://twitter.com/luxuryintaste" target="_blank" rel="noopener noreferrer" className="contact-label">Twitter</a>
            <a href="https://twitter.com/luxuryintaste" target="_blank" rel="noopener noreferrer" className="contact-icon"><img src={twitterIcon} alt="Twitter" /></a>
            <span className="store-link-placeholder"></span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Luxury In Taste. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 