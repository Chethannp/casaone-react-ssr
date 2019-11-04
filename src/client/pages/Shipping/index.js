import React from "react";
import { connect } from "react-redux";
import AddressForm from "../../components/addressForm";
import {
  proceedToNextStep,
  valiationFailedWithErrors
} from "../../../actions/cart/cart.actions";

const ShippingDetails = ({
  validateForm2,
  shippingAddress,
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
