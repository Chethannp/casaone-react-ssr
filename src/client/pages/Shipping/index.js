/**
 * React Imports
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * Redux and Thunk Imports
 */
import { connect } from "react-redux";
import {
  proceedToNextStep,
  valiationFailedWithErrors
} from "../../../actions/cart/cart.actions";

/**
 * Custom Reusable Component Imports
 */
import AddressForm from "../../components/addressForm";

/**
 * @function ShippingDetails - Function Component
 * @param {shippingAddress} array - contains an array of field input values
 * @param {validateForm2} boolean - Redux state, specifies to initiate validation inside the component
 * @param {valiationFailedWithErrors} callback - Dispatch action to redux and inform it to stop validation execution as the component has resulted in an error
 * @param {proceedNext} callback - Dispatches an action to redux to proceed on to the next step in the validation process
 * @param {orderDate} string - Contains the ordered date, Need this to vaidate the expected delivery date
 *  @return {component} - Billing Address form UI
 */
const ShippingDetails = ({
  shippingAddress,
  validateForm2,
  valiationFailedWithErrors,
  proceedNext,
  orderDate
}) => {
  const {
    firstname,
    lastname,
    address1,
    address2,
    city,
    zipcode,
    state,
    country,
    date
  } = shippingAddress;

  const handleErrors = () => {
    valiationFailedWithErrors();
  };

  const handleValidationSuccess = (form, data) => {
    proceedNext(form, data);
  };

  return (
    <AddressForm
      title="Shipping Address"
      dateText="Expected Delivery"
      firstName={firstname}
      lastName={lastname}
      address1={address1}
      address2={address2}
      city={city}
      zipcode={zipcode}
      state={state}
      country={country}
      date={date}
      form="Shipping Form"
      triggerValidation={validateForm2}
      hasErrors={handleErrors}
      handleSuccess={handleValidationSuccess}
      orderDate={orderDate}
    />
  );
};

const mapStateTopProps = state => {
  return {
    shippingAddress: state.cart.shippingAddress,
    validateForm2: state.cart.validateForm2,
    orderDate:
      (state.cart.formData && state.cart.formData.BillingFormData.date) ||
      state.cart.billingAddress.date
  };
};

export default connect(
  mapStateTopProps,
  dispatch => ({
    valiationFailedWithErrors: () => dispatch(valiationFailedWithErrors()),
    proceedNext: (currentForm, data) =>
      dispatch(proceedToNextStep(currentForm, data))
  })
)(ShippingDetails);

ShippingDetails.propTypes = {
  shippingAddress: PropTypes.object,
  validateForm2: PropTypes.bool,
  valiationFailedWithErrors: PropTypes.func,
  proceedNext: PropTypes.func,
  orderDate: PropTypes.string
};
