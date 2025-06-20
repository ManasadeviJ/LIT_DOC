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
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          {/* Logo Section */}
          <div className="footer-logo-section">
            <img src={logo} alt="LIT Logo" className="footer-logo" />
          </div>

          {/* Main Navigation */}
          <div className="footer-main-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Services</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>

        <div className="footer-secondary">
          {/* Join Community Section */}
          <div className="footer-join-section">
            <h3>Join our Community</h3>
            <div className="footer-email-container">
              <form onSubmit={handleSubscribe} style={{ display: 'flex', width: '100%' }}>
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

          {/* Contact Links */}
          <div className="footer-contact-section">
            <div className="footer-contact-item">
              <span>Email</span>
              <a href="mailto:info@luxuryintaste.com">
                <img src={emailIcon} alt="Email" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>LinkedIn</span>
              <a href="https://www.linkedin.com/company/luxury-in-taste-lit/" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>Instagram</span>
              <a href="https://www.instagram.com/luxuryintaste?utm_source=qr&igsh=MTU3NTlmNWdzY25kYw==" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" />
              </a>
            </div>
            <div className="footer-contact-item">
              <span>Twitter</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitterIcon} alt="Twitter" />
              </a>
            </div>
          </div>

          {/* App Store Buttons */}
          <div className="footer-store-buttons">
            <button className="store-button google-play">
              <img src="/src/assets/Google play.svg" alt="Get it on Google Play" />
              
            </button>
            <button className="store-button app-store">
              <img src="/src/assets/App store.svg" alt="Download on the App Store" />
              
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="footer-copyright">© 2024 Luxuryintatse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 