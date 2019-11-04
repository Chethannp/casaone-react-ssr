import React, { useState, useEffect } from "react";
import {
  Tr,
  Td,
  TableInput,
  TableTextArea,
  TableInputError
} from "../../../styledComponents/ResponsiveTable";
import { Button } from "../../../styledComponents/layout";
import useForm from "../customHooks/formValidator/useForm";
import validate from "../customHooks/formValidator/validate";

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
  const formInputs = {
    productId: productId || "",
    productName: productName || "",
    productQty: productQty || "",
    productPrice: productPrice || "",
    productNotes: productNotes || ""
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    formInputs
  );

  useEffect(() => {
    if (triggerValidation) {
      handleSubmit(event);
    }
  }, [triggerValidation]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    hasErrors();
  }, [errors]);

  //Invokes the parent function to decide on the rendering component
  function submit() {
    if (unsavedItem) {
      saveItem(values);
    } else {
      handleSuccess(values);
    }
  }

  const handleDelete = id => {
    deleteItem(id);
  };

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
