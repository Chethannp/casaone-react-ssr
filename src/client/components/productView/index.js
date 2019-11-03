import React, { useEffect } from "react";
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
  handleSuccess
}) => {
  const formInputs = {
    productId: productId || "",
    productName: productName || "",
    productQty: productQty || "",
    productPrice: productPrice || "",
    productNotes: productNotes || ""
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    formInputs
  );

  useEffect(() => {
    if (triggerValidation) {
      handleSubmit(event);
    } else {
    }
  }, [triggerValidation]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    hasErrors();
  }, [errors]);

  //Invokes the parent function to decide on the rendering component
  function submit() {
    handleSuccess(values);
  }

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
        />
        {errors.productPrice && (
          <TableInputError>{errors.productPrice}</TableInputError>
        )}
      </Td>

      <Td scope="row" data-label="Total Price">
        <TableInput
          required
          defaultValue={values.productQty * values.productPrice}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          disabled
        />
      </Td>

      <Td scope="row" data-label="Notes">
        <TableTextArea
          required
          defaultValue={values.productNotes}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          noResize="true"
        ></TableTextArea>
      </Td>
      <Td scope="row" data-label="Action">
        <Button bg="danger" onClick={handleSubmit}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default TableRow;
