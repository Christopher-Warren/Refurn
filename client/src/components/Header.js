import React, { useContext } from "react";
import { AuthContext, AdminContext } from "../App";

import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const auth = useContext(AuthContext);
  const { admin, setAdmin } = useContext(AdminContext);

  // admin id is 5f84ddd76c5aa621a4448718
  //const admin = "5f8bb02eda6cf40017de82da";
  // Gets user data and sets state
  // Renders Login/logout button at right of nav
  const renderLogin = () => {
    switch (auth) {
      case null:
        return (
          <div className="spinner-border text-light mr-4" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        );
      case false || undefined:
        return (
          <div>
            <a
              className="btn btn-light"
              href="/auth/google"
              role="button"
              style={{ textTransform: "none" }}
            >
              <img
                width="20px"
                style={{ marginBottom: "3px", marginRight: "5px" }}
                alt="Google sign-in"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
              Login with Google
            </a>
          </div>
        );

      case "5f8bb02eda6cf40017de82da":
        return (
          <div>
            <div>
              <a
                className="btn btn-outline-light"
                href="/api/logout"
                role="button"
                style={{ textTransform: "none" }}
              >
                Logout
              </a>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <a
              className="btn btn-outline-light"
              href="/api/logout"
              role="button"
              style={{ textTransform: "none" }}
            >
              Logout
            </a>
          </div>
        );
    }
  };

  const renderDashboard = () => {
    switch (auth) {
      case "5f8bb02eda6cf40017de82da":
        return (
          <NavLink
            className="nav-link"
            to="/admindashboard"
            activeClassName="active"
          >
            Admin Dashboard
          </NavLink>
        );
      default:
        return (
          <NavLink
            className="nav-link"
            to="/dashboard"
            activeClassName="active"
          >
            Dashboard
          </NavLink>
        );
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{ backgroundColor: "#0cb6c2" }}
    >
      <Link className="navbar-brand mt-2" to="/">
        <img
          src="/refurnv2.png"
          width="50"
          height="50"
          className="mb-2"
          alt="Refurn Logo"
        />
        <h3 className="d-inline">Refurn</h3>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/landing"
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/availiblefurniture">
              Availible Furniture
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/sellerform"
              activeClassName="active"
            >
              Sell Your Furniture
            </NavLink>
          </li>
          <li className="nav-item">{renderDashboard()}</li>
        </ul>
        <button
          onClick={() => {
            console.log(admin);
            setAdmin(!admin);
          }}
          className="btn btn-warning mr-2 text-white"
        >
          TOGGLE ADMIN
        </button>
        <button className="btn btn-warning mr-2 text-white">
          USER / ADMIN
        </button>
        {renderLogin()}
      </div>
    </nav>
  );
};

export default Header;
