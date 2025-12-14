import React, { useState } from 'react';
import "./admenu.css";
import { ScaleLoader } from 'react-spinners';

function CreatePost() {
  const [form, setForm] = useState({
    caption: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInput = (e) => {
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, PNG or GIF files are allowed");
        return;
      }

      setImageFile(file);
      setError("");
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate at least one field is filled
    if (!form.caption && !imageFile) {
      setError("Please add a caption or upload an image");
      setLoading(false);
      return;
    }

    // Validate caption length if provided
    if (form.caption && form.caption.length > 2000) {
      setError("Caption cannot exceed 2000 characters");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("You need to login first");
      }

      const formData = new FormData();
      if (form.caption) formData.append("caption", form.caption);
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
      }

      setSuccess("Post created successfully!");
      
      // Reset form
      setForm({ caption: "" });
      setImageFile(null);
      setImagePreview("");
      
      // Optionally redirect or refresh posts
      setTimeout(() => {
        window.location.reload(); // Or navigate to posts page
      }, 1500);

    } catch (error) {
      setError(error.message || "Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleForm}>
        <h2>Create New Post</h2>
        
        {loading && (
          <div className="loading-overlay">
            <ScaleLoader color="#4f46e5" />
            <p>Creating post...</p>
          </div>
        )}
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Image Upload Section */}
        <div className="image-upload-section">
          <div className="image-preview-container">
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={removeImage}
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="image-upload-placeholder">
                <label className="upload-label">
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                </label>
                <p className="upload-hint">Max 5MB • JPG, PNG, GIF</p>
              </div>
            )}
          </div>
        </div>

        {/* Caption Input */}
        <div className="form-group">
          <label htmlFor="caption" className="form-label">
            Caption (Optional)
          </label>
          <textarea
            id="caption"
            name="caption"
            value={form.caption}
            placeholder="What's on your mind?"
            onChange={handleInput}
            className="caption-input"
            rows="4"
            maxLength="2000"
          />
          <div className="character-count">
            {form.caption.length}/2000
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <ScaleLoader
              color="#ffffff"
              height={15}
              width={2}
              radius={2}
              margin={2}
            />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;