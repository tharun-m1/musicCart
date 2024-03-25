import axios from "axios";
import { backendBaseUrl } from "../constants";

export const getUser = async () => {
  try {
    const jwToken = localStorage.getItem("mic_jwToken");
    const headers = {
      "Content-Type": "application/json",
      authorization: jwToken,
    };
    const response = await axios.get(`${backendBaseUrl}/user`, {
      headers: headers,
    });
    return response;
  } catch (err) {
    if (err.response && err.response.status === 500) {
      const error = new Error();
      error.status = 500;
      error.message = "You are not Logged In";
      throw error;
    }
    throw new Error("Something went wrong.");
  }
};
