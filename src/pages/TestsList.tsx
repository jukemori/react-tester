import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function TestsList() {
  const [project, setProject] = useState([]);
  const [testName, setTestName] = useState("");
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
  }, []);

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const createTest = () => {
    axios
      .post(
        `http://localhost:8000/api/projects/${projectID}/tests`,
        {
          name: testName,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setTests((prevTests) => [...prevTests, response.data]);
        setTestName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTest = (testId) => {
    console.log("Deleting test with ID:", testId);
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

  return (
    <div>
      <h1>{project.name}</h1>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            <Link to={`/projects/${projectID}/tests/${test.id}`}>
              <p>{test.name}</p>
            </Link>
            <button onClick={() => deleteTest(test.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Test Name"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
      />

      <button onClick={createTest}>Add test</button>
    </div>
  );
}

export default TestsList;
