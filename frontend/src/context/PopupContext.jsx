import React, { createContext, useState, useContext, useEffect } from 'react';
import NewsletterPopup from '../components/Newsletter/NewsletterPopup';

// Create the context
const PopupContext = createContext();

// Custom hook to use the popup context
export const usePopup = () => useContext(PopupContext);

// Provider component
export const PopupProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Show popup after 3 seconds on first visit
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Function to open the popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('hasSeenNewsletterPopup', 'true');
  };

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      <NewsletterPopup isOpen={showPopup} onClose={closePopup} />
    </PopupContext.Provider>
  );
};

export default PopupContext; 