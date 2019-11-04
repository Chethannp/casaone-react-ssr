/**
 * React Imports
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Styled Component Imports
 */
import {
  Tr,
  Td,
  TableInput,
  TableTextArea,
  TableInputError
} from "../../../styledComponents/ResponsiveTable";
import { Button } from "../../../styledComponents/layout";

/**
 * Custom Hook Imports
 */
import useForm from "../customHooks/formValidator/useForm";
import validate from "../customHooks/formValidator/validate";

/**
 * @function TableRow - Functional Re-usable Component
 * @param {productId} number - product id
 * @param {productName} string - product name
 * @param {productQty} number - product quantity
 * @param {productPrice} number - product price
 * @param {productNotes} string - product string
 * @param {triggerValidation} boolean - Initiates validation inside this component
 * @param {hasErrors} Callback - Triggers the parent function to let redux know that there is a validation error so that it can stop validation execution
 * @param {handleSuccess} Callback - Triggers the parent function to let redux know that validation on this component is successfull and it can proceed with the rest.
 * @param {deleteItem} Callback - custom action used to delete the existing / newly added product list
 * @param {saveItem} Callback - custom action to add new item to the existing product list.
 * @param {unsavedItem} boolean - to handle readonly option and show/hide delete and add button
 * @returns {component}
 */

const TableRow = ({
  productId,
  productName,
  productQty,
  productPrice,
  productNotes = "",
  triggerValidation,
  hasErrors,
  handleSuccess,
  deleteItem,
  saveItem,
  unsavedItem = false
}) => {
  //Need this additional constant to feed into the validator (validate.js)
  const formInputs = {
    productId: productId || "",
    productName: productName || "",
    productQty: productQty || "",
    productPrice: productPrice || "",
    productNotes: productNotes || ""
  };

  //Local state used to store/set totalPrice value
  const [totalPrice, setTotalPrice] = useState(0);

  /**
   * @CustomHook  UseForm
   * @constant {handleChange} - Function => holds the value of a particular input when an onChange event triggers
   * @constant {handleSubmit} - Function => validates form input errors
   * @constant {values} - Object => holds validated form input values
   * @constant {errors} - Object => holds errors specific to inputs
   * @param {submit} - Callback reference
   * @param {validate} - It is a function which validates form inputs
   * @param {formInputs} - It is an object which holds the values of form inputs
   * @returns {Component}
   */
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    formInputs
  );

  //Since I have implemented a step by step authentication process
  //triggervalidation is a boolean from the parent element
  //which informs the child to validate the fields once a specific step is reached.
  useEffect(() => {
    if (triggerValidation) {
      handleSubmit(event);
    }
  }, [triggerValidation]);

  //Listen to errors key from useForm and trigger a has error parent function
  //to stop step by step validation.
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    hasErrors();
  }, [errors]);

  //Once the form is validated and free from errors this function executes and
  //Invokes the parent to take the further step in validation process
  function submit() {
    if (unsavedItem) {
      saveItem(values);
    } else {
      handleSuccess(values);
    }
  }

  //Invokes parent function to delete the exisiting product list
  const handleDelete = id => {
    deleteItem(id);
  };

  //Calculates the total price value by verifying if the input is not a junk value
  useEffect(() => {
    let qty = isNaN(parseInt(values.productQty))
      ? ""
      : parseInt(values.productQty);
    let unitPrice = isNaN(parseInt(values.productPrice))
      ? ""
      : parseInt(values.productPrice);

    if (qty != "" && unitPrice != "") {
      let total = qty * unitPrice;
      setTotalPrice(total);
    }
  }, [values.productQty, values.productPrice]);

  //Triggers when the user tries to click on the already add product list to edit it.
  const alertUser = e => {
    if (e.target.readOnly) {
      alert(
        "Sorry! already added products are read-only, edit mode will be coming soon shortly...! "
      );
    }
  };

  return (
    <Tr>
      <Td scope="row" data-label="Product ID">
        <TableInput
          required
          minLength="1"
          maxLength="6"
          name="productId"
          defaultValue={values.productId}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          readOnly={!unsavedItem}
          onClick={alertUser}
        />
        {errors.productId && (
          <TableInputError>{errors.productId}</TableInputError>
        )}
      </Td>
      <Td scope="row" data-label="Product Name">
        <TableInput
          required
          name="productName"
          defaultValue={values.productName}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          readOnly={!unsavedItem}
          onClick={alertUser}
        />
        {errors.productName && (
          <TableInputError>{errors.productName}</TableInputError>
        )}
      </Td>
      <Td scope="row" data-label="QTY">
        <TableInput
          required
          name="productQty"
          minLength="1"
          maxLength="2"
          defaultValue={values.productQty}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          readOnly={!unsavedItem}
          onClick={alertUser}
        />
        {errors.productQty && (
          <TableInputError>{errors.productQty}</TableInputError>
        )}
      </Td>
      <Td scope="row" data-label="Unit Price">
        <TableInput
          required
          minLength="1"
          maxLength="5"
          name="productPrice"
          defaultValue={values.productPrice}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          readOnly={!unsavedItem}
          onClick={alertUser}
        />
        {errors.productPrice && (
          <TableInputError>{errors.productPrice}</TableInputError>
        )}
      </Td>

      <Td scope="row" data-label="Total Price">
        <TableInput value={totalPrice} type="text" disabled />
      </Td>

      <Td scope="row" data-label="Notes">
        <TableTextArea
          name="productNotes"
          required
          defaultValue={values.productNotes}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          noResize="true"
          readOnly={!unsavedItem}
          onClick={alertUser}
        ></TableTextArea>
      </Td>
      <Td scope="row" data-label="Action">
        {unsavedItem ? (
          <Button bg="danger" onClick={handleSubmit}>
            Add
          </Button>
        ) : (
          <Button
            disabled={unsavedItem ? true : false}
            bg="danger"
            onClick={() => handleDelete(productId)}
          >
            Delete
          </Button>
        )}
      </Td>
    </Tr>
  );
};

export default TableRow;

TableRow.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
  productQty: PropTypes.number,
  productPrice: PropTypes.number,
  productNotes: PropTypes.string,
  triggerValidation: PropTypes.bool,
  hasErrors: PropTypes.func,
  handleSuccess: PropTypes.func,
  deleteItem: PropTypes.func,
  saveItem: PropTypes.func,
  unsavedItem: PropTypes.bool
};
