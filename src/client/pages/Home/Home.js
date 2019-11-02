import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCartDetails,
  initializeValidation
} from "../../../actions/cart/cart.actions";

import { Container, FlexBox } from "../../../styledComponents/layout";

import BillingDetails from "../Billing";
import ShippingDetails from "../Shipping";

const HomePage = ({ initializeValidation }) => {
  const handleSave = () => {
    initializeValidation();
  };

  return (
    <Container>
      <FlexBox bg="white" mar20 boxShadow="lightGrey" borderRadius>
        <BillingDetails />
        <ShippingDetails />
        <button onClick={handleSave}>Save</button>
      </FlexBox>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    cart: state.cart.list
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
  cart: PropTypes.array
};
