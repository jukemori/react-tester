import { NavLink } from "react-router-dom";

interface SideMenuProjectsProps {
  projects: Project[];
}

function SideMenuProjects({ projects }: SideMenuProjectsProps) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id} className="nav__item">
          <NavLink
            to={`/projects/${project.id}`}
            className={({ isActive }) =>
              isActive ? "nav__link active-link" : "nav__link"
            }
          >
            {project.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default SideMenuProjects;
