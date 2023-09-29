import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/projects/";

export const fetchTest = async (projectID, testID, token) => {
  const response = await axios.get(
    `${API_BASE_URL}${projectID}/tests/${testID}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const fetchCodes = async (projectID, testID, token) => {
  const response = await axios.get(
    `${API_BASE_URL}${projectID}/tests/${testID}/codes`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const createCode = async (projectID, testID, codeName, token) => {
  const response = await axios.post(
    `${API_BASE_URL}${projectID}/tests/${testID}/codes`,
    {
      code_body: codeName,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const updateCode = async (
  projectID,
  testID,
  codeID,
  updatedCodeBody,
  token
) => {
  await axios.put(
    `${API_BASE_URL}${projectID}/tests/${testID}/codes/${codeID}`,
    {
      code_body: updatedCodeBody,
    },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const deleteCode = async (projectID, testID, codeID, token) => {
  await axios.delete(
    `${API_BASE_URL}${projectID}/tests/${testID}/codes/${codeID}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
