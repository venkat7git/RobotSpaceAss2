import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://robotspacebackend.onrender.com/signup", {
        username,
        email,
        password,
      });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data || "Unknown error"));
    }
  };
  const onClickLogin = ()=>{
    navigate("/login")
  }

  return (
    <div className="main-container">
    <form onSubmit={handleSignup} className="form-container">
      <h1 className="heading">Signup</h1>
      <div className="input-container">
            <label className="input-label" htmlFor="username">Username</label>
            <input
              className="login-input"
              type="text"
              placeholder="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
        </div>
      <div className="input-container">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div  className="input-container">
        <label className="input-label" htmlFor="password">Password</label>
        <input
        className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          id ="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
      <button className="signup-button" type="submit">Signup</button>
      <p className="create-account-para">
          Already have an account
        </p>
      <button className="create-account-btn" type="button" onClick={onClickLogin}>Login</button>
    </form>
    </div>
  );
};

export default Signup;
