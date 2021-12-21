import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Register = ({ handleRegisterClick }) => {
  let { registerUser } = useContext(AuthContext);

  return (
    <>
      <div className="todo-container">
        <h5>REGISTER</h5>
        <form onSubmit={registerUser}>
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
          <div className="password">
            <input
              className="form-control"
              type="password"
              name="confirm"
              placeholder="Confirm"
            />
          </div>
          <div className="submit">
            <input className="btn btn-primary" type="submit" value="Submit" />
          </div>
          <div className="login">
            <button className="btn btn-danger" onClick={handleRegisterClick}>
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
