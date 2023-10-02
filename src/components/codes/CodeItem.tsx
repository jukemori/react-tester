import { useState, ChangeEvent } from "react";

function CodeItem({
  code,
  isEditing,
  onUpdate,
  onDelete,
  onEdit,
}: CodeItemProps) {
  const [updatedCodeBody, setUpdatedCodeBody] = useState<string>(
    code.code_body
  );

  const handleCodeBodyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedCodeBody(e.target.value);
  };

  return (
    <li>
      {isEditing ? (
        <div className="code__card">
          <input
            className="item__input"
            type="text"
            placeholder="Updated Code"
            value={updatedCodeBody}
            onChange={handleCodeBodyChange}
          />
          <button onClick={() => onUpdate(updatedCodeBody)}>
            <i className="bx bxs-check-circle icon__check"></i>
          </button>
        </div>
      ) : (
        <div className="code__card">
          <p>{code.code_body}</p>
          <div className="code__buttons">
            <button className="button__icon" onClick={onEdit}>
              <i className="bx bxs-edit-alt icon__edit"></i>
            </button>
            <button className="button__icon" onClick={onDelete}>
              <i className="bx bxs-trash icon__delete"></i>
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default CodeItem;
