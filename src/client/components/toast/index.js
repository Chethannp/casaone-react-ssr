/**
 * React Imports
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Redux - Thunk Imports
 * To read state values and to Dispatch an action to the reducer
 */
import { connect } from "react-redux";

/**
 * Styled Component Imports
 */
import styled, { css, keyframes } from "styled-components";
import { showCustomToast } from "../../../actions/cart/cart.actions";

/**
 * Note: These below styles are more specific to this component.
 *       Hence I decided to place it inline rather than
 *       creating a seperate file.
 */
const fadeIn = keyframes`
    from {
        bottom: 0; opacity: 0;
    }
    to {
        bottom: 60px; opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        bottom: 60px; opacity: 1;
    }
    to {
        bottom: 0; opacity: 0;
    }
`;
const ToastWrapper = styled.div`
  visibility: hidden; /* Hidden by default. Visible on click */
  width: 300px; /* Set a default minimum width */
  /* Center the snackbar */
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  bottom: 60px; /* 30px from the bottom */
  ${props =>
    props.showToast &&
    css`
      visibility: visible; /* Show the snackbar */
      /* Add animation: Take 0.5 seconds to fade in and out the snackbar. However, delay the fade out process for 2.5 seconds */
      animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 10s;
      transition: animation 200ms ease-out;
    `}
`;

/**
 * @function CustomToast - Functional Component
 * @param {hideCustomToast} boolean - Decides to show / hide the component
 * @param {toastMessage} string - Holds the message of the toast
 * @returns {component}
 */
const CustomToast = ({ hideCustomToast, toastMessage = "" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      hideCustomToast("");
    }, 3000);
    return () => clearTimeout(timer); // To avoid memory leak
  }, [toastMessage]);

  return (
    <ToastWrapper data-test="toastComponent" showToast={toastMessage}>
      {toastMessage}
    </ToastWrapper>
  );
};

export default connect(
  null,
  dispatch => ({
    hideCustomToast: message => dispatch(showCustomToast(message))
  })
)(CustomToast);

CustomToast.propTypes = {
  hideCustomToast: PropTypes.func,
  toastMessage: PropTypes.string
};
