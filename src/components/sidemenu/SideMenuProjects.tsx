import { Link } from "react-router-dom";

interface SideMenuProjectsProps {
  projects: Project[];
}

function SideMenuProjects({ projects }: SideMenuProjectsProps) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id} className="nav__item">
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default SideMenuProjects;
