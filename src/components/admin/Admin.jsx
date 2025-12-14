import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import "./admin.css";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/posts/my-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(response.data.posts || []);
      setLoading(false);
    } catch (err) {
      setError(
        "Failed to fetch your posts: " +
          (err.response?.data?.error || err.message)
      );
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      setDeletingId(id);
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from state
      setPosts(posts.filter((post) => post.id !== id));
      setDeletingId(null);
    } catch (err) {
      setError(
        "Failed to delete post: " + (err.response?.data?.error || err.message)
      );
      setDeletingId(null);
    }
  };

  return (
    <div className="my-posts-container">
      <main className="my-posts-main">
        <div className="page-header">
          <h1 className="page-title">My Posts</h1>
          <Link to="/create-post" className="create-btn">
            Create New Post
          </Link>
        </div>

        {loading && (
          <div className="loading-overlay">
            <ScaleLoader color="#4f46e5" />
            <p>Loading your posts...</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        {!loading && !error && posts.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No posts yet</h3>
            <p>You haven't created any posts yet. Start creating!</p>
            <Link to="/create-post" className="create-btn">
              Create Your First Post
            </Link>
          </div>
        )}

        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              {/* Post Content */}
              <div className="post-content">
                {post.caption && (
                  <div className="post-text">
                    <p>{post.caption}</p>
                  </div>
                )}

                {post.image && (
                  <div className="post-image-container">
                    <img
                      src={`http://localhost:3000${post.image}`}
                      alt="Post content"
                      className="post-image"
                    />
                  </div>
                )}
              </div>

              {/* Post Actions - Only Edit/Delete */}
              <div className="post-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(post.id)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                >
                  {deletingId === post.id ? (
                    <ScaleLoader color="#ffffff" height={10} width={2} />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyPosts;
