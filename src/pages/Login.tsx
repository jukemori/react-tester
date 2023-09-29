import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

interface LogInFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LogInFormData>({
    email: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<{
        user: UserData; // Define the shape of your user data
        token: string;
      }> = await axios.post("http://localhost:8000/api/login", formData);

      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setLoggedIn(true);

      console.log("User logged in:", user);
      console.log("Token:", token);
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
              value={formData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
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
