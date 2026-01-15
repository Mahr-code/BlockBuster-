import React, { useState, useEffect } from 'react';
import Post from './Post';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="posts-loading">
        <div className="loading-spinner" aria-label="Loading posts">
          <svg viewBox="0 0 50 50" aria-hidden="true">
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-error" role="alert">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="posts-empty">
        <p>No posts yet. Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="posts-list">
      {posts.map(post => (
        <Post key={post._id} post={post} preview={true} />
      ))}
    </div>
  );
};

export default PostList;
