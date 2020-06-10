import axios from "axios";

const appUri = process.env.APP_URI;

export const handleRegister = async (login, password, confirmPassword) => {
  try {
    const response = await axios.post(`${appUri}/api/register`, {
      login,
      password,
      confirmPassword,
    });
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleLogin = async (login, password) => {
  try {
    const response = await axios.post(`${appUri}/api/login`, {
      login,
      password,
    });

    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = async () => {
  try {
    const response = await axios.get(`${appUri}/api/logout`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getChats = async () => {
  try {
    const response = await axios.get(`${appUri}/api/chats`);
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};
