import React from 'react';
import Navbar from './Navbar/Navbar';
import JoinCommunity from './JoinCommunity/JoinCommunity';
import Background from './Background/Background';
import LitGame from './LitGame/LitGame';
import Newsletter from './Newsletter/Newsletter';
import Shop from './Shop/Shop';
import Testimonials from './Testimonials/Testimonials';
import RegisterInterest from './RegisterInterest/RegisterInterest';
import Footer from './Footer/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <JoinCommunity />
      <Background>
        <LitGame />
        <Newsletter />
        <Shop />
        <Testimonials />
        <RegisterInterest />
        
        <Footer />
      </Background>
      
    </div>
  );
};

export default LandingPage; 