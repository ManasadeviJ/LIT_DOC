import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import singleModeImage from '../assets/single-mode.png';
import tournamentModeImage from '../assets/tournament-mode.png';
import teamBattleImage from '../assets/team-battle.png';
import fashionShowdownImage from '../assets/fashion-showdown.png';
import '../styles/GameModesPage.css';

const GameModesPage = () => {
  const [activeTab, setActiveTab] = useState('clothing');
  const [notifications] = useState([
    {
      id: 1,
      type: 'friend',
      message: 'New Friend Request – Game master42 wants to be friends',
      buttons: ['Accept', 'Decline']
    },
    {
      id: 2,
      type: 'game',
      message: 'Game Invite – Team battle in Tournament mode',
      buttons: ['Join', 'Skip']
    }
  ]);

  const gameModes = [
    {
      id: 1,
      title: 'Single Mode',
      description: 'Normal game mode with two options',
      image: singleModeImage
    },
    {
      id: 2,
      title: 'Tournament Mode',
      description: '8 players facing off in elimination',
      image: tournamentModeImage
    },
    {
      id: 3,
      title: 'Team Battle',
      description: 'Team up with your friends',
      image: teamBattleImage
    },
    {
      id: 4,
      title: 'Fashion Showdown',
      description: 'Among 6, one wins based on fashion',
      image: fashionShowdownImage
    }
  ];

  const leaderboard = [
    { rank: 1, username: 'LuxuryinTaste', coins: 555 },
    { rank: 2, username: 'Gamer42', coins: 534 },
    { rank: 3, username: 'Alix Johnson', coins: 510 },
    { rank: 4, username: 'Mariya Satnova', coins: 500 },
    { rank: 5, username: 'Liya James', coins: 485 }
  ];

  return (
    <div className="game-modes-page">
      <div className="game-modes-container">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="quick-menu">
            <h3>Quick Menu</h3>
            <ul>
              <li className="active">Game Mode</li>
              <li>Tournaments</li>
              <li>
                <Link to="/shop" className="menu-link">Shop</Link>
              </li>
              <li>Friends</li>
            </ul>
          </div>

          <div className="notifications">
            <h3>Recent Notifications</h3>
            {notifications.map(notification => (
              <div key={notification.id} className="notification-card">
                <p>{notification.message}</p>
                <div className="notification-buttons">
                  {notification.buttons.map(button => (
                    <button key={button} className="notification-btn">
                      {button}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Tabs */}
          <div className="content-header">
            <div className="tabs">
              <button 
                className={activeTab === 'clothing' ? 'active' : ''}
                onClick={() => setActiveTab('clothing')}
              >
                Clothing
              </button>
              <button 
                className={activeTab === 'bags' ? 'active' : ''}
                onClick={() => setActiveTab('bags')}
              >
                Bags
              </button>
              <button 
                className={activeTab === 'accessories' ? 'active' : ''}
                onClick={() => setActiveTab('accessories')}
              >
                Accessories
              </button>
              <button 
                className={activeTab === 'footwear' ? 'active' : ''}
                onClick={() => setActiveTab('footwear')}
              >
                Footwear
              </button>
            </div>
          </div>

          {/* Game Mode Cards */}
          <div className="game-modes-grid">
            <div className="category-section">
              <div className="filter">
                <select>
                  <option>Category ▼</option>
                  <option>All</option>
                  <option>New</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>
            <div className="cards-section">
              {gameModes.map(mode => (
                <div key={mode.id} className="game-mode-card">
                  <div className="card-image">
                    <img src={mode.image} alt={mode.title} />
                  </div>
                  <div className="card-content">
                    <h3>{mode.title}</h3>
                    <p>{mode.description}</p>
                  </div>
                  <button className="play-now-btn">Play Now</button>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="leaderboard-section">
            <div className="leaderboard-header">
              <h3>Leaderboard</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="leaderboard-card">
              {leaderboard.map(player => (
                <div key={player.rank} className="leaderboard-item">
                  <span className="rank">#{player.rank}</span>
                  <div className="player-info">
                    <span className="username">{player.username}</span>
                    <span className="coins">
                      <img src="/coin-icon.png" alt="coins" />
                      {player.coins}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModesPage; 