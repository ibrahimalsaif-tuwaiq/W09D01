import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const signup = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        email,
        password,
        role: "61a5fb3a975b749e97bb41db",
      });
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="wrapper">
      {!token ? (
        <div className="formCon">
          <h1>Signup</h1>
          {message ? <div className="message">{message}</div> : ""}
          <div className="formInput">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Signup"
            className="submitButton"
            onClick={signup}
          />
          <Link to="/login">if you have an account, login now</Link>
        </div>
      ) : (
        <h1>
          You are already signed up, go to your <Link to="/">todos</Link>
        </h1>
      )}
    </div>
  );
};

export default Signup;
