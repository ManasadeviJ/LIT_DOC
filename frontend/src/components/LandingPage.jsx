import React from 'react';
import JoinCommunity from './JoinCommunity/JoinCommunity';
import Background from './Background/Background';
import LitGame from './LitGame/LitGame';
import Newsletter from './Newsletter/Newsletter';
import Shop from './Shop/Shop';
import UnfoldingSoonSection from './UnfoldingSoonSection/UnfoldingSoonSection';
import Testimonials from './Testimonials/Testimonials';
import RegisterInterest from './RegisterInterest/RegisterInterest';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <JoinCommunity />
      <Background>
        <LitGame />
        <Newsletter />
        <Shop />
        <UnfoldingSoonSection />
        <Testimonials />
        <RegisterInterest />
      </Background>
    </div>
  );
};

export default LandingPage; 