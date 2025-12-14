import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "./admin.css";

const MyPosts = () => {
  const [deletingId] = useState(null);

  // Static post data
  const posts = [
    {
      id: 7,
      userId: 3,
      caption: "I am backend dev though, that's why I wear black jacket",
      image: "https://img.youtube.com/vi/GzBcIBQmoNQ/mqdefault.jpg",
      createdAt: "2025-12-11T13:13:07.000Z",
    },
    {
      id: 2,
      userId: 1,
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia error dolorem necessitatibus maiores cumque ad?",
      image: "https://img.youtube.com/vi/5yek6gHnd90/mqdefault.jpg",
      createdAt: "2025-12-11T10:20:28.000Z",
    },
  ];

  // Non-functional edit handler
  const handleEdit = (id) => {
    alert(
      `Edit functionality would open post ${id} in edit mode.\n\nNote: This is a demo - edit feature is disabled.`
    );
  };

  // Non-functional delete handler
  const handleDelete = (id) => {
    alert(
      `Delete functionality would remove post ${id}.\n\nNote: This is a demo - delete feature is disabled.`
    );
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

        {/* Demo notice */}
        <div className="demo-notice">
          <div className="demo-badge">DEMO MODE</div>
          <p className="demo-text">
            This is a demo version. Edit and Delete buttons are non-functional.
          </p>
        </div>

        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              {/* Post Content - Only Caption & Image */}
              <div className="post-content">
                {post.caption && (
                  <div className="post-text">
                    <p>{post.caption}</p>
                  </div>
                )}

                {post.image && (
                  <div className="post-image-container">
                    <img src={post.image} alt="Post" className="post-image" />
                  </div>
                )}
              </div>

              {/* Post Actions - Only Edit & Delete */}
              <div className="post-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(post.id)}
                  title="Edit post (demo)"
                >
                  Edit
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(post.id)}
                  title="Delete post (demo)"
                >
                  Delete
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
