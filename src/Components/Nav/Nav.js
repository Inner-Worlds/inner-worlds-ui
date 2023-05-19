import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Logo from "../../assets/Inner Worlds - HOME Logo (500 × 300 px).svg";
import "./Nav.css";

const Nav = ({ handleLogOut }) => {
  return (
    <header className="nav-bar">
      <NavLink to="/Home">
        <img src={Logo} className="logo" alt="Inner Worlds" />
      </NavLink>
      <div className="nav-links">
        <NavLink to="/Home" className="nav-link1">
          Home
        </NavLink>
        <NavLink to="/Dreams" className="nav-link2">
          My Dreams
        </NavLink>
        <NavLink to="/" className="nav-link3" onClick={handleLogOut}>
          Log Out
        </NavLink>
      </div>
    </header>
  );
};

export default Nav;
