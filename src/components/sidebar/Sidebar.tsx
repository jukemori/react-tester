import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import SideMenuProjects from "./SideMenuProjects";
import { fetchProjects } from "../../api/projectApi"; // Import the Project type from your API
import Header from "./Header"; // Import the Header component

function SideMenu() {
  const [projects, setProjects] = useState<Project[]>([]); // Specify the type as Project[]
  const [authenticated, setAuthenticated] = useState<boolean>(false); // Specify the type as boolean
  const [username, setUsername] = useState<string>(""); // Specify the type as string
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user is authenticated by accessing the token
        const token = localStorage.getItem("token");
        if (!token) {
          setAuthenticated(false);
          navigate("/");
        } else {
          setAuthenticated(true);
          const response: Project[] = await fetchProjects(token); // Specify the type as Project[]
          setProjects(response);

          // Replace this with your actual username retrieval logic
          const user = localStorage.getItem("user");
          const fetchedUsername = user ? JSON.parse(user).name : null;
          setUsername(fetchedUsername || ""); // Specify the type as string and provide a default value
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
    navigate("/"); // Redirect the user to the login page
  };

  return (
    <div className="side-menu">
      {authenticated && (
        <ul>
          <li>
            <Header username={username} onLogout={handleLogout} />
          </li>
          <li>
            <Link to="/projects">Home</Link>
          </li>
          <SideMenuProjects projects={projects} />
        </ul>
      )}
    </div>
  );
}

export default SideMenu;
