import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}auth/`;

export const login = async (user) => {
  try {
    const response = await axios.post(`${API_URL}login`, user);
    const token = response.data.token;
    const userData = response.data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    return response;
  } catch (error) {
    console.error("Login error:", error.response.data);
    return error.response;
  }
};


export const signUp = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}register`, newUser);
    return response;
  } catch (error) {
    console.error("Sign-up error:", error.response.data);
    return error.response;
  }
};

export const logout = async () => {
  console.log("Logout");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!token || !user) {
    console.warn("No user is logged in.");
    return;
  }

  try {
    const response = await axios.post(`${API_URL}logout/${user.username}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.status === 204) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
