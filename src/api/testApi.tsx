import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/projects/";

export const fetchProject = async (projectID, token) => {
  const response = await axios.get(`${API_BASE_URL}${projectID}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const fetchTests = async (projectID, token) => {
  const response = await axios.get(`${API_BASE_URL}${projectID}/tests`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export const createTest = async (projectID, testName, token) => {
  const response = await axios.post(
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

export const deleteTest = async (projectID, testID, token) => {
  await axios.delete(`${API_BASE_URL}${projectID}/tests/${testID}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const updateTestName = async (projectID, testID, testName, token) => {
  const response = await axios.put(
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
