import React, { useContext } from "react";
import { AuthContext } from "../App";
import axios from "axios";

const Header = () => {
  const auth = useContext(AuthContext);

  // Gets user data and sets state
  // Renders Login/logout button at right of nav
  const renderLogin = () => {
    switch (auth) {
      case null:
        return;
      case undefined:
        return (
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
        );
      // Admin User 5f7de41f9daf8f52701096ef
      case "5f7de41f9daf8f52701096e":
        return <div>Admin Mode</div>;
      default:
        return (
          <a
            className="btn btn-outline-light"
            href="/api/logout"
            role="button"
            style={{ textTransform: "none" }}
          >
            Logout
          </a>
        );
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#0cb6c2" }}
    >
      <a className="navbar-brand mt-2">
        <img
          src="/refurnv2.png"
          width="50"
          height="50"
          className="mb-2"
          alt="Refurn Logo"
        />
        <h3 className="d-inline">Refurn</h3>
      </a>

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
          <li className="nav-item active">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Availible Furniture
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>

        {renderLogin()}
      </div>
    </nav>
  );
};

export default Header;
//
