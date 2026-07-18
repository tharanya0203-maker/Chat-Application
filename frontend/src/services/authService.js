import API from "../api/axios";

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/auth/users", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// Get All Users
export const getUsers = async () => {
  const response = await API.get("/auth/users");
  return response.data;
};