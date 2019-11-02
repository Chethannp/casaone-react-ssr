import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCartDetails } from "../../../actions/cart/cart.actions";

const HomePage = ({ cart }) => {
  return (
    <React.Fragment>
      {cart.map(item => (
        <h3 key={item.id}>{item.name}</h3>
      ))}
    </React.Fragment>
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
      fetchCartDetails
    }
  )(HomePage)
};

HomePage.propTypes = {
  cart: PropTypes.array
};
