import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "./menu.css";

function PostsFeed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/posts`);
      setPosts(response.data.posts || []);
      setLoading(false);
    } catch (err) {
      setError(
        "Failed to fetch posts: " + (err.response?.data?.error || err.message)
      );
      setLoading(false);
    }
  };

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
                  src={
                    post.avatar.startsWith("http")
                      ? post.avatar
                      : `http://localhost:3000${post.avatar}`
                  }
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
                  src={
                    post.image.startsWith("http") ||
                    post.image.startsWith("data:")
                      ? post.image
                      : `http://localhost:3000${post.image}` // fixed
                  }
                  alt="Post"
                  style={{height:"320px"}}
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

export default PostsFeed;
