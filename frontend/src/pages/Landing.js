import React, { useState } from "react";
import Header from "../components/Header";
import Login from "../components/Login";
import Register from "../components/Register";
// CSS
import "./Landing.css";

const Landing = () => {
  let [login, setLogin] = useState(true);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  return (
    <>
      <Header />
      {login && <Login handleRegisterClick={handleRegisterClick} />}
      {!login && <Register handleRegisterClick={handleRegisterClick} />}
    </>
  );
};

export default Landing;
