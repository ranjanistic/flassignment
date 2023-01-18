import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1>User Management App</h1>
            <h6>
                By{" "}
                <a href="https://github.com/ranjanistic" target="_blank">
                    Priyanshu Ranjan
                </a>
            </h6>
            <hr />
            <div className="links">
                <NavLink to="/" className="link" activeClassName="active" exact>
                    Users
                </NavLink>
                <NavLink to="/add" className="link" activeClassName="active">
                    Add User
                </NavLink>
                <NavLink to="/search" className="link" activeClassName="active">
                    Search
                </NavLink>
                <NavLink to="/mail" className="link" activeClassName="active">
                    Mail
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
