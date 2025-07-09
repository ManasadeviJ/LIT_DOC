import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import './NewsletterPage.css';

import NewsletterHeader from '../NewsletterHeader/NewsletterHeader';
import Footer from '../../../components/Newsletter-components/Footer/Footer';
import { getArticles } from '../../../services/api';

// ✅ Lazy-load heavy section components
const SustainableFashion = lazy(() => import('../SustainableFashion/SustainableFashion'));
const LuxuryFashion = lazy(() => import('../LuxuryFashion/LuxuryFashion'));
const FastFashion = lazy(() => import('../FastFashion/FastFashion'));
const FashionSection = lazy(() => import('../FashionSection/FashionSection'));
const SneakersWorld = lazy(() => import('../SneakersWorld/SneakersWorld'));

const NewsletterPage = () => {
  const [searchParams] = useSearchParams();
  const contentRef = useRef(null);

  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('default');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await getArticles();
        setAllArticles(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (!loading) {
      const sectionToScroll = searchParams.get('section');
      if (sectionToScroll) {
        const element = document.getElementById(`${sectionToScroll}-section`);
        if (element) {
          requestAnimationFrame(() =>
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          );
        }
      }
    }
  }, [loading, searchParams]);

  const handleFilterChange = (newFilter) => {
    if (newFilter !== activeFilter) {
      setActiveFilter(newFilter);
    }
  };

  const domesticContent = useMemo(
    () => allArticles.filter(a => a.location?.toLowerCase() === 'domestic'),
    [allArticles]
  );
  const internationalContent = useMemo(
    () => allArticles.filter(a => a.location?.toLowerCase() === 'international'),
    [allArticles]
  );

  const articlesToRender = useMemo(() => {
    if (activeFilter === 'domestic') return domesticContent;
    if (activeFilter === 'international') return internationalContent;
    return allArticles;
  }, [activeFilter, domesticContent, internationalContent, allArticles]);

  const renderSections = (articles) => {
    if (!articles) return null;

    const sections = [
      { id: 'sustainable', Component: SustainableFashion, posts: articles.filter(p => p.category === 'SustainableFashion') },
      { id: 'luxury', Component: LuxuryFashion, posts: articles.filter(p => p.category === 'LuxuryFashion') },
      { id: 'fashion-feature', Component: FashionSection, post: articles.find(p => p.category === 'FashionFeature') },
      { id: 'fast', Component: FastFashion, posts: articles.filter(p => p.category === 'FastFashion') },
      { id: 'sneakers', Component: SneakersWorld, posts: articles.filter(p => p.category === 'SneakerWorld') },
    ];

    return sections.map(({ id, Component, posts, post }) => {
      const sectionId = `${id}-section`;

      if (id === 'fashion-feature' && post) {
        return (
          <div id={sectionId} key={id}>
            <Component post={post} />
          </div>
        );
      }

      if (posts?.length > 0) {
        return (
          <div id={sectionId} key={id}>
            <Component posts={posts} />
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className="page-flip-container">
      <div className="content-wrapper" ref={contentRef}>
        <NewsletterHeader activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {loading && (
          <h2 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>Loading...</h2>
        )}

        {error && (
          <h2 style={{ color: 'red', textAlign: 'center', marginTop: '150px' }}>
            Error: {error}
          </h2>
        )}

        {!loading && !error && (
          <div className="page-container">
            <Suspense fallback={<div className="lazy-loader">Loading sections...</div>}>
              {renderSections(articlesToRender)}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterPage;
