import React, { useState, useEffect } from 'react';
import './Navbar.css';
import litLogo from '../../assets/lit-logo.png';
import profileAvatar from '../../assets/profile-avatar.png';
import notificationIcon from '../../assets/notification-icon.svg';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle link click
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src={litLogo} alt="LIT Logo" className="logo-img" />
          </a>
        </div>
        
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <a 
            href="#game-modes" 
            className={activeLink === 'game-modes' ? 'active' : ''} 
            onClick={() => handleLinkClick('game-modes')}
          >
            Game Modes
          </a>
          <a 
            href="#marketplace" 
            className={activeLink === 'marketplace' ? 'active' : ''} 
            onClick={() => handleLinkClick('marketplace')}
          >
            Marketplace
          </a>
          <a 
            href="#socials" 
            className={activeLink === 'socials' ? 'active' : ''} 
            onClick={() => handleLinkClick('socials')}
          >
            Socials
          </a>
          <a 
            href="#newsletters" 
            className={activeLink === 'newsletters' ? 'active' : ''} 
            onClick={() => handleLinkClick('newsletters')}
          >
            Newsletter
          </a>
          <a 
            href="#settings" 
            className={activeLink === 'settings' ? 'active' : ''} 
            onClick={() => handleLinkClick('settings')}
          >
            Avatar Store
          </a>
          <a 
            href="#ir-icon" 
            className={activeLink === 'ir-icon' ? 'active' : ''} 
            onClick={() => handleLinkClick('ir-icon')}
          >
            IR Icon
          </a>
        </div>
        
        <div className="navbar-right">
          <div className="notification-icon">
            <img src={notificationIcon} alt="Notifications" className="notification-img" />
          </div>
          <div className="navbar-avatar">
            <img src={profileAvatar} alt="User Avatar" className="avatar-img" />
          </div>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-bar ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 