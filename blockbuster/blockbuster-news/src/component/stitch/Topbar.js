import React, { useState } from 'react';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      // Add search functionality here
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-container">
        <div className="topbar-left">
          <button className="hamburger-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <h1 className="topbar-logo">Blockbuster</h1>
        </div>

        <div className="topbar-center">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search threads, jobs, posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>

        <div className="topbar-right">
          <button className="notification-btn">
            🔔
            <span className="notification-badge">3</span>
          </button>
          <div className="user-menu">
            <img src="/default-avatar.png" alt="User Avatar" className="user-avatar" />
            <span className="user-name">User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;