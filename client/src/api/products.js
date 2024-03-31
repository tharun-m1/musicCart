import axios from "axios";
import { backendBaseUrl } from "../constants";

// export const getProducts

// ======================= Get a product ================================

export const getProduct = async (productId) => {
  try {
    console.log("product id", productId);
    const response = await axios.get(`${backendBaseUrl}/products/${productId}`);
    return response;
  } catch (err) {
    console.log(err);
    const error = new Error();
    if (err.response.status === 404) {
      error.status = 404;
      error.message = "Product not Found";
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
};
// =========================================================================

// ================================ Add product to cart ====================
export const addToCart = async (quantity, productId) => {
  try {
    const jwToken = localStorage.getItem("mic_jwToken");
    if (!jwToken) {
      const error = new Error();
      console.log("no token");
      error.status = 500;
      error.message = "You are not logged in";
      console.log(error.status);
      throw error;
    }
    const payload = {
      newQuantity: quantity,
    };
    const headers = {
      "Content-Type": "application/json",
      authorization: jwToken,
    };
    const response = await axios.patch(
      `${backendBaseUrl}/add-to-cart/${productId}`,
      payload,
      { headers: headers }
    );
    return response;
  } catch (err) {
    console.log("err from api", err);
    const error = new Error();
    if (err.status === 500) {
      error.status = 500;
      throw error;
    }
    if (err.response && err.response.status === 412) {
      error.status = 412;
      error.message = "Maximum items added";
      throw error;
    }
    if (err.response && err.response.status >= 500) {
      error.status = 500;
      throw error;
    } else {
      throw new Error("Something went wrong.");
    }
  }
};

// =========================================================================

// ============================== get all products =========================

export const getProducts = async (filters) => {
  try {
    const response = axios.get(`${backendBaseUrl}/products/filter`, {
      params: filters,
    });
    return response;
  } catch (err) {
    throw new Error("Something went Wrong.");
  }
};

// =========================================================================

export const searchProducts = async (name) => {
  try {
    const response = axios.get(`${backendBaseUrl}/products/search`, {
      params: {
        name,
      },
    });
    return response;
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};
