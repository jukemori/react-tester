import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:8000/api/projects/";

export const fetchTest = async (
  projectID: number,
  testID: number,
  token: string
): Promise<Test> => {
  const response: AxiosResponse<Test> = await axios.get(
    `${API_BASE_URL}${projectID}/tests/${testID}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const fetchCodes = async (
  projectID: number,
  testID: number,
  token: string
): Promise<Code[]> => {
  const response: AxiosResponse<Code[]> = await axios.get(
    `${API_BASE_URL}${projectID}/tests/${testID}/codes`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return response.data;
};

export const createCode = async (
  projectID: number,
  testID: number,
  codeName: string,
  token: string
): Promise<Code> => {
  const response: AxiosResponse<Code> = await axios.post(
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
  projectID: number,
  testID: number,
  codeID: number,
  updatedCodeBody: string,
  token: string
): Promise<void> => {
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

export const deleteCode = async (
  projectID: number,
  testID: number,
  codeID: number,
  token: string
): Promise<void> => {
  await axios.delete(
    `${API_BASE_URL}${projectID}/tests/${testID}/codes/${codeID}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
