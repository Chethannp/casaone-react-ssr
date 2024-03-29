import {
    FETCH_CART_DETAILS,
    INITIALIZE_BILLING_FORM_VALIDATION,
    INITIALIZE_SHIPPING_FORM_VALIDATION,
    INITIALIZE_PRODUCT_FORM_VALIDATION,
    VALIDATION_SUCCESS,
    VALIDATION_FAILURE,
    UPDATE_PRODUCT_LIST_DATA,
    UPDATE_TMP_LIST_DATA,
    ADD_NEW_LINE_ITEM,
    SHOW_CUSTOM_TOAST
} from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
    case FETCH_CART_DETAILS: {
        return action.payload;
    }

    case ADD_NEW_LINE_ITEM: {
        return {
            ...state,
            products: action.payload,
            isUnsavedListPresent: true
        };
    }

    case INITIALIZE_BILLING_FORM_VALIDATION: {
        return {
            ...state,
            validateForm1: true,
            validationComplete: false
        };
    }

    case INITIALIZE_SHIPPING_FORM_VALIDATION: {
        return {
            ...state,
            formData: {
                ...state.formData,
                BillingFormData: action.payload
            },
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

    case UPDATE_PRODUCT_LIST_DATA: {
        return {
            ...state,
            products: action.payload,
            isUnsavedListPresent: false
        };
    }

    case UPDATE_TMP_LIST_DATA: {
        return {
            ...state,
            tmpProductListData: action.payload
        };
    }

    case VALIDATION_SUCCESS: {
        return {
            ...state,
            formData: {
                ...state.formData,
                ProductData: state.tmpProductListData
            },
            hasError: false,
            validateForm1: false,
            validateForm2: false,
            validateForm3: false,
            tmpProductListData: [],
            validationComplete: true
        };
    }

    case VALIDATION_FAILURE: {
        return {
            ...state,
            hasError: action.payload,
            validateForm1: false,
            validateForm2: false,
            validateForm3: false,
            tmpProductListData: []
        };
    }

    case SHOW_CUSTOM_TOAST: {
        return {
            ...state,
            toastMessage: action.payload
        };
    }

    default:
        return state;
    }
};
