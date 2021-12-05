import React from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import "./style.css";

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="navbar">
      {role === 'admin' && <MdSpaceDashboard className="dashboardLogo" onClick={() => navigate("/dashboard")} />}
      <IoLogOutOutline className="logoutLogo" onClick={logout} />
    </div>
  );
};

export default Navbar;
