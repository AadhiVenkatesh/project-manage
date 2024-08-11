import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks/";

export const createTask = async (
  token,
  title,
  description,
  status,
  projectId
) => {
  return axios.post(
    API_URL,
    { title, description, status, projectId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getTasks = async (token, projectId) => {
  return axios.get(API_URL, {
    params: { projectId },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (token, id, title, description, status) => {
  return axios.put(
    `${API_URL}${id}`,
    { title, description, status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteTask = async (token, id) => {
  return axios.delete(`${API_URL}${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
