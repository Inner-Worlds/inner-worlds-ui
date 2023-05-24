import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Logo from "../../assets/Inner Worlds - HOME Logo (500 × 300 px).svg";
import "./Nav.css";
import PropTypes from 'prop-types';

const Nav = ({ handleLogOut, currentlyEditing }) => {
  if (!currentlyEditing) {
    return (
      <header className="nav-bar">
        <NavLink to="/home">
          <img src={Logo} className="logo" alt="Inner Worlds" />
        </NavLink>
        <div className="nav-links">
          <NavLink to="/home" className="nav-link1">
            Home
          </NavLink>
          <NavLink to="/dreams" className="nav-link2">
            My Dreams
          </NavLink>
          <NavLink to="/" className="nav-link3" onClick={handleLogOut}>
            Log Out
          </NavLink>
        </div>
      </header>
    );
  } else {
    return (
      <header className="nav-bar">
        <img src={Logo} className="logo" alt="Inner Worlds" />
        <div className="nav-links">
          <NavLink to="/dreams" className="nav-link2">
            My Dreams
          </NavLink>
          <NavLink to="/" className="nav-link3" onClick={handleLogOut}>
            Log Out
          </NavLink>
        </div>
      </header>
    );
  }
};

Nav.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  currentlyEditing: PropTypes.bool.isRequired,
};

export default Nav;
