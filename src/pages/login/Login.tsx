import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Registration from "../../components/Register";
import "./login.css";

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
  const [showRegistrationModal, setShowRegistrationModal] =
    useState<boolean>(false);

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

  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  return (
    <div className="login__container">
      {loggedIn ? (
        <p>You are logged in.</p>
      ) : (
        <div>
          <form onSubmit={handleLogin} className="login__form">
            <input
              className="login__input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            <input
              className="login__input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
            <button className="button login__button" type="submit">
              Login
            </button>
          </form>

          <div className="login__register">
            <p className="login__register--text">Don't have an account yet?</p>
            <button onClick={openRegistrationModal} className="modal__button">
              Create an account
            </button>
          </div>
        </div>
      )}

      {showRegistrationModal && (
        <div className="registration-modal">
          <div className="registration-modal-content">
            <button onClick={closeRegistrationModal} className="close-button">
              <i className="bx bx-x"></i>
            </button>
            <Registration />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
