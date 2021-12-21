import React, { useContext } from "react";

// Context
import AuthContext from "../context/AuthContext";

const Login = ({ handleRegisterClick }) => {
  const { loginUser } = useContext(AuthContext);
  return (
    <div className="todo-container">
      <h5>LOG IN</h5>
      <form onSubmit={loginUser}>
        <div className="username">
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="password">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="login">
          <input className="btn btn-success" type="submit" value="Login" />
        </div>
        <div className="register">
          <button className="btn btn-primary" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
