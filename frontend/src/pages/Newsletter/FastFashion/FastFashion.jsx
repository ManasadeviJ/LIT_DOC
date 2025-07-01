import React, { useState, useRef } from 'react';
import './FastFashion.css';
import Card from "../../../components/Newsletter-components/shared/Card/Card.jsx";

const FastFashion = ({ posts }) => {
  const [visibleCount, setVisibleCount] = useState(8); // Show 2 rows initially
  const sectionRef = useRef(null); // To scroll back to this section

  if (!posts || posts.length === 0) {
    return null;
  }

  const visiblePosts = posts.slice(0, visibleCount);
  const allVisible = visibleCount >= posts.length;

  const handleToggle = () => {
    if (allVisible) {
      setVisibleCount(8);
      // Scroll back to section smoothly
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setVisibleCount((prev) => prev + 4);
    }
  };

  return (
    <section className="ff-section" ref={sectionRef}>
      <div className="ff-title-container">
        <h2 className="ff-title-line1">FAST</h2>
        <h2 className="ff-title-line2">FASHION</h2>
      </div>

      <div className="ff-grid">
        {visiblePosts.map((post) => (
          <div className="card-wrapper" key={post.slug}>
            <Card
              imageUrl={post.imageUrl}
              description={post.description}
              publishDate={post.publishDate}
              articleUrl={`/newsletter/article/${post.slug}`}
              location={post.location}
            />
          </div>
        ))}
      </div>

      {posts.length > 8 && (
        <div className="read-more-container">
          <button className="read-more-button" onClick={handleToggle}>
            {allVisible ? 'Read Less' : 'Read More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default FastFashion;
