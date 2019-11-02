import { FETCH_CART_DETAILS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CART_DETAILS: {
      return {
        ...state,
        list: action.payload
      };
    }

    default:
      return state;
  }
};
