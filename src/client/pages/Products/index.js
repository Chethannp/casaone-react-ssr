import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FlexBox, Div, Button } from "../../../styledComponents/layout";
import TableRow from "../../components/productView";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody
} from "../../../styledComponents/ResponsiveTable";
import {
  updateProductListData,
  valiationFailedWithErrors,
  proceedToNextStep
} from "../../../actions/cart/cart.actions";

const Products = ({
  ProductsList,
  validateForm3,
  proceedNext,
  updateProductListData,
  valiationFailedWithErrors,
  tmpList = []
}) => {
  useEffect(() => {
    if (ProductsList.length === tmpList.length && validateForm3) {
      proceedNext();
    }
  }, [tmpList]);

  //
  const getRows = () => {
    return ProductsList.map(product => (
      <TableRow
        key={product.productId}
        {...product}
        triggerValidation={validateForm3}
        hasErrors={handleErrors}
        handleSuccess={handleValidationSuccess}
      />
    ));
  };

  const handleErrors = () => {
    valiationFailedWithErrors();
  };

  const handleValidationSuccess = data => {
    updateProductListData(data);
  };

  const handleAddProduct = () => {};

  const handleDeleteProduct = () => {};

  return (
    <Div>
      <Table>
        <Thead>
          <Tr>
            <Th scope="col">Product ID</Th>
            <Th scope="col">Product Name </Th>
            <Th scope="col">QTY</Th>
            <Th scope="col">Unit Price</Th>
            <Th scope="col">Total Price</Th>
            <Th scope="col">Notes</Th>
            <Th scope="col">Action</Th>
          </Tr>
        </Thead>
        <Tbody>{getRows()}</Tbody>
      </Table>
      <FlexBox marT20 jcSpaceBetween onClick={handleAddProduct}>
        <Button bg="light">Add Product</Button>
      </FlexBox>
    </Div>
  );
};

const mapStateToProps = state => {
  return {
    tmpList: state.cart.tmpProductListData,
    ProductsList: state.cart.products,
    validateForm3: state.cart.validateForm3
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({
    updateProductListData: data => dispatch(updateProductListData(data)),
    valiationFailedWithErrors: () => dispatch(valiationFailedWithErrors()),
    proceedNext: () => dispatch(proceedToNextStep())
  })
)(Products);
