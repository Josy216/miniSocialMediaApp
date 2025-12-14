import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import "./register.css";

function EditUser() {
  const {id} = useParams()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  useEffect(()=>{

    const getUser=async()=>{
      try {
        const res = await fetch(`https://abhotel.josephteka.com/api/getusers/${id}`);
        const data = await res.json()
        setFormData(data.users)
        
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const url = `https://abhotel.josephteka.com/api/editusers/${id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      
      const data = await res.json();
      console.log(data)
      alert(`you have updated it user`);
      navigate("/");
    } catch (error) {
      alert("something went wrong", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Update user</h2>
      <form onSubmit={handleForm} className="register-form">
        <input
          type="text"
          onChange={handleChange}
          name="name"
          value={formData.name}
          placeholder="name"
          required
        />

        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="email"
          required
        />

        <input
          type="number"
          onChange={handleChange}
          value={formData.phone}
          name="phone"
          placeholder="phone"
          required
        />

        <input
          type="text"
          onChange={handleChange}
          value={formData.image}
          name="image"
          placeholder="image"
          required
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
