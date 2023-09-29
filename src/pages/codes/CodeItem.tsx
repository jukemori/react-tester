// CodeItem.js

import React, { useState } from "react";

function CodeItem({ code, isEditing, onUpdate, onDelete, onEdit }) {
  const [updatedCodeBody, setUpdatedCodeBody] = useState(code.code_body);

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder="Updated Code"
            value={updatedCodeBody}
            onChange={(e) => setUpdatedCodeBody(e.target.value)}
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
