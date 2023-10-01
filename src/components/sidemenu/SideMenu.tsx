import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import SideMenuProjects from "./SideMenuProjects";
import { fetchProjects } from "../../api/projectApi"; // Import the Project type from your API
import userImage from "../../assets/gorilla.jpg";
import "./side-menu.css";

function SideMenu() {
  const [projects, setProjects] = useState<Project[]>([]); // Specify the type as Project[]
  const [authenticated, setAuthenticated] = useState<boolean>(false); // Specify the type as boolean
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user is authenticated by accessing the token
        const token = localStorage.getItem("token");
        if (!token) {
          setAuthenticated(false);
          navigate("/login");
        } else {
          setAuthenticated(true);
          const response: Project[] = await fetchProjects(token); // Specify the type as Project[]
          setProjects(response);

          // Replace this with your actual username retrieval logic
          const user = localStorage.getItem("user");
          const fetchedUser = user ? JSON.parse(user) : null;
          setUser(fetchedUser || ""); // Specify the type as string and provide a default value
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/login"); // Redirect the user to the login page
  };

  return (
    <>
      {authenticated && (
        <div className="side-menu">
          <div>
            <div className="logo"></div>
            <ul>
              <li></li>
              <li>
                <Link to="/projects">Home</Link>
              </li>
              <SideMenuProjects projects={projects} />
            </ul>
          </div>

          <div className="user__container">
            <div className="user__info">
              <img src={userImage} alt="" className="user__img" />
              {user !== null && (
                <div>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              )}
            </div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
}

export default SideMenu;
