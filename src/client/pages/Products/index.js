import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FlexBox, Div, Button } from "../../../styledComponents/layout";
import TableRow from "../../components/productRow";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody
} from "../../../styledComponents/ResponsiveTable";
import {
  addNewProductLineItem,
  saveNewProductItem,
  updateProductListData,
  updateTmpListData,
  valiationFailedWithErrors,
  proceedToNextStep
} from "../../../actions/cart/cart.actions";

const Products = ({
  productList = [],
  validateForm3,
  proceedNext,
  updateTmpListData,
  valiationFailedWithErrors,
  tmpList = [],
  updateProductListData,
  addNewProductLineItem,
  saveNewProductItem
}) => {
  useEffect(() => {
    if (productList.length === tmpList.length && validateForm3) {
      proceedNext();
    }
  }, [tmpList]);

  //
  const getRows = () => {
    if (productList.length > 0) {
      return productList.map((product, i) => (
        <TableRow
          key={product.uniqueId}
          {...product}
          triggerValidation={validateForm3}
          hasErrors={handleErrors}
          handleSuccess={handleValidationSuccess}
          deleteItem={handleDeleteProductItem}
          saveItem={handleSaveNewProductItem}
        />
      ));
    } else {
      return (
        <tr>
          <td colSpan="7">
            <Div boxShadow="lightGrey" pad20 color="danger">
              Please click on add product button to add items to the cart!
            </Div>
          </td>
        </tr>
      );
    }
  };

  const handleErrors = () => {
    valiationFailedWithErrors();
  };

  const handleValidationSuccess = data => {
    updateTmpListData(data);
  };

  const handleAddNewLineItem = () => {
    addNewProductLineItem();
  };

  const handleDeleteProductItem = id => {
    updateProductListData(id);
  };

  const handleSaveNewProductItem = data => {
    saveNewProductItem(data);
  };

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
      <FlexBox marT20 jcSpaceBetween>
        <Button bg="light" onClick={handleAddNewLineItem}>
          Add Product
        </Button>
      </FlexBox>
    </Div>
  );
};

const mapStateToProps = state => {
  return {
    tmpList: state.cart.tmpProductListData,
    productList: state.cart.products,
    validateForm3: state.cart.validateForm3
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({
    addNewProductLineItem: () => dispatch(addNewProductLineItem()),
    saveNewProductItem: data => dispatch(saveNewProductItem(data)),
    updateTmpListData: data => dispatch(updateTmpListData(data)),
    updateProductListData: id => dispatch(updateProductListData(id)),
    valiationFailedWithErrors: () => dispatch(valiationFailedWithErrors()),
    proceedNext: () => dispatch(proceedToNextStep())
  })
)(Products);
