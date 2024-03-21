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
// ======================================================================
