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
    const fetchData = async () => {
      try {
        // Fetch test data
        const testResponse = await axios.get(
          `http://localhost:8000/api/projects/${projectID}/tests/${testID}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setTest(testResponse.data);

        // Fetch associated codes
        const codesResponse = await axios.get(
          `http://localhost:8000/api/projects/${projectID}/tests/${testID}/codes`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setCodes(codesResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectID, testID, token]); // Added dependencies to re-run the effect when IDs or token change

  const createCode = () => {
    console.log(
      "Creating code with projectID:",
      projectID,
      "and testID:",
      testID
    );
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
            {code.code_body}
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

      <button onClick={createCode}>Add code</button>
    </div>
  );
}

export default CodesList;
