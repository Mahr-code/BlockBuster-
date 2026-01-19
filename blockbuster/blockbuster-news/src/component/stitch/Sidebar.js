import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'threads', label: 'Threads', path: '/threads' },
    { id: 'jobs', label: 'Jobs', path: '/jobs' },
    { id: 'posts', label: 'Posts', path: '/posts' },
    { id: 'profile', label: 'Profile', path: '/profile' },
    { id: 'settings', label: 'Settings', path: '/settings' },
    { id: 'logout', label: 'Logout', path: '/logout' },
  ];

  const handleMenuClick = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Menu</h2>
        <button className="close-btn" onClick={toggleSidebar}>
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <a
                href={item.path}
                className={`menu-link ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>&copy; 2026 Blockbuster</p>
      </div>
    </aside>
  );
};

export default Sidebar;