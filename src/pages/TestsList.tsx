import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchProject,
  fetchTests,
  createTest,
  deleteTest,
  updateTestName,
} from "../api/testApi"; // Import the API functions from your separate file

function TestsList() {
  const [project, setProject] = useState({});
  const [testNames, setTestNames] = useState({});
  const { projectID } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await fetchProject(projectID, token);
        setProject(projectResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectID, token]);

  const [tests, setTests] = useState([]);
  const [editingTestId, setEditingTestId] = useState(null);

  useEffect(() => {
    const fetchTestsData = async () => {
      try {
        const testsResponse = await fetchTests(projectID, token);
        setTests(testsResponse);
        // Initialize testNames state with test names
        const initialTestNames = {};
        testsResponse.forEach((test) => {
          initialTestNames[test.id] = test.name;
        });
        setTestNames(initialTestNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestsData();
  }, [projectID, token]);

  const createNewTest = async () => {
    try {
      const response = await createTest(projectID, testNames.newTest, token);
      setTests((prevTests) => [...prevTests, response]);
      // Clear the input field by resetting its value
      setTestNames((prevTestNames) => ({
        ...prevTestNames,
        newTest: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTestItem = async (testId) => {
    try {
      await deleteTest(projectID, testId, token);
      setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTestItemName = async (testId) => {
    try {
      const testNameToUpdate = testNames[testId];
      console.log(testId);

      const response = await updateTestName(
        projectID,
        testId,
        testNameToUpdate,
        token
      );
      setTests((prevTests) =>
        prevTests.map((test) =>
          test.id === testId ? { ...test, name: testNameToUpdate } : test
        )
      );

      // Reset editing state
      setEditingTestId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const startEditingTest = (testId) => {
    setEditingTestId(testId);

    // Initialize the updated test name with the current test name
    const testNameToEdit = testNames[testId];
    setTestNames({ ...testNames, [testId]: testNameToEdit });
  };

  return (
    <div>
      <h1>{project.name}</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            {editingTestId === test.id ? (
              <>
                <input
                  type="text"
                  placeholder="Updated Test Name"
                  value={testNames[test.id] || ""}
                  onChange={(e) => {
                    const updatedTestNames = { ...testNames };
                    updatedTestNames[test.id] = e.target.value;
                    setTestNames(updatedTestNames);
                  }}
                />
                <button onClick={() => updateTestItemName(test.id)}>
                  Update Name
                </button>
              </>
            ) : (
              <>
                <Link to={`/projects/${projectID}/tests/${test.id}`}>
                  {test.name}
                </Link>
                <button onClick={() => deleteTestItem(test.id)}>Delete</button>
                <button onClick={() => startEditingTest(test.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Test Name"
        value={testNames.newTest || ""}
        onChange={(e) => {
          setTestNames({ ...testNames, newTest: e.target.value });
        }}
      />
      <button onClick={createNewTest}>Add Test</button>
    </div>
  );
}

export default TestsList;
