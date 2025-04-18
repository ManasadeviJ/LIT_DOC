import React, { useRef } from 'react';
import './Testimonials.css';
import testimonialUserImage from '../../assets/testimonial-user.png';

const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const scrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const testimonials = [
    {
      name: "JayaSri RajKumar",
      text: "It hasn’t even launched yet and I’m already obsessed. The energy, the ideas, the vision 👏"
    },
    {
      name: "Saif",
      text: "It’s giving... next-gen. I just know this platform’s going to blow up."
    },
    {
      name: "Aiman",
      text: "Can't wait for the e coming platform to drop in"
    },
    {
      name: "Shifa",
      text: "From what I’ve seen so far? Innovation + fun + community = LIT. Can’t wait to try it."
    },
    {
      name: "Amrin",
      text: "Their newsletter is so goood and fine."
    },
    {
      name: "Mosi",
      text: "I’ve seen a sneak peek of the platform and let me tell you—this is going to change the game."
    },
    {
      name: "Naresh",
      text: "The design is so good, we'll curated🔥"
    }
    
    
  ];

  return (
    <section className="testimonials-container">
      <h1>What Our Users Say</h1>
      
      <div className="testimonials-slider-container">
        <button 
          className="testimonial-nav-btn left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
         <span>‹</span>
        </button>

        <div className="testimonials-scroll" ref={scrollContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-user-image">
                <img src={testimonialUserImage} alt="User" />
              </div>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>

        <button 
          className="testimonial-nav-btn right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
         <span>›</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials; 