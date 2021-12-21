// Context
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Router
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirect }) => {
  let { user } = useContext(AuthContext);
  return !user ? <Navigate to={redirect} /> : children;
};

export default ProtectedRoute;
