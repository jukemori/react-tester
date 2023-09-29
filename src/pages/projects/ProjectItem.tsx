import { Link } from "react-router-dom";

interface ProjectItemProps {
  project: {
    id: number;
    name: string;
  };
  isEditing: boolean;
  projectNames: { [key: number]: string };
  onEdit: (projectId: number) => void;
  onUpdate: (projectId: number) => void;
  onDelete: (projectId: number) => void;
  onNameChange: (projectId: number, newName: string) => void;
  authenticated: boolean; // Receive the authenticated prop
}

function ProjectItem({
  project,
  isEditing,
  projectNames,
  onEdit,
  onUpdate,
  onDelete,
  onNameChange,
  authenticated,
}: ProjectItemProps) {
  return (
    <li key={project.id}>
      {authenticated && isEditing ? (
        <>
          <input
            type="text"
            placeholder="Updated Project Name"
            value={projectNames[project.id] || ""}
            onChange={(e) => onNameChange(project.id, e.target.value)}
          />
          <button onClick={() => onUpdate(project.id)}>Update Name</button>
        </>
      ) : (
        <>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
          {authenticated && (
            <>
              <button onClick={() => onEdit(project.id)}>Edit</button>
              <button onClick={() => onDelete(project.id)}>Delete</button>
            </>
          )}
        </>
      )}
    </li>
  );
}

export default ProjectItem;
