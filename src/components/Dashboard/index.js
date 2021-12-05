import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./../Navbar";
import "./style.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const StorgeToken = localStorage.getItem("token");
    setToken(StorgeToken);
    const StorgeRole = localStorage.getItem("role");
    setRole(StorgeRole);
    getUsers(StorgeToken);
  }, []);

  const getUsers = async (token) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar role={role} />
      <div className="wrapper">
        {!token ? (
          <h1>
            You are not logeddin yet, so <Link to="/login">login</Link> or
            <Link to="/signup">signup</Link>
          </h1>
        ) : (
          <div className="todosCon">
            {users && (
              <ul className="list">
                {users.map((user) => (
                  <div key={user._id} className="listItem">
                    <li>{user.email}</li>
                    <div>
                      <button
                        className="update"
                        onClick={() => navigate(`/users/${user._id}`)}
                      >
                        Show
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
