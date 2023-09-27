import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );

      const user = response.data.user;

      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true);

      console.log("User logged in:", user);

      navigate("/projects");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      {loggedIn ? (
        <p>You are logged in.</p>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account yet?{" "}
            <button onClick={() => navigate("/register")}>
              Create an account
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
