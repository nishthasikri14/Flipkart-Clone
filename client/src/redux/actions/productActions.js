import axios from "axios";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_RESET
} from "../constants/productConstant";

const URL = "https://flipkart-clone-hyap.onrender.com";

// Get all products
export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/products`);

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response ? error.response.data : error.message
    });
  }
};

// Get single product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${URL}/product/${id}`);

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data
    });

  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response ? error.response.data : error.message
    });
  }
};

// Reset product details
export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_DETAILS_RESET
  });
};