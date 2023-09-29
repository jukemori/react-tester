import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  fetchTest,
  fetchCodes,
  createCode,
  updateCode,
  deleteCode,
} from "../api/codeApi"; // Import the API functions from your separate file

function CodesList() {
  const [test, setTest] = useState({});
  const [codeName, setCodeName] = useState("");
  const { projectID, testID } = useParams();
  const token = localStorage.getItem("token");
  const [codes, setCodes] = useState([]);
  const [editingCodeId, setEditingCodeId] = useState(null);
  const [updatedCodeBody, setUpdatedCodeBody] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResponse = await fetchTest(projectID, testID, token);
        setTest(testResponse);

        const codesResponse = await fetchCodes(projectID, testID, token);
        setCodes(codesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectID, testID, token]);

  const createNewCode = async () => {
    try {
      const response = await createCode(projectID, testID, codeName, token);
      setCodes((prevCodes) => [...prevCodes, response]);
      setCodeName("");
    } catch (error) {
      console.error(error);
    }
  };

  const updateCodeItem = async (codeId) => {
    try {
      await updateCode(projectID, testID, codeId, updatedCodeBody, token);
      setCodes((prevCodes) =>
        prevCodes.map((code) =>
          code.id === codeId ? { ...code, code_body: updatedCodeBody } : code
        )
      );

      // Reset editing state
      setEditingCodeId(null);
      setUpdatedCodeBody("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCodeItem = async (codeId) => {
    try {
      await deleteCode(projectID, testID, codeId, token);
      setCodes((prevCodes) => prevCodes.filter((code) => code.id !== codeId));
    } catch (error) {
      console.error(error);
    }
  };

  const startEditingCode = (codeId) => {
    setEditingCodeId(codeId);

    // Initialize the updated code body with the current code body
    const codeToEdit = codes.find((code) => code.id === codeId);
    setUpdatedCodeBody(codeToEdit.code_body);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCodeName(inputValue);

    if (inputValue.trim().length === 0) {
      // Clear suggestions if the input is empty
      setSuggestions([]);
      return;
    }

    const words = inputValue.split(" ");
    const lastWord = words[words.length - 1];

    // Add a check to ensure that the last word is not empty before making the API request
    if (lastWord.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    axios
      .get(`http://localhost:8000/api/suggestions?query=${lastWord}`)
      .then((response) => {
        const matchingSuggestions = response.data.filter((suggestion) =>
          suggestion.suggestion_text
            .toLowerCase()
            .startsWith(lastWord.toLowerCase())
        );

        if (matchingSuggestions.length > 0) {
          // Show the matching suggestions
          setSuggestions(matchingSuggestions);
        } else {
          // Clear suggestions if no matches
          setSuggestions([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const selectSuggestion = (suggestion) => {
    setCodeName((prevCodeName) => {
      const words = prevCodeName.split(" ");
      words[words.length - 1] = suggestion.suggestion_text;
      return words.join(" ");
    });
    setSuggestions([]);
  };

  return (
    <div>
      <h1>{test.name}</h1>
      <ul>
        {codes.map((code) => (
          <li key={code.id}>
            {editingCodeId === code.id ? (
              <>
                <input
                  type="text"
                  placeholder="Updated Code"
                  value={updatedCodeBody}
                  onChange={(e) => setUpdatedCodeBody(e.target.value)}
                />
                <button onClick={() => updateCodeItem(code.id)}>Update</button>
              </>
            ) : (
              <>
                {code.code_body}
                <button onClick={() => deleteCodeItem(code.id)}>Delete</button>
                <button onClick={() => startEditingCode(code.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Code Name"
        value={codeName}
        onChange={handleInputChange}
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion.suggestion_text}
            </li>
          ))}
        </ul>
      )}

      <button onClick={createNewCode}>Add code</button>
    </div>
  );
}

export default CodesList;
