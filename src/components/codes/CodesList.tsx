import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  fetchTest,
  fetchCodes,
  createCode,
  updateCode,
  deleteCode,
} from "../../api/codeApi";
import CodeItem from "./CodeItem";
import "./codes.css";

function CodesList() {
  const { projectID, testID } = useParams<{
    projectID: string;
    testID: string;
  }>();
  const projectIdNumber = parseInt(projectID ?? "0", 10); // Convert to number with default value of 0
  const testIdNumber = parseInt(testID ?? "0", 10); // Convert to number with default value of 0
  const token = localStorage.getItem("token") || "";
  const [test, setTest] = useState<Test>({ id: 0, name: "" });
  const [codes, setCodes] = useState<Code[]>([]);
  const [editingCodeId, setEditingCodeId] = useState<number | null>(null);
  const [codeName, setCodeName] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { id: string; suggestion_text: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResponse = await fetchTest(
          projectIdNumber,
          testIdNumber,
          token
        );
        setTest(testResponse);

        const codesResponse = await fetchCodes(
          projectIdNumber,
          testIdNumber,
          token
        );
        setCodes(codesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectIdNumber, testIdNumber, token]);

  const createNewCode = async () => {
    try {
      const response = await createCode(
        projectIdNumber,
        testIdNumber,
        codeName,
        token
      );
      setCodes((prevCodes) => [...prevCodes, response]);
      setCodeName("");
    } catch (error) {
      console.error(error);
    }
  };

  const updateCodeItem = async (codeId: number, updatedCodeBody: string) => {
    try {
      await updateCode(
        projectIdNumber,
        testIdNumber,
        codeId,
        updatedCodeBody,
        token
      );
      setCodes((prevCodes) =>
        prevCodes.map((code) =>
          code.id === codeId ? { ...code, code_body: updatedCodeBody } : code
        )
      );

      // Reset editing state
      setEditingCodeId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCodeItem = async (codeId: number) => {
    try {
      await deleteCode(projectIdNumber, testIdNumber, codeId, token);
      setCodes((prevCodes) => prevCodes.filter((code) => code.id !== codeId));
    } catch (error) {
      console.error(error);
    }
  };

  const startEditingCode = (codeId: number) => {
    setEditingCodeId(codeId);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setCodeName(inputValue);

    if (inputValue.trim().length === 0) {
      // Clear suggestions if the input is empty
      setSuggestions([]);
      return;
    }

    // Check if the input contains a dot ('.') and a letter after it
    if (/\.([a-zA-Z])/.test(inputValue)) {
      const match = inputValue.match(/\.([a-zA-Z]+)/);
      if (match) {
        const lastWord = match[1];
        // Fetch suggestions based on the letter after the dot
        axios
          .get(`http://localhost:8000/api/suggestions?query=${lastWord}`)
          .then((response) => {
            const matchingSuggestions = response.data.filter(
              (suggestion: { id: string; suggestion_text: string }) =>
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
        return;
      }
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
        const matchingSuggestions = response.data.filter(
          (suggestion: { id: string; suggestion_text: string }) =>
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

  const selectSuggestion = (suggestion: {
    id: string;
    suggestion_text: string;
  }) => {
    setCodeName((prevCodeName) => {
      const words = prevCodeName.split(" ");
      const lastWord = words[words.length - 1];

      if (lastWord.includes(".")) {
        // If the last word contains a dot, replace only the last part (after the last dot)
        const parts = lastWord.split(".");
        parts[parts.length - 1] = suggestion.suggestion_text;
        words[words.length - 1] = parts.join(".");
      } else {
        // Otherwise, replace the entire last word
        words[words.length - 1] = suggestion.suggestion_text;
      }

      return words.join(" ");
    });
    setSuggestions([]);
  };

  return (
    <>
      <div className="codes__list">
        <p className="codes__title">{`test('${test.name}', async function () {`}</p>
        <ul>
          {codes.map((code) => (
            <CodeItem
              key={code.id}
              code={code}
              isEditing={editingCodeId === code.id}
              onUpdate={(updatedCodeBody) =>
                updateCodeItem(code.id, updatedCodeBody)
              }
              onDelete={() => deleteCodeItem(code.id)}
              onEdit={() => startEditingCode(code.id)}
            />
          ))}
        </ul>
        <p>&#125;&#41;;</p>
      </div>
      <div className="code__create">
        <input
          className="code__input--create"
          type="text"
          placeholder="Code Name"
          value={codeName}
          onChange={handleInputChange}
        />
        <button className="button code__button" onClick={createNewCode}>
          Add code
        </button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestion__list">
          {suggestions.map((suggestion) => (
            <li
              className="suggestion__item"
              key={suggestion.id}
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion.suggestion_text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CodesList;
