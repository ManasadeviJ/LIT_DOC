import React, { useState, useEffect } from 'react';
import './NewsletterPopup.css';

// ⬇️ Inserted the function directly here
async function subscribeToNewsletter(email) {
  try {
    const response = await fetch('https://luxuryintaste-bndnffc9hfdweabt.eastus-01.azurewebsites.net/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message || 'Subscription successful!',
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

const NewsletterPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    type: '', // 'success' or 'error'
  });

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setStatus({ loading: false, message: '', type: '' });
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    try {
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setStatus({
          loading: false,
          message: result.message,
          type: 'success',
        });

        setTimeout(() => {
          setEmail('');
          onClose();
        }, 2000);
      } else {
        setStatus({
          loading: false,
          message: result.message,
          type: 'error',
        });
      }
    } catch (error) {
      setStatus({
        loading: false,
        message: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
    }
  };

  const handleClose = () => {
    setEmail('');
    setStatus({ loading: false, message: '', type: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={handleClose}>×</button>
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get weekly updates on luxury, sustainable, fast fashion and the sneaker market</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status.loading}
          />
          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.message}
            </div>
          )}
          <button
            type="submit"
            className={`subscribe-button ${status.loading ? 'loading' : ''}`}
            disabled={status.loading}
          >
            {status.loading ? 'SUBSCRIBING...' : 'SUBSCRIBE NOW'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
