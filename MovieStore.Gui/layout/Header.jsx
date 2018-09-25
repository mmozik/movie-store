import React from "react";
import { Link } from "react-router-dom";

import Menu from "./Menu";

const Header = () => (
    <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
                <Link to="/" className="navbar-brand">Movie Store</Link>
            </div>
            <Menu />
        </div>
    </div>
);

export default Header;