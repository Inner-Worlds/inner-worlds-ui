import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./Nav.css" 

const Nav = () => {
    return (
        <header className="nav-bar">
            <NavLink to="/Home">
            <img className="logo" />  
            </NavLink>
        <div className="nav-buttons">
            <NavLink to="/Home" className='nav-button' >
                Home
            </NavLink>
            <NavLink to="/Dreams" className='nav-button'>
                My Dreams
            </NavLink>
        </div>
    </header>
    )
}

export default Nav;
