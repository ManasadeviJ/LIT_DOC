import React, { useState } from 'react';
import './Footer.css';
import logo from '../../assets/lit-logo.png';
import emailIcon from '../../assets/email-logo.svg';
import linkedinIcon from '../../assets/linkedin-logo.svg';
import instagramIcon from '../../assets/instagram-logo.svg';
import twitterIcon from '../../assets/twitter-logo.svg';
import googlePlay from '../../assets/google-play.png';
import appStore from '../../assets/app-store.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Subscribed successfully! Please check your email.');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.error || 'Subscription failed.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
  };

  return (
    <footer className="footer-container" id="footer-community-section">
      <style>
        {`
          .footer-email-container > form {
            display: flex;
            width: 100%;
            gap: 1rem;
          }
          @media screen and (max-width: 768px) {
            .footer-email-container > form {
              flex-direction: column;
            }

            .footer-contact-table {
              grid-template-columns: auto auto !important;
              justify-content: center;
            }

            .footer-store-link {
              display: none !important;
            }
          }
        `}
      </style>
      {/* Top Navigation Bar */}
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
        {/* Left: Logo */}
        <div className="footer-left">
          <img src={logo} alt="LIT Logo" className="footer-logo" />
        </div>

        {/* Center: Newsletter Subscription */}
        <div className="footer-center">
          <h3>Join our Community</h3>
          <div className="footer-email-container">
            <form onSubmit={handleSubscribe}>
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
          </div>
          {message && (
            <div className={`footer-subscribe-message ${messageType}`}>{message}</div>
          )}
        </div>

        {/* Right: Contacts and Store Links */}
        <div className="footer-right">
          <h3 className="footer-contact-title">Contact Us</h3>
          <div className="footer-contact-table">
            <a className="footer-contact-label" href="mailto:info@luxuryintaste.com">Email</a>
            <a className="footer-contact-icon" href="mailto:info@luxuryintaste.com"><img src={emailIcon} alt="Email" /></a>
            <span className="footer-store-link">Get it on Google Play</span>

            <a className="footer-contact-label" href="https://www.linkedin.com/company/luxury-in-taste/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="footer-contact-icon" href="https://www.linkedin.com/company/luxury-in-taste/" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="LinkedIn" /></a>
            <span className="footer-store-link">Download on the App Store</span>

            <a className="footer-contact-label" href="https://www.instagram.com/luxuryintaste/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="footer-contact-icon" href="https://www.instagram.com/luxuryintaste/" target="_blank" rel="noopener noreferrer"><img src={instagramIcon} alt="Instagram" /></a>
            <span className="footer-store-link"></span>

            <a className="footer-contact-label" href="https://twitter.com/luxuryintaste" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className="footer-contact-icon" href="https://twitter.com/luxuryintaste" target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt="Twitter" /></a>
            <span className="footer-store-link"></span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Luxury In Taste. All rights reserved.</p>
        <p>DEBUG-FOOTER-V1</p>
      </div>
    </footer>
  );
};

export default Footer; 