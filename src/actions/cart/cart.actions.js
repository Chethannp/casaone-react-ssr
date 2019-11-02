import axios from "../../utils/api";
import { FETCH_CART_DETAILS } from "../types";

export const fetchCartDetails = () => async dispatch => {
  const res = await axios("/cart", "get");
  dispatch({
    type: FETCH_CART_DETAILS,
    payload: res
  });
};
