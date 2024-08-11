import axios from "axios";

const API_URL = "http://localhost:5000/api/projects/";

export const createProject = async (token, name) => {
  return axios.post(
    API_URL,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getProjects = async (token) => {
  return axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateProject = async (token, id, name) => {
  return axios.put(
    `${API_URL}${id}`,
    { name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const deleteProject = async (token, id) => {
  return axios.delete(`${API_URL}${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
