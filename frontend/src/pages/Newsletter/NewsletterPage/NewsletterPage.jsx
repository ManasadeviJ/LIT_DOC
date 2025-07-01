import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './NewsletterPage.css';

import NewsletterHeader from '../NewsletterHeader/NewsletterHeader';
import Footer from '../../../components/Newsletter-components/Footer/Footer';
import SustainableFashion from '../SustainableFashion/SustainableFashion';
import LuxuryFashion from '../LuxuryFashion/LuxuryFashion';
import FastFashion from '../FastFashion/FastFashion';
import FashionSection from '../FashionSection/FashionSection';
import SneakersWorld from '../SneakersWorld/SneakersWorld';

const NewsletterPage = () => {
  const [searchParams] = useSearchParams();
  const contentRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState('100vh');
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('default');

  useEffect(() => {
    const fetchArticles = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/articles');
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const data = await response.json();
        setAllArticles(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (loading) return;
    const sectionToScroll = searchParams.get('section');
    if (sectionToScroll) {
      const element = document.getElementById(`${sectionToScroll}-section`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [loading, searchParams]);

  useEffect(() => {
    const measureHeight = () => {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setContainerHeight(`${contentRef.current.offsetHeight}px`);
        }
      });
    };
    measureHeight();
    window.addEventListener('resize', measureHeight);
    return () => window.removeEventListener('resize', measureHeight);
  }, [loading, activeFilter]);

  const handleFilterChange = (newFilter) => {
    if (newFilter !== activeFilter) {
      setActiveFilter(newFilter);
    }
  };

  const domesticContent = useMemo(() => allArticles.filter(a => a.location?.toLowerCase() === 'domestic'), [allArticles]);
  const internationalContent = useMemo(() => allArticles.filter(a => a.location?.toLowerCase() === 'international'), [allArticles]);

  const articlesToRender = useMemo(() => {
    if (activeFilter === 'domestic') return domesticContent;
    if (activeFilter === 'international') return internationalContent;
    return allArticles;
  }, [activeFilter, domesticContent, internationalContent, allArticles]);

  const renderSections = (articles) => {
    if (loading || !articles) return null;

    const sections = [
      { id: 'sustainable', Component: SustainableFashion, posts: articles.filter(p => p.category === 'SustainableFashion') },
      { id: 'luxury', Component: LuxuryFashion, posts: articles.filter(p => p.category === 'LuxuryFashion') },
      { id: 'fashion-feature', Component: FashionSection, post: articles.find(p => p.category === 'FashionFeature') },
      { id: 'fast', Component: FastFashion, posts: articles.filter(p => p.category === 'FastFashion') },
      { id: 'sneakers', Component: SneakersWorld, posts: articles.filter(p => p.category === 'SneakerWorld') },
    ];

    return sections.map(section => {
      const sectionId = `${section.id}-section`;
      if (section.id === 'fashion-feature') {
        return section.post ? <div id={sectionId} key={section.id}><section.Component post={section.post} /></div> : null;
      }
      if (!section.posts || section.posts.length === 0) return null;
      return <div id={sectionId} key={section.id}><section.Component posts={section.posts} /></div>;
    });
  };

  if (loading) return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '150px' }}>Loading...</h2>;
  if (error) return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '150px' }}>Error: {error}</h2>;

  return (
    <div className="page-flip-container" >
      <div className="content-wrapper" ref={contentRef}>
        <NewsletterHeader activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        <div className="page-container">
          {renderSections(articlesToRender)}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default NewsletterPage;
