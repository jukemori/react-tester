import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function TestsList() {
  const [project, setProject] = useState([]);
  const { projectID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/projects/${projectID}`)
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
      .get(`http://localhost:8000/api/projects/${projectID}/tests`)
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteTest = (testId) => {
    console.log("Deleting test with ID:", testId);
    axios
      .delete(`http://localhost:8000/api/projects/${projectID}/tests/${testId}`)
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
    </div>
  );
}

export default TestsList;
