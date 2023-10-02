import { Link } from "react-router-dom";

function ProjectItem({
  project,
  isEditing,
  projectNames,
  onEdit,
  onUpdate,
  onDelete,
  onNameChange,
}: ProjectItemProps) {
  return (
    <li key={project.id}>
      {isEditing ? (
        <div className="item__card">
          <input
            className="item__input"
            type="text"
            placeholder="Updated Project Name"
            value={projectNames[project.id] || ""}
            onChange={(e) => onNameChange(project.id, e.target.value)}
          />
          <button className="button__icon" onClick={() => onUpdate(project.id)}>
            <i className="bx bxs-check-circle icon__check"></i>
          </button>
        </div>
      ) : (
        <div className="item__card">
          <Link to={`/projects/${project.id}`}>{project.name}</Link>

          <div className="item__buttons">
            <button className="button__icon" onClick={() => onEdit(project.id)}>
              <i className="bx bxs-edit-alt icon__edit"></i>
            </button>
            <button
              className="button__icon"
              onClick={() => onDelete(project.id)}
            >
              <i className="bx bxs-trash icon__delete"></i>
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default ProjectItem;
