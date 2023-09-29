import { Link } from "react-router-dom";

function ProjectItem({
  project,
  isEditing,
  projectNames,
  onEdit,
  onUpdate,
  onDelete,
  onNameChange,
  authenticated, // Receive the authenticated prop
}) {
  return (
    <li key={project.id}>
      {authenticated && isEditing ? ( // Use the authenticated prop here
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
