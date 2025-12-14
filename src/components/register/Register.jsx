import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (3MB)
      if (file.size > 3 * 1024 * 1024) {
        setError("Image size should be less than 3MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      setAvatarFile(file);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.username || !formData.password || !avatarFile) {
      setError("Username, password and avatar are required");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.username.length < 3 || formData.username.length > 100) {
      setError("Username must be between 3 and 100 characters");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("avatar", avatarFile);

      const url = `http://localhost:3000/api/auth/register`;
      const res = await fetch(url, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Registration successful!");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Reset form
      setFormData({ username: "", password: "" });
      setAvatarFile(null);
      setAvatarPreview(null);

      // Redirect after success
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleForm} className="register-form">
        <div className="avatar-section">
          <div className="avatar-preview-container">
            <div className="avatar-preview">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  <span className="placeholder-icon">👤</span>
                </div>
              )}
            </div>
            <label className="avatar-upload-btn">
              <span>Upload Avatar</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden-input"
                required
                disabled={loading}
              />
            </label>
            <p className="upload-hint">Max 3MB • JPG, PNG, GIF</p>
          </div>
        </div>

        <input
          type="text"
          onChange={handleChange}
          name="username"
          value={formData.username}
          placeholder="Username"
          required
          disabled={loading}
          minLength="3"
          maxLength="100"
        />

        <input
          type="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
          placeholder="Password"
          required
          disabled={loading}
          minLength="6"
        />

        <button type="submit" disabled={loading}>
          {loading ? (
            <ScaleLoader
              color="#ffffff"
              height={15}
              width={2}
              radius={2}
              margin={2}
            />
          ) : (
            "Create Account"
          )}
        </button>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
