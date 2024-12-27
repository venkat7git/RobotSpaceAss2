import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3007/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data || "Unknown error"));
    }
  };
  const onClickSignUp = ()=>{
    navigate("/signup")
  }

  return (
    <>
      <div className="main-container">
        <form onSubmit={handleLogin} className="form-container">
        <h1 className="heading">Login</h1>
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
        
        
        <button className="login-button" type="submit">Login</button>
        <p className="create-account-para">
          Create an account
        </p>
      <button className="create-account-btn" type="button" onClick={onClickSignUp}>Sign Up?</button>
  
      </form>
      
      
      </div>
      
    </>
    
  );
};

export default Login;
