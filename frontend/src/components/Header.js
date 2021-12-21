import React, { useContext } from "react";
// Context
import AuthContext from "../context/AuthContext";
// CSS
import "./Header.css";
// Router
import { Link } from "react-router-dom";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="header-container">
      <span className="logo">ToDO</span>
      <div>
        <Link className="mr-4" to="/">
          Home
        </Link>
        {user ? (
          <Link to="/login" onClick={logoutUser}>
            Hello, {user.username} - Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
