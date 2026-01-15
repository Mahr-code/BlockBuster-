import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Post.css';

const Post = ({ post, preview = false }) => {
  const [isUpvoting, setIsUpvoting] = useState(false);
  const [points, setPoints] = useState(post.points);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleUpvote = async (e) => {
    e.preventDefault();
    if (isUpvoting) return;

    try {
      setIsUpvoting(true);
      // Optimistic update
      setPoints(prev => prev + 1);

      const response = await fetch(`/api/posts/${post._id}/upvote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to upvote');
      }

      const data = await response.json();
      setPoints(data.points);
    } catch (err) {
      // Revert optimistic update
      setPoints(prev => prev - 1);
      setError('Failed to upvote. Please try again.');
      console.error('Upvote error:', err);
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.origin + '/posts/' + post._id
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.origin + '/posts/' + post._id)
        .then(() => alert('Link copied to clipboard!'))
        .catch(console.error);
    }
  };

  return (
    <article className={`post ${preview ? 'post-preview' : 'post-full'}`}>
      <div className="post-points-container">
        <button 
          onClick={handleUpvote}
          className={`upvote-button ${isUpvoting ? 'loading' : ''}`}
          disabled={isUpvoting}
          aria-label="Upvote this post"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path 
              fill="currentColor" 
              d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
            />
          </svg>
        </button>
        <span className="points-count" aria-label="Post points">
          {points}
        </span>
      </div>

      <div className="post-content">
        <div className="post-header">
          <h2 className="post-title">
            {post.url ? (
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="post-link"
              >
                {post.title}
              </a>
            ) : (
              <Link to={`/posts/${post._id}`} className="post-link">
                {post.title}
              </Link>
            )}
          </h2>
          {post.url && (
            <span className="post-domain">
              ({new URL(post.url).hostname.replace('www.', '')})
            </span>
          )}
        </div>

        <div className="post-meta">
          <span className="post-date">
            {formatDate(post.createdAt)}
          </span>
          {post.author && (
            <>
              <span className="meta-separator">·</span>
              <span className="post-author">
                by {post.author.username || 'Anonymous'}
              </span>
            </>
          )}
          <span className="meta-separator">·</span>
          <button 
            onClick={handleShare}
            className="share-button"
            aria-label="Share this post"
          >
            Share
          </button>
          <Link 
            to={`/posts/${post._id}#comments`}
            className="comments-link"
          >
            {post.comments?.length || 0} comments
          </Link>
        </div>

        {!preview && post.text && (
          <div className="post-text">
            {post.text}
          </div>
        )}

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
      </div>
    </article>
  );
};

export default Post;
