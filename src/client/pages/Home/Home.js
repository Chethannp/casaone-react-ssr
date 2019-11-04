/**
 * React Imports
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Redux and Thunk Imports
 */
import { connect } from "react-redux";
import {
  fetchCartDetails,
  initializeValidation
} from "../../../actions/cart/cart.actions";

/**
 * Styled Component Imports
 */
import {
  Container,
  FlexBox,
  FlexBoxMob,
  Button
} from "../../../styledComponents/layout";

/**
 * Other Components / Pages
 */
import BillingDetails from "../Billing";
import ShippingDetails from "../Shipping";
import Products from "../Products";
import CustomToast from "../../components/toast";

/**
 * @function HomePage - Functional Component
 * @param {initializeValidation} callback - Triggers / Initiates step by step validation
 * @param {validationComplete} callback - On Validation success, logs the out json to console
 * @param {finalFormData} object - Contains the validated form object of the respective components (Billing, Shipping and Product)
 * @param {isUnsavedListPresent} boolean - Need to disable save button
 * @param {productList} param0 - Need to disable save button, User must not be able to Save, if the product list length is empty
 * @returns {component}
 */
const HomePage = ({
  initializeValidation,
  validationComplete,
  finalFormData,
  isUnsavedListPresent = false,
  productList = [],
  toastMessage = ""
}) => {
  //Finally the expected out gets printed on to the console :)
  useEffect(() => {
    if (validationComplete) {
      console.log(finalFormData);
    }
  }, [validationComplete]);

  //Initializes validation on all the children components
  const handleSave = () => {
    initializeValidation();
  };

  return (
    <Container>
      <CustomToast toastMessage={toastMessage} />
      <FlexBoxMob bg="white" marT20 marB30 boxShadow="lightGrey" borderRadius>
        <BillingDetails />
        <ShippingDetails />
      </FlexBoxMob>

      <FlexBox bg="white" pad20 boxShadow="lightGrey" borderRadius>
        <Products />
      </FlexBox>
      <FlexBox pad20 bg="white" Z boxShadow="lightGrey" jcEnd>
        <Button
          bg="light"
          onClick={handleSave}
          disabled={isUnsavedListPresent || productList.length === 0}
        >
          Save
        </Button>
      </FlexBox>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart.list,
    validationComplete: state.cart.validationComplete,
    finalFormData: state.cart.formData,
    isUnsavedListPresent: state.cart.isUnsavedListPresent,
    productList: state.cart.products,
    toastMessage: state.cart.toastMessage
  };
}

function loadData(store) {
  return store.dispatch(fetchCartDetails());
}

export default {
  loadData,
  component: connect(
    mapStateToProps,
    {
      fetchCartDetails,
      initializeValidation
    }
  )(HomePage)
};

HomePage.propTypes = {
  initializeValidation: PropTypes.func,
  validationComplete: PropTypes.bool,
  finalFormData: PropTypes.object,
  isUnsavedListPresent: PropTypes.bool,
  productList: PropTypes.array
};
