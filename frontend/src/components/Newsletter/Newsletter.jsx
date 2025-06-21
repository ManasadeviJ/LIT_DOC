import React, { useState } from 'react';
import './Newsletter.css';
import sustainabilityImg from '../../assets/sustainable-fashion-trends.png';
import luxuryImg from '../../assets/luxury-fashion.png';
import fashionImg from '../../assets/trendy-fast-fashion.png';
import sneakerImg from '../../assets/sustainable-group.png';

const Newsletter = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    try {
      const response = await fetch(`/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.message || 'Subscription failed.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    }
  };

  const cards = [
    {
      id: 1,
      image: sustainabilityImg,
      title: "THE REALM OF SUSTAINABILITY",
      description: "Discover new sustainable brands reshaping the market, delve into the latest news on eco-conscious goods, and explore much more in the realm of sustainable fashion."
    },
    {
      id: 2,
      image: luxuryImg,
      title: "ALL IN LUXURY",
      description: "Indulge in the opulence of high-end fashion, showcasing the latest trends, exclusive releases, and the epitome of luxury in every stitch and design."
    },
    {
      id: 3,
      image: fashionImg,
      title: "WHAT'S FAST IN FASHION",
      description: "Stay ahead with real-time insights into the fast-paced world of fashion. Selected rapid trends, quick fashion updates, and evolving fashion landscape."
    },
    {
      id: 4,
      image: sneakerImg,
      title: "WHAT'S HOT IN THE SNEAKER WORLD",
      description: "Step into the sneaker culture with a spotlight on the latest drops, exclusive releases, and must-have kicks in the sneaker world."
    }
  ];

  const scrollLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="newsletter-luxury-section">
      <div className="newsletter-luxury-header">
        <h2>Newsletter</h2>
        <p>Subscribe now to receive weekly short updates on fast fashion, luxury fashion, sustainable fashion, and the sneaker market to stay ahead of the curve.</p>
        <form className="newsletter-luxury-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="newsletter-luxury-input"
          />
          <button type="submit" className="newsletter-luxury-btn">Subscribe</button>
        </form>
        {message && (
          <p className={`newsletter-luxury-message ${messageType}`}>{message}</p>
        )}
      </div>
      <div className="newsletter-luxury-slider">
        <button className="luxury-slider-arrow left" onClick={scrollLeft} aria-label="Scroll left">&#8249;</button>
        <div className="luxury-slider-cards">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              className={`luxury-slider-card${idx === currentIndex ? ' active' : ''}`}
              style={{ transform: `translateX(${(idx - currentIndex) * 100}%)` }}
            >
              <div className="luxury-slider-img-wrap">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="luxury-slider-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button className="luxury-learn-more">Learn more &#8250;</button>
              </div>
            </div>
          ))}
        </div>
        <button className="luxury-slider-arrow right" onClick={scrollRight} aria-label="Scroll right">&#8250;</button>
      </div>
    </section>
  );
};

export default Newsletter;
