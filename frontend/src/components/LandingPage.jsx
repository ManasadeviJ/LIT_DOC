// LandingPage.jsx

import React, { useState } from 'react'; // 1. Import useState
import JoinCommunity from './JoinCommunity/JoinCommunity';
import Background from './Background/Background';
import LitGame from './LitGame/LitGame';
import Newsletter from './Newsletter/Newsletter';
import Shop from './Shop/Shop';
import UnfoldingSoonSection from './UnfoldingSoonSection/UnfoldingSoonSection';
import Testimonials from './Testimonials/Testimonials';
import RegisterInterest from './RegisterInterest/RegisterInterest';
import Footer from './Newsletter-components/Footer/Footer';
import NewsletterPopup from './Newsletter/NewsletterPopup'; // 2. Import the Popup component
import './LandingPage.css';

const LandingPage = () => {
  // 3. Create state to manage the popup's visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 4. Create functions to open and close the popup
  const openNewsletterPopup = () => {
    setIsPopupOpen(true);
  };

  const closeNewsletterPopup = () => {
    setIsPopupOpen(false);
  };
  
  return (
    <div className="landing-page">
      {/* 5. Render the popup and pass the required props */}
      <NewsletterPopup isOpen={isPopupOpen} onClose={closeNewsletterPopup} />

      <JoinCommunity />
      <Background>
        <LitGame />

        {/* 6. This now works because openNewsletterPopup is defined */}
        <Newsletter onSubscribeClick={openNewsletterPopup} />

        <Shop />
        <UnfoldingSoonSection />
        <Testimonials />
        <RegisterInterest />
        {/* <Footer /> */}
      </Background>
    </div>
  );
};

export default LandingPage; 