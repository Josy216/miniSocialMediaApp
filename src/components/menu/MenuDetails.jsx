import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "./menu.css";

function Randomfeed() {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const [error] = useState(null);

  // Random data with YouTube thumbnail images
  const posts = [
    {
      id: 7,
      userId: 3,
      caption: "I am backend dev though, that's why I wear black jacket",
      image: "https://img.youtube.com/vi/GzBcIBQmoNQ/mqdefault.jpg",
      createdAt: "2025-12-11T13:13:07.000Z",
      username: "Joseph",
      avatar: "https://img.youtube.com/vi/GzBcIBQmoNQ/mqdefault.jpg",
    },
    {
      id: 5,
      userId: 2,
      caption:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae hic vero neque, minima, minus porro rerum optio officiis dignissimos ea animi dicta, amet molestiae et tempore cupiditate unde accusantium maiores.",
      image: "https://img.youtube.com/vi/1KpVApvCvbc/mqdefault.jpg",
      createdAt: "2025-12-11T12:57:11.000Z",
      username: "jocode",
      avatar: "https://img.youtube.com/vi/1KpVApvCvbc/mqdefault.jpg",
    },
    {
      id: 4,
      userId: 2,
      caption: "Deploy your app online like this.",
      image: "https://img.youtube.com/vi/lq8rtH99uME/mqdefault.jpg",
      createdAt: "2025-12-11T10:45:33.000Z",
      username: "jocode",
      avatar: "https://img.youtube.com/vi/lq8rtH99uME/mqdefault.jpg",
    },
    {
      id: 3,
      userId: 1,
      caption:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium optio sed doloribus voluptatibus. At laboriosam eum ipsa commodi expedita possimus.",
      image: "https://img.youtube.com/vi/sdLZSP_9Y3Y/mqdefault.jpg",
      createdAt: "2025-12-11T10:32:22.000Z",
      username: "Josy",
      avatar: "https://img.youtube.com/vi/sdLZSP_9Y3Y/mqdefault.jpg",
    },
    {
      id: 2,
      userId: 1,
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error dolorem necessitatibus maiores cumque ad?",
      image: "https://img.youtube.com/vi/5yek6gHnd90/mqdefault.jpg",
      createdAt: "2025-12-11T10:20:28.000Z",
      username: "Josy",
      avatar: "https://img.youtube.com/vi/5yek6gHnd90/mqdefault.jpg",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="feed-container">
      {/* Minimal Header */}
      <header className="feed-header">
        <div className="header-left">
          <h1>What's New</h1>
        </div>
        <button
          className="create-post-btn"
          onClick={() => navigate("/create-post")}
        >
          Create Post
        </button>
      </header>

      {loading && (
        <div className="loading-overlay">
          <ScaleLoader color="#4f46e5" />
          <p>Loading posts...</p>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && posts.length === 0 && (
        <div className="no-posts">
          <h3>No posts yet</h3>
          <p>Be the first to create a post!</p>
          <button
            className="create-post-btn"
            onClick={() => navigate("/create-post")}
          >
            Create Your First Post
          </button>
        </div>
      )}

      <div className="feed">
        {posts.map((post) => (
          <div key={post.id} className="post">
            {/* User Info Section */}
            <div className="post-header">
              {post.avatar ? (
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="user-avatar"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<div class="avatar-placeholder">${post.username
                      ?.charAt(0)
                      .toUpperCase()}</div>`;
                  }}
                />
              ) : (
                <div className="avatar-placeholder">
                  {post.username?.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="user-info">
                <h3 className="username">{post.username}</h3>
                <span className="post-time">{formatDate(post.createdAt)}</span>
              </div>
            </div>

            {/* Post Content */}
            {post.caption && (
              <div className="post-caption">
                <p>{post.caption}</p>
              </div>
            )}

            {post.image && (
              <div className="post-image-container">
                <img
                  src={post.image}
                  alt="Post"
                  style={{ height: "320px" }}
                  className="post-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<div class="youtube-placeholder">
                      <span>Image unavailable</span>
                    </div>`;
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Randomfeed;
