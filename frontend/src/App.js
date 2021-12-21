import "./App.css";
// Context
import { AuthProvider } from "./context/AuthContext";
// Pages
import Landing from "./pages/Landing";
import Todo from "./pages/Todo";
// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Utils
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<Landing />} path="/login" />
            <Route
              element={
                <ProtectedRoute redirect="/login">
                  <Todo />
                </ProtectedRoute>
              }
              path=""
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
