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
 * @function BillingDetails - Function Component
 * @param {billingAddress} array - contains an array of field input values
 * @param {validateForm1} boolean - Redux state, specifies to initiate validation inside the component
 * @param {valiationFailedWithErrors} callback - Dispatch action to redux and inform it to stop validation execution as the component has resulted in an error
 * @param {proceedNext} callback - Dispatches an action to redux to proceed on to the next step in the validation process
 * @return {component} - Billing Address form UI
 */
const BillingDetails = ({
  billingAddress,
  validateForm1,
  valiationFailedWithErrors,
  proceedNext
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
  } = billingAddress;

  //Triggers when child component (Address Form) finds errors
  const handleErrors = () => {
    valiationFailedWithErrors();
  };

  //Triggers when child component (Address Form) finds no errors
  const handleValidationSuccess = (form, data) => {
    proceedNext(form, data);
  };

  return (
    <AddressForm
      title="Billing Address"
      dateText="Order Date"
      firstName={firstname}
      lastName={lastname}
      address1={address1}
      address2={address2}
      city={city}
      zipcode={zipcode}
      state={state}
      country={country}
      date={date}
      form="Billing Form"
      triggerValidation={validateForm1}
      hasErrors={handleErrors}
      handleSuccess={handleValidationSuccess}
    />
  );
};

const mapStateTopProps = state => {
  return {
    billingAddress: state.cart.billingAddress,
    validateForm1: state.cart.validateForm1
  };
};

export default connect(
  mapStateTopProps,
  dispatch => ({
    valiationFailedWithErrors: () => dispatch(valiationFailedWithErrors()),
    proceedNext: (currentForm, data) =>
      dispatch(proceedToNextStep(currentForm, data))
  })
)(BillingDetails);

BillingDetails.propTypes = {
  billingAddress: PropTypes.object,
  validateForm1: PropTypes.bool,
  valiationFailedWithErrors: PropTypes.func,
  proceedNext: PropTypes.func
};
