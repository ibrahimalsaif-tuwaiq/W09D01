import React from "react";
import { Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import './App.css'
require('dotenv').config()

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/users/:userId" element={<User />} />
      </Routes>
    </>
  );
};

export default App;
