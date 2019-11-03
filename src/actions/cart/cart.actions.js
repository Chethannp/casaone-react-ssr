import axios from "../../utils/api";
import {
  FETCH_CART_DETAILS,
  INITIALIZE_BILLING_FORM_VALIDATION,
  INITIALIZE_SHIPPING_FORM_VALIDATION,
  INITIALIZE_PRODUCT_FORM_VALIDATION,
  VALIDATION_SUCCESS,
  VALIDATION_FAILURE
} from "../types";

export const fetchCartDetails = () => async dispatch => {
  const res = await axios("/cart", "get");
  dispatch({
    type: FETCH_CART_DETAILS,
    payload: res[0]
  });
};

export const initializeValidation = () => dispatch => {
  dispatch({
    type: INITIALIZE_BILLING_FORM_VALIDATION,
    payload: true
  });
};

export const proceedToNextStep = (currentForm, data) => dispatch => {
  if (currentForm == "Billing Form") {
    dispatch({
      type: INITIALIZE_SHIPPING_FORM_VALIDATION,
      payload: data
    });
  } else if (currentForm == "Shipping Form") {
    dispatch({
      type: INITIALIZE_PRODUCT_FORM_VALIDATION,
      payload: data
    });
  } else {
    dispatch({
      type: VALIDATION_SUCCESS,
      payload: data
    });
  }
};

export const valiationFailedWithErrors = () => dispatch => {
  dispatch({
    type: VALIDATION_FAILURE,
    payload: true
  });
};