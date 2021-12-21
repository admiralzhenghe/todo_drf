import { createContext, useState, useEffect } from "react";
// Router
import { useNavigate } from "react-router";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [tokens, setTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")).user
      : null
  );

  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    // Status 200 === "OK"
    if (response.status === 200) {
      let tokens = {
        access: data.access_token,
        refresh: data.refresh_token,
        user: data.user,
      };
      setTokens(tokens);
      setUser(data.user);
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      navigate("/");
    } else {
      alert("Login error!");
    }
  };

  let logoutUser = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let registerUser = async (e) => {
    e.preventDefault();
    let username = e.currentTarget.username.value;
    let password = e.currentTarget.password.value;
    let confirm = e.currentTarget.confirm.value;

    if (password !== confirm) {
      alert("Passwords do not match!");
    } else if (password < 8) {
      alert(
        "This password is too short. It must contain at least 8 characters."
      );
    } else {
      console.log("Registering new user!");
      let response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password1: password,
          password2: confirm,
        }),
      });

      let data = await response.json();
      // If a registration error occurs
      if (!data.user) {
        if (data.username) alert(`${data.username[0]}`);
        else if (data.password1) {
          let message = data.password1.join(" ");
          alert(`${message}`);
        }
      }
      // Otherwise, login the newly registered user
      else {
        let tokens = {
          access: data.access_token,
          refresh: data.refresh_token,
          user: data.user,
        };
        setTokens(tokens);
        setUser(data.user);
        localStorage.setItem("authTokens", JSON.stringify(tokens));
        navigate("/");
      }
    }
    e.target.password.value = "";
    e.target.confirm.value = "";
  };

  let updateToken = async () => {
    if (!user) return setLoading(false);
    console.log("Updating token!");
    let response = await fetch(
      "http://127.0.0.1:8000/api/auth/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: tokens?.refresh }),
      }
    );
    let data = await response.json();
    if (response.status === 200) {
      console.log("Token refreshed!");
      setTokens({ ...tokens, access: data.access });
      localStorage.setItem(
        "authTokens",
        JSON.stringify({ ...tokens, access: data.access })
      );
    } else logoutUser();

    if (loading) {
      console.log("Set loading to false");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let minutes = 1000 * 60 * 4;
    console.log("Four minutes");
    let interval = setInterval(() => {
      if (tokens) {
        updateToken();
      }
    }, minutes);
    return () => {
      console.log("Clearing interval");
      clearInterval(interval);
    };
  }, [tokens, loading]);

  let contextData = {
    user: user,
    tokens: tokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
