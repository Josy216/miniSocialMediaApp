import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import "./register.css"; // Using same CSS file

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.username || !formData.password) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    try {
      const url = `http://localhost:3000/api/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setSuccess("Login successful!");

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Reset form
      setFormData({ username: "", password: "" });

      // Redirect after success
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    // Optional: Demo credentials for testing
    setFormData({
      username: "demo",
      password: "demopass123",
    });

    // You can also auto-submit if you want
    // handleForm(new Event('submit'));
  };

  return (
    <div className="register-container">
      <h2>Login</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleForm} className="register-form">
        <input
          type="text"
          onChange={handleChange}
          name="username"
          value={formData.username}
          placeholder="Username"
          required
          disabled={loading}
          autoComplete="username"
        />

        <input
          type="password"
          onChange={handleChange}
          value={formData.password}
          name="password"
          placeholder="Password"
          required
          disabled={loading}
          autoComplete="current-password"
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
            "Login"
          )}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
