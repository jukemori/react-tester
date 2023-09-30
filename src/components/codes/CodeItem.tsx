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
        <>
          <input
            type="text"
            placeholder="Updated Code"
            value={updatedCodeBody}
            onChange={handleCodeBodyChange}
          />
          <button onClick={() => onUpdate(updatedCodeBody)}>Update</button>
        </>
      ) : (
        <>
          {code.code_body}
          <button onClick={onDelete}>Delete</button>
          <button onClick={onEdit}>Edit</button>
        </>
      )}
    </li>
  );
}

export default CodeItem;
