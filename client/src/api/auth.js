import axios from "axios";
import { backendBaseUrl } from "../constants.js";
export const register = async (payload) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/signup`, payload);
    return response;
  } catch (err) {
    console.log(err);
    if (err.response && err.response.status === 409) {
      const error = new Error("User already exists.");
      error.status = 409;
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const login = async (payload) => {
  try {
    const response = await axios.post(`${backendBaseUrl}/login`, payload);
    return response;
  } catch (err) {
    const error = new Error();
    if (err.response.status === 404) {
      error.status = 404;
      error.message = "User Not Found ";
      throw error;
    }
    if (err.response.status === 401) {
      error.status = 401;
      error.message = "Incorrect Credentials";
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
};
