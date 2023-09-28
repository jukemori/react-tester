import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CodesList() {
  const [test, setTest] = useState([]);
  const [codeName, setCodeName] = useState("");
  const { projectID, testID } = useParams();
  const token = localStorage.getItem("token");
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    console.log("testId", testID);
    console.log("projectId", projectID);
    axios
      .get(`http://localhost:8000/api/projects/${projectID}/tests/${testID}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setTest(response.data);

        // After fetching test data, fetch associated codes
        console.log("testId2", testID);
        axios
          .get(
            `http://localhost:8000/api/projects/${projectID}/tests/${testID}/codes`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((codesResponse) => {
            console.log(codesResponse);
            setCodes(codesResponse.data);
          })
          .catch((codesError) => {
            console.error(codesError);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const createCode = () => {
    axios
      .post(
        `http://localhost:8000/api/projects/${projectID}/tests/${testID}/codes`,
        {
          code_body: codeName,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setCodes((prevCodes) => [...prevCodes, response.data]);
        setCodeName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteCode = (codeId) => {
    console.log("Deleting code with ID:", codeId);
    axios
      .delete(
        `http://localhost:8000/api/projects/${projectID}/tests/${testID}/codes/${codeId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
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
      <input
        type="text"
        placeholder="Code Name"
        value={codeName}
        onChange={(e) => setCodeName(e.target.value)}
      />

      <button onClick={createCode}>Add test</button>
    </div>
  );
}

export default CodesList;
