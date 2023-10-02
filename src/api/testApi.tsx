import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8000/api/projects/";

interface Project {
  // Define the structure of a project
  id: number;
  name: string;
  // Add other properties as needed
}

interface Test {
  // Define the structure of a test
  id: number;
  name: string;
  // Add other properties as needed
}

// Fetch project by ID
export const fetchProject = async (
  projectID: number,
  token: string
): Promise<Project> => {
  const response: AxiosResponse<Project> = await axios.get(
    `${API_BASE_URL}${projectID}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

// Fetch tests for a project by project ID
export const fetchTests = async (
  projectID: number,
  token: string
): Promise<Test[]> => {
  const response: AxiosResponse<Test[]> = await axios.get(
    `${API_BASE_URL}${projectID}/tests`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

// Create a new test for a project by project ID
export const createTest = async (
  projectID: number,
  testName: string,
  token: string
): Promise<Test> => {
  const response: AxiosResponse<Test> = await axios.post(
    `${API_BASE_URL}${projectID}/tests`,
    {
      name: testName,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

// Delete a test by project ID and test ID
export const deleteTest = async (
  projectID: number,
  testID: number,
  token: string
): Promise<void> => {
  await axios.delete(`${API_BASE_URL}${projectID}/tests/${testID}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// Update the name of a test by project ID and test ID
export const updateTestName = async (
  projectID: number,
  testID: number,
  testName: string,
  token: string
): Promise<Test> => {
  const response: AxiosResponse<Test> = await axios.put(
    `${API_BASE_URL}${projectID}/tests/${testID}`,
    {
      name: testName,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};
