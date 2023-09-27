import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CodesList() {
  const [test, setTest] = useState([]);
  const { projectID, testID } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/projects/${projectID}/tests/${testID}`)
      .then((response) => {
        setTest(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [codes, setCodes] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/projects/${projectID}/tests/${testID}/codes`
      )
      .then((response) => {
        setCodes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteCode = (codeId) => {
    console.log("Deleting code with ID:", codeId);
    axios
      .delete(
        `http://localhost:8000/api/projects/${projectID}/tests/${testID}/codes/${codeId}`
      )
      .then(() => {
        setCodes((prevCodes) => prevCodes.filter((code) => code.id !== codeId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>{test.name}</h1>
      <ul>
        {codes.map((code) => (
          <li key={code.id}>
            <p>{code.code_body}</p>
            <button onClick={() => deleteCode(code.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CodesList;
