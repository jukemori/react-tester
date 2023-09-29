import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

// Define the props interface
interface TestItemProps {
  test: { id: number; name: string };
  isEditing: boolean;
  onEdit: (testId: number) => void;
  onUpdate: (testId: number, newName: string) => void;
  onDelete: (testId: number) => void;
  projectID: number;
  onNameChange: (testId: number, newName: string) => void;
}

const TestItem: React.FC<TestItemProps> = ({
  test,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  projectID,
  onNameChange,
}) => {
  const [testName, setTestName] = useState(test.name);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTestName(e.target.value);
    onNameChange(test.id, e.target.value); // Notify parent component of name change
  };

  const handleUpdate = () => {
    onUpdate(test.id, testName);
  };

  return (
    <li key={test.id}>
      {isEditing ? (
        <>
          <input
            type="text"
            placeholder="Updated Test Name"
            value={testName}
            onChange={handleNameChange}
          />
          <button onClick={handleUpdate}>Update Name</button>
        </>
      ) : (
        <>
          <Link to={`/projects/${projectID}/tests/${test.id}`}>
            {test.name}
          </Link>
          <button onClick={() => onDelete(test.id)}>Delete</button>
          <button onClick={() => onEdit(test.id)}>Edit</button>
        </>
      )}
    </li>
  );
};

export default TestItem;
