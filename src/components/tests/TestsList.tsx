import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProject,
  fetchTests,
  createTest,
  deleteTest,
  updateTest,
} from "../../api/testApi";
import TestItem from "./TestItem";
import "./test.css";

function TestsList() {
  const { projectID } = useParams<{ projectID?: string }>();
  const token = localStorage.getItem("token");

  const [project, setProject] = useState<{ name: string }>({ name: "" });
  const [testNames, setTestNames] = useState<{ [key: number]: string }>({});
  const [tests, setTests] = useState<Test[]>([]);
  const [editingTestId, setEditingTestId] = useState<number | null>(null);
  const [newTest, setNewTest] = useState<string>("");

  useEffect(() => {
    if (!projectID || !token) {
      return; // Handle the case where projectID is undefined
    }

    const fetchData = async () => {
      try {
        const projectResponse = await fetchProject(+projectID, token);
        setProject(projectResponse);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [projectID, token]);

  useEffect(() => {
    if (!projectID) {
      return; // Handle the case where projectID is undefined
    }

    const fetchTestsData = async () => {
      try {
        if (token) {
          const testsResponse: Test[] = await fetchTests(+projectID, token);
          setTests(testsResponse);
          const initialTestNames: { [key: number]: string } = {};
          testsResponse.forEach((test) => {
            initialTestNames[test.id] = test.name;
          });
          setTestNames(initialTestNames);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchTestsData();
    }
  }, [projectID, token]);

  const createNewTest = async () => {
    try {
      if (!projectID) {
        return; // Handle the case where projectID is undefined
      }

      if (token) {
        const response = await createTest(+projectID, newTest, token);
        setTests((prevTests) => [...prevTests, response]);
        setNewTest("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTestItem = async (testId: number) => {
    try {
      if (!projectID) {
        return; // Handle the case where projectID is undefined
      }

      if (token) {
        await deleteTest(+projectID, testId, token);
        setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTestItem = async (
    testId: number,
    newName: string,
    newIsSuccessful: boolean
  ) => {
    try {
      if (!projectID) {
        return; // Handle the case where projectID is undefined
      }

      if (token) {
        await updateTest(+projectID, testId, newName, newIsSuccessful, token);
        setTests((prevTests) =>
          prevTests.map((test) =>
            test.id === testId
              ? { ...test, name: newName, is_successful: newIsSuccessful }
              : test
          )
        );
        setEditingTestId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEditingTest = (testId: number) => {
    setEditingTestId(testId);
    const testNameToEdit = testNames[testId];
    setTestNames({ ...testNames, [testId]: testNameToEdit });
  };

  return (
    <>
      <h1 className="section__title">{project.name}</h1>
      <ul className="item__cards">
        {tests.map((test) => (
          <TestItem
            key={test.id}
            test={test}
            projectID={+projectID!}
            isEditing={editingTestId === test.id}
            onEdit={startEditingTest}
            onUpdate={(testId, newName, newIsSuccessful) => {
              updateTestItem(testId, newName, newIsSuccessful);
            }}
            onDelete={deleteTestItem}
            onNameChange={(testId, newName) => {
              const updatedTestNames = { ...testNames };
              updatedTestNames[testId] = newName;
              setTestNames(updatedTestNames);
            }}
            onIsSuccessfulChange={(testId, newIsSuccessful) => {
              updateTestItem(testId, testNames[testId], newIsSuccessful);
            }}
          />
        ))}
      </ul>

      <div className="item__create">
        <input
          className="item__input--create"
          type="text"
          placeholder="Test Name"
          value={newTest}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewTest(e.target.value);
          }}
        />
        <button className="button" onClick={createNewTest}>
          Add Test
        </button>
      </div>
    </>
  );
}

export default TestsList;
