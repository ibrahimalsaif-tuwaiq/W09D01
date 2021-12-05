import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.result.role.role);
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="wrapper">
      {!token ? (
        <div className="formCon">
          <h1>Login</h1>
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
            value="login"
            className="submitButton"
            onClick={login}
          />
          <Link to="/signup">if you don't have an account, register now</Link>
        </div>
      ) : (
        <h1>
          You are already logged in, go to your <Link to="/">todos</Link>
        </h1>
      )}
    </div>
  );
};

export default Login;
