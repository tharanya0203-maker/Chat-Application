// Save Token
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove Token
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Save Username
export const saveUsername = (username) => {
  localStorage.setItem("username", username);
};

// Get Username
export const getUsername = () => {
  return localStorage.getItem("username");
};

// Remove Username
export const removeUsername = () => {
  localStorage.removeItem("username");
};

// Clear All Authentication Data
export const clearStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};