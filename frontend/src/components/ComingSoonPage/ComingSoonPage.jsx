import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoonPage.css';
import rocketIcon from '../../assets/lit-logo.png'; 

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-overlay">
      <div className="coming-soon-content">
        <img src={rocketIcon} alt="Launching soon" className="coming-soon-icon" />
        
        <h1>COMING SOON</h1>
        <p>
          We're working hard to bring you this feature.
          <br/>
          Stay tuned for the launch!
        </p>
        
        <button 
          className="coming-soon-button" 
          onClick={() => navigate('/')}
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default ComingSoonPage;