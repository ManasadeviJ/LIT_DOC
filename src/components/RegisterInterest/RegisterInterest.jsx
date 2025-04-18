import React from 'react';
import './RegisterInterest.css';

const RegisterInterest = () => {
  return (
    <section className="register-interest-container">
      <div className="register-interest-card">
        <h3 className="register-interest-small-heading">Register your interest for LIT!</h3>
        <h2 className="register-interest-main-heading"><pre>Be the first to know when the game <br /> goes live. Don't miss out</pre></h2>
        <p className="register-interest-subtext">SIGN UP and stay in loop!</p>
        <button className="register-interest-cta">Get started</button>
      </div>
    </section>
  );
};

export default RegisterInterest; 