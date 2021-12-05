import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./../Navbar";

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

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#D11A2A",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#D11A2A",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getUsers(token);
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#457B9D",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "The user is safe :)",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#457B9D",
        });
      }
    });
  };

  return (
    <>
      <Navbar role={role} page="Dashboard" />
      <div className="wrapper">
        {!token ? (
          <h1>
            You are not logeddin yet, so <Link to="/login">login</Link> or
            <Link to="/signup">signup</Link>
          </h1>
        ) : (
          <div className="ItemsCon">
            {users && (
              <ul className="list">
                {users.map((user) => (
                  <div key={user._id} className="listItem">
                    <li>{user.email}</li>
                    <div>
                      <button
                        className="add"
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
