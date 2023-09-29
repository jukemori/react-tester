import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Registration = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [registered, setRegistered] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<{
        user: UserData;
        token: string;
      }> = await axios.post("http://localhost:8000/api/register", formData);

      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setRegistered(true);

      console.log("User registered:", user);
      console.log("Token:", token);

      navigate("/projects");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      {registered ? (
        <p>You are registered.</p>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
          />
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
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default Registration;
