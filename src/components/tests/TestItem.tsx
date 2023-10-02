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
  const [pendingIsSuccessful, setPendingIsSuccessful] = useState(
    test.is_successful
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTestName(e.target.value);
    onNameChange(test.id, e.target.value); // Notify parent component of name change
  };

  const toggleIsSuccessful = () => {
    // Toggle the UI state only
    const newIsSuccessful = !pendingIsSuccessful;
    setPendingIsSuccessful(newIsSuccessful);
  };

  const handleUpdate = () => {
    // Update the actual data when the "Update" button is clicked
    onIsSuccessfulChange(test.id, pendingIsSuccessful); // Notify parent component of is_successful change
    onUpdate(test.id, testName, pendingIsSuccessful);
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
          <button
            className={`button__toggle ${
              pendingIsSuccessful ? "success-text" : "failed-text"
            }`}
            onClick={toggleIsSuccessful}
          >
            {pendingIsSuccessful ? "Successful" : "Failed"}
          </button>
          <button className="button__update" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <div className="item__card">
          <div className="item__info">
            <Link to={`/projects/${projectID}/tests/${test.id}`}>
              {test.name}
            </Link>
            <p
              className={`item__status ${
                test.is_successful ? "success-text" : "failed-text"
              }`}
            >
              {test.is_successful ? "Success" : "Failed"}
            </p>
          </div>

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
