import React, { useState } from 'react';
import './SneakersWorld.css';
import Card from "../../../components/Newsletter-components/shared/Card/Card.jsx";

const SneakersWorld = ({ posts }) => {
  const [showAll, setShowAll] = useState(false);

  if (!posts || posts.length === 0) {
    return null;
  }

  const visiblePosts = posts.slice(5); // posts beyond the first 5

  return (
    <section className="sw-section">
      <div className="sw-title-container">
        <h2 className="sw-title-line1">SNEAKER</h2>
        <h2 className="sw-title-line2">WORLD</h2>
      </div>

      {/* Main 5-Post Layout */}
      <div className="sw-grid-container">
        {posts[0] && (
          <div className="sw-card-wrapper sw-large-card">
            <Card {...posts[0]} articleUrl={`/newsletter/article/${posts[0].slug}`} />
          </div>
        )}
        {posts.slice(1, 5).map((post, index) => (
          <div
            key={post.slug}
            className={`sw-card-wrapper sw-small-card-${index + 1}`}
          >
            <Card {...post} articleUrl={`/newsletter/article/${post.slug}`} />
          </div>
        ))}
      </div>

      {/* Read More Section */}
      {visiblePosts.length > 0 && (
        <>
          <div className={`sw-read-more-grid ${showAll ? "expanded" : ""}`}>
            {showAll && visiblePosts.map((post) => (
              <div key={post.slug} className="sw-card-wrapper sw-small-card">
                <Card {...post} articleUrl={`/newsletter/article/${post.slug}`} />
              </div>
            ))}
          </div>

          <div className="read-more-container">
            <button
              className="read-more-button"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Read Less" : "Read More"}
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default SneakersWorld;