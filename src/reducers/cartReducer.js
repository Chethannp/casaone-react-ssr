import {
  FETCH_CART_DETAILS,
  INITIALIZE_BILLING_FORM_VALIDATION,
  INITIALIZE_SHIPPING_FORM_VALIDATION,
  INITIALIZE_PRODUCT_FORM_VALIDATION,
  VALIDATION_SUCCESS,
  VALIDATION_FAILURE
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_CART_DETAILS: {
      return action.payload;
    }

    case INITIALIZE_BILLING_FORM_VALIDATION: {
      return {
        ...state,
        validateForm1: true
      };
    }

    case INITIALIZE_SHIPPING_FORM_VALIDATION: {
      return {
        ...state,
        formData: { ...state.formData, BillingFormData: action.payload },
        validateForm2: true
      };
    }

    case INITIALIZE_PRODUCT_FORM_VALIDATION: {
      return {
        ...state,
        formData: {
          ...state.formData,
          ShippingFormData: action.payload
        },
        validateForm3: true
      };
    }

    case VALIDATION_SUCCESS: {
      return {
        ...state,
        ProductData: action.payload,
        validationComplete: true
      };
    }

    case VALIDATION_FAILURE: {
      return {
        ...state,
        hasError: action.payload,
        validateForm1: false,
        validateForm2: false,
        validateForm3: false
      };
    }

    default:
      return state;
  }
};
