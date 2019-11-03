import React from "react";
import { connect } from "react-redux";
import AddressForm from "../../components/addressForm";
import {
  proceedToNextStep,
  valiationFailedWithErrors
} from "../../../actions/cart/cart.actions";

const BillingDetails = ({
  validateForm1,
  billingAddress,
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

  const handleErrors = () => {
    valiationFailedWithErrors();
  };

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
