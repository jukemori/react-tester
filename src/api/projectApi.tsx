import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/projects/";

// Fetch projects
export async function fetchProjects(token) {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Delete project
export async function deleteProject(projectId, token) {
  try {
    await axios.delete(`${API_BASE_URL}${projectId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Update project name
export async function updateProjectName(projectId, newName, token) {
  try {
    const response = await axios.put(
      `${API_BASE_URL}${projectId}`,
      {
        name: newName,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Create project
export async function createProject(newProjectData, token) {
  try {
    const response = await axios.post(API_BASE_URL, newProjectData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
