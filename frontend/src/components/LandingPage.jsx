import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import JoinCommunity from './JoinCommunity/JoinCommunity';
import Background from './Background/Background';
import LitGame from './LitGame/LitGame';
import Newsletter from './Newsletter/Newsletter';
import NewsletterPopup from './Newsletter/NewsletterPopup'; // Newly added
import Shop from './Shop/Shop';
import Testimonials from './Testimonials/Testimonials';
import RegisterInterest from './RegisterInterest/RegisterInterest';
import Footer from './Footer/Footer';
import './LandingPage.css';

const LandingPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="landing-page">
      <Navbar />
      <JoinCommunity />
      <Background>
        <LitGame />
        <Newsletter onSubscribeClick={() => setIsPopupOpen(true)} /> {/* Passing the handler */}
        <Shop />
        <Testimonials />
        <RegisterInterest />
        <Footer />
      </Background>

      {/* Newsletter Popup */}
      <NewsletterPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
