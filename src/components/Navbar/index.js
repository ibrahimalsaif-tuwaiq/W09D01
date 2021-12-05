import React from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import "./style.css";

const Navbar = ({ role, page }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return role ? (
    <div className="navbar">
      {page !== "Todos" && (
        <AiFillHome className="homeLogo" onClick={() => navigate("/")} />
      )}
      {page === "Todos" && role === "admin" && (
        <MdSpaceDashboard
          className="dashboardLogo"
          onClick={() => navigate("/dashboard")}
        />
      )}
      <IoLogOutOutline className="logoutLogo" onClick={logout} />
    </div>
  ) : (
    ""
  );
};

export default Navbar;
