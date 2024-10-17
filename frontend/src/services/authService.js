import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}auth/`;

export const login = async (user) => {
  try {
    const response = await axios.post(`${API_URL}login`, user);
    const token = response.data;
    localStorage.setItem("token", token);
    return response;
  } catch (error) {
    console.error("Login error:", error.response.data);
    return error.response;
  }
};

export const signUp = async (newUser) => {
    try {
      const response = await axios.post(`${API_URL}signup`, newUser);
      return response;
    } catch (error) {
      return error.response;
    }
  };