import axios from "axios";
import { backendBaseUrl } from "../constants";

export const addInvoice = async (payload) => {
  try {
    const jwToken = localStorage.getItem("mic_jwToken");
    const headers = {
      "Content-Type": "application/json",
      authorization: jwToken,
    };
    const response = await axios.patch(
      `${backendBaseUrl}/add-invoice`,
      payload,
      { headers: headers }
    );
    return response;
  } catch (err) {
    if (err.response && err.response.status === 500) {
      const error = new Error();
      error.status = 500;
      error.message = "You are not logged in";
      throw error;
    }
    throw new Error("Something went wrong try again.");
  }
};

export const getInvoices = async () => {
  try {
    const jwToken = localStorage.getItem("mic_jwToken");
    const headers = {
      "Content-Type": "application/json",
      authorization: jwToken,
    };
    const response = await axios.get(`${backendBaseUrl}/invoices`, {
      headers: headers,
    });
    return response;
  } catch (err) {
    if (err.response && err.response.status === 500) {
      const error = new Error();
      error.status = 500;
      error.message = "You are not logged in";
      throw error;
    }
    throw new Error("Something went wrong try again.");
  }
};
