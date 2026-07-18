import API from "../api/axios";

// Get all messages between logged-in user and selected user
export const getMessages = async (receiver) => {
  const response = await API.get(`/messages/${receiver}`);
  return response.data;
};

// Send a new message
export const sendMessage = async (receiver, text) => {
  const response = await API.post("/messages", {
    receiver,
    text,
  });

  return response.data;
};