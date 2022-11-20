import axios from "axios";

const config = (token: any) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

axios.defaults.baseURL = "http://localhost:5000";
// Login a registered user api
export const loginAPI = async (user: any) =>
  await axios.post("/users/login", user);

// Create a new user api
export const createUserAPI = async (user: any) =>
  await axios.post("/users", user);

// Log user out of the application
export const logOutAPI = async (token: any, user: any) =>
  await axios.post("/users/me/logout", user, config(token));

export const getUserAPI = async () => axios.get("/users/me");
