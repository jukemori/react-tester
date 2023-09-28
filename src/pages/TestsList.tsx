import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function TestsList() {
  const [project, setProject] = useState({});
  const [testNames, setTestNames] = useState({});
  const { projectID } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/projects/${projectID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectID, token]);

  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/projects/${projectID}/tests`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setTests(response.data);
        // Initialize testNames state with test names
        const initialTestNames = {};
        response.data.forEach((test) => {
          initialTestNames[test.id] = test.name;
        });
        setTestNames(initialTestNames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [projectID, token]);

  const createTest = () => {
    axios
      .post(
        `http://localhost:8000/api/projects/${projectID}/tests`,
        {
          name: testNames.newTest, // Use the appropriate key for the input field
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setTests((prevTests) => [...prevTests, response.data]);
        // Clear the input field by resetting its value
        setTestNames((prevTestNames) => ({
          ...prevTestNames,
          newTest: "",
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTest = (testId) => {
    axios
      .delete(
        `http://localhost:8000/api/projects/${projectID}/tests/${testId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // In the TestsList component

  const updateTestName = (testId) => {
    const testNameToUpdate = testNames[testId];
    console.log(testId);

    axios
      .put(
        `http://localhost:8000/api/projects/${projectID}/tests/${testId}`,
        {
          name: testNameToUpdate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setTests((prevTests) =>
          prevTests.map((test) =>
            test.id === testId ? { ...test, name: testNameToUpdate } : test
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>{project.name}</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            <Link to={`/projects/${projectID}/tests/${test.id}`}>
              {test.name}
            </Link>
            <input
              type="text"
              placeholder="New Test Name"
              value={testNames[test.id] || ""}
              onChange={(e) => {
                const updatedTestNames = { ...testNames };
                updatedTestNames[test.id] = e.target.value;
                setTestNames(updatedTestNames);
              }}
            />
            <button onClick={() => updateTestName(test.id)}>Update Name</button>
            <button onClick={() => deleteTest(test.id)}>Delete</button>
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
      <button onClick={createTest}>Add Test</button>
    </div>
  );
}

export default TestsList;
