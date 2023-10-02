import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

const TestItem: React.FC<TestItemProps> = ({
  test,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  projectID,
  onNameChange,
  onIsSuccessfulChange,
}) => {
  const [testName, setTestName] = useState(test.name);
  const [isSuccessful, setIsSuccessful] = useState(test.is_successful);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTestName(e.target.value);
    onNameChange(test.id, e.target.value); // Notify parent component of name change
  };

  const handleIsSuccessfulChange = () => {
    const newIsSuccessful = !isSuccessful;
    setIsSuccessful(newIsSuccessful);
    onIsSuccessfulChange(test.id, newIsSuccessful); // Notify parent component of is_successful change
  };

  const handleUpdate = () => {
    onUpdate(test.id, testName, isSuccessful);
  };

  return (
    <li key={test.id}>
      {isEditing ? (
        <div className="item__card">
          <input
            className="item__input"
            type="text"
            placeholder="Updated Test Name"
            value={testName}
            onChange={handleNameChange}
          />
          <label>
            <input
              type="checkbox"
              checked={isSuccessful}
              onChange={handleIsSuccessfulChange}
            />
            Successful
          </label>
          <button className="button__icon" onClick={handleUpdate}>
            <i className="bx bxs-check-circle icon__check"></i>
          </button>
        </div>
      ) : (
        <div className="item__card">
          <Link to={`/projects/${projectID}/tests/${test.id}`}>
            {test.name}
          </Link>
          <p>{test.is_successful ? "Success" : "Failed"}</p>

          <div className="item__buttons">
            <button className="button__icon" onClick={() => onEdit(test.id)}>
              <i className="bx bxs-edit-alt icon__edit"></i>
            </button>
            <button className="button__icon" onClick={() => onDelete(test.id)}>
              <i className="bx bxs-trash icon__delete"></i>
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TestItem;
