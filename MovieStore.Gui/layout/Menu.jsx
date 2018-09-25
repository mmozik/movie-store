import React from "react";
import { Link } from "react-router-dom";

const Menu = () => (
    <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/drag-drop-test">Drag Drop Demo</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    </div>
);

export default Menu;