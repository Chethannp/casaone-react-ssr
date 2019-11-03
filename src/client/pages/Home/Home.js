import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCartDetails,
  initializeValidation
} from "../../../actions/cart/cart.actions";

import { Container, FlexBox, Button } from "../../../styledComponents/layout";

import BillingDetails from "../Billing";
import ShippingDetails from "../Shipping";
import Products from "../Products";

const HomePage = ({
  initializeValidation,
  validationComplete,
  finalFormData
}) => {
  //Finally the expected out gets printed on to the console :)
  useEffect(() => {
    if (validationComplete) {
      console.log(finalFormData);
    }
  }, [validationComplete]);

  const handleSave = () => {
    initializeValidation();
  };
  return (
    <Container>
      <FlexBox bg="white" marT20 marB30 boxShadow="lightGrey" borderRadius>
        <BillingDetails />
        <ShippingDetails />
      </FlexBox>

      <FlexBox bg="white" pad20 boxShadow="lightGrey" borderRadius>
        <Products />
      </FlexBox>
      <FlexBox pad20 bg="white" Z boxShadow="lightGrey" jcEnd>
        <Button bg="light" onClick={handleSave}>
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
    finalFormData: state.cart.formData
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
