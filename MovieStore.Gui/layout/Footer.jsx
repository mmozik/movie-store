import React from "react";

const Footer = () => (
    <div className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
            <div className="navbar-left">
                <p className="navbar-text small"><span className="glyphicon glyphicon-copyright-mark" /> {(new Date()).getFullYear()} - Movie Store by ADP team</p>
            </div>
        </div>
    </div>
);

export default Footer;