import axios from "../../utils/api";
import {
  FETCH_CART_DETAILS,
  INITIALIZE_BILLING_FORM_VALIDATION,
  INITIALIZE_SHIPPING_FORM_VALIDATION,
  INITIALIZE_PRODUCT_FORM_VALIDATION,
  VALIDATION_SUCCESS,
  VALIDATION_FAILURE,
  UPDATE_PRODUCT_LIST_DATA,
  UPDATE_TMP_LIST_DATA,
  ADD_NEW_LINE_ITEM
} from "../types";

export const fetchCartDetails = () => async dispatch => {
  const res = await axios("/cart", "get");
  let newData = res[0];
  newData.products.map(
    item => (item.uniqueId = Math.floor(100000 + Math.random() * 900000))
  );

  dispatch({
    type: FETCH_CART_DETAILS,
    payload: newData
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
      type: VALIDATION_SUCCESS
    });
  }
};

export const valiationFailedWithErrors = () => dispatch => {
  dispatch({
    type: VALIDATION_FAILURE,
    payload: true
  });
};

export const updateTmpListData = data => (dispatch, getState) => {
  let oldData = getState().cart.tmpProductListData || [];
  let newData = [...oldData, data];
  dispatch({
    type: UPDATE_TMP_LIST_DATA,
    payload: newData
  });
};

export const updateProductListData = id => (dispatch, getState) => {
  let oldData = getState().cart.products;
  let newData = oldData.filter(item => item.productId != id);

  dispatch({
    type: UPDATE_PRODUCT_LIST_DATA,
    payload: newData
  });
};

export const addNewProductLineItem = () => (dispatch, getState) => {
  let oldData = getState().cart.products || {};

  let newData = [
    ...oldData,
    {
      uniqueId: Math.floor(100000 + Math.random() * 900000),
      unsavedItem: true
    }
  ];

  dispatch({
    type: ADD_NEW_LINE_ITEM,
    payload: newData
  });
};

export const saveNewProductItem = data => (dispatch, getState) => {
  let updatedData = {};
  updatedData.productId = parseInt(data.productId);
  updatedData.productName = data.productName;
  updatedData.productQty = parseInt(data.productQty);
  updatedData.productPrice = parseInt(data.productPrice);
  updatedData.productNotes = data.productNotes;
  updatedData.uniqueId = Math.floor(100000 + Math.random() * 900000);

  var oldData = getState().cart.products || [];

  if (oldData.length > 0) {
    oldData = oldData.filter(item => !item.unsavedItem);
  }
  let newData = [...oldData, updatedData];

  dispatch({
    type: UPDATE_PRODUCT_LIST_DATA,
    payload: newData
  });
};
