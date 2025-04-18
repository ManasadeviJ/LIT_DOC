import React, { useState, useRef } from 'react';
import './Newsletter.css';
import sustainabilityImg from '../../assets/sustainable-fashion-trends.png';
import luxuryImg from '../../assets/luxury-fashion.png';
import fashionImg from '../../assets/trendy-fast-fashion.png';
import sneakerImg from '../../assets/sustainable-group.png';

const Newsletter = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

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
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      const newPosition = Math.max(scrollPosition - cardWidth, 0);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      const maxScroll = container.scrollWidth - container.offsetWidth;
      const newPosition = Math.min(scrollPosition + cardWidth, maxScroll);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-header">
        <h2>Newsletter</h2>
        <p>Subscribe now to receive weekly short updates on fast fashion, luxury fashion, sustainable fashion, and the sneaker market to stay ahead of the curve.</p>
        <div className="cta-buttons">
          <button className="explore-btn">Explore Newsletter</button>
          <button className="subscribe-btn">Subscribe Now</button>
        </div>
      </div>

      <div className="newsletter-slider">
        <button className="scroll-btn left" onClick={scrollLeft}>
          <span>‹</span>
        </button>
        
        <div className="cards-container" ref={scrollContainerRef}>
          {cards.map((card) => (
            <div key={card.id} className="newsletter-card">
              <div className="card-image">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <button className="learn-more-btn">Learn more  <span>›</span></button>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>
          <span>›</span>
        </button>
      </div>
    </div>
  );
};

export default Newsletter; 