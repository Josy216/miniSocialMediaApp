import React, { useState, useEffect } from "react";
import "./admenu.css";
import { ScaleLoader } from "react-spinners";
import { useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();

  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------
  // FETCH CURRENT POST
  // --------------------------------
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must login first");
          return;
        }

        const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch post");

        const post = data.post;

        setCaption(post.caption || "");

        if (post.imageUrl) {
          setImagePreview(`http://localhost:3000/${post.imageUrl}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [id]);

  // --------------------------------
  // HANDLE FORM SUBMIT (CAPTION ONLY)
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must login");

      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caption }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update post");

      setSuccess("Post updated successfully!");

      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // RENDER
  // --------------------------------
  if (loadingPost) {
    return (
      <div className="loading-overlay">
        <ScaleLoader color="#4f46e5" />
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h2>Edit Post</h2>

        {loading && (
          <div className="loading-overlay">
            <ScaleLoader color="#4f46e5" />
            <p>Updating...</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* SHOW EXISTING IMAGE ONLY */}
        {imagePreview && (
          <div className="image-preview-container">
            <div className="image-preview">
              <img src={imagePreview} alt="Post" />
            </div>
          </div>
        )}

        {/* CAPTION TEXTAREA */}
        <div className="form-group">
          <label className="form-label">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="4"
            maxLength="2000"
            className="caption-input"
            placeholder="Update your caption..."
          />
          <div className="character-count">{caption.length}/2000</div>
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? (
            <ScaleLoader
              color="#ffffff"
              height={15}
              width={2}
              radius={2}
              margin={2}
            />
          ) : (
            "Update Post"
          )}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
