import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

// Header contract
// - Inputs: none (reads auth token/username from localStorage)
// - Outputs: navigation UI and logout behavior
// - Error modes: missing localStorage keys handled gracefully

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const token = typeof window !== 'undefined' && localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const storedUsername = localStorage.getItem('username');
            setUsername(storedUsername || '');
        }

        const onKey = (e) => {
            if (e.key === 'Escape') setMenuOpen(false);
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/');
    };

    const toggleMenu = () => setMenuOpen((s) => !s);

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <header className="header" role="banner">
                <div className="header-container">
                    <div className="brand">
                        <Link to="/" className="logo-link" aria-label="Blockbuster News home">
                            <div className="logo-text">Blockbuster <span className="logo-accent">News</span></div>
                        </Link>
                    </div>

                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        aria-controls="primary-navigation"
                        aria-expanded={menuOpen}
                        onClick={toggleMenu}
                        ref={menuButtonRef}
                    >
                        <span className="sr-only">Menu</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <nav id="primary-navigation" className={`main-nav ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Primary">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/threads">Discussions</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li>
                                {isLoggedIn ? (
                                    <Link to="/submit" className="cta">Submit</Link>
                                ) : (
                                    <button className="cta disabled" aria-disabled="true" title="Login to submit">Submit</button>
                                )}
                            </li>
                        </ul>
                    </nav>

                    <div className="auth-section">
                        {isLoggedIn ? (
                            <div className="user-menu">
                                <span className="welcome">Hi{username ? `, ${username}` : ''}</span>
                                <button onClick={handleLogout} className="logout-btn">Logout</button>
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/login" className="login-btn">Login</Link>
                                <Link to="/register" className="register-btn">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
