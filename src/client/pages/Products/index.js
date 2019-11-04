/**
 * React Imports
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Redux and Thunk Imports
 */
import { connect } from "react-redux";
import {
  addNewProductLineItem,
  saveNewProductItem,
  updateProductListData,
  updateTmpListData,
  valiationFailedWithErrors,
  proceedToNextStep
} from "../../../actions/cart/cart.actions";

/**
 * Styled Component Imports
 */
import { FlexBox, Div, Button } from "../../../styledComponents/layout";
import TableRow from "../../components/productRow";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody
} from "../../../styledComponents/ResponsiveTable";

/**
 * @function Products
 * @param {productList} array - Saved Product List
 * @param {validateForm3} boolean - Redux state, specifies to initiate validation inside the component
 * @param {valiationFailedWithErrors} callback - Dispatch action to redux and inform it to stop validation execution as the component has resulted in an error
 * @param {proceedNext} callback - Dispatches an action to redux to proceed on to the next step in the validation process
 * @param {tmpList} array - It is a copy of old and newly added product list, needed to check if the validation is completed on all the rows in the product view so that a success function can be triggered.
 * @param {updateProductListData} callback - delete existing product
 * @param {addNewProductLineItem} callback - Clicking on Add new product will create a new product line item with empty values.
 * @param {updateTmpListData} callback -  Indicates validation success on the respective component
 * @param {saveNewProductItem} callback - saves newly added product line item with data
 */
const Products = ({
  productList = [],
  validateForm3,
  valiationFailedWithErrors,
  proceedNext,
  tmpList = [],
  updateProductListData,
  updateTmpListData,
  addNewProductLineItem,
  saveNewProductItem
}) => {
  //Checks if the productList and tmpList lenght is matching to trigger next step in the validation process
  useEffect(() => {
    if (productList.length === tmpList.length && validateForm3) {
      proceedNext();
    }
  }, [tmpList]);

  //Based on the product list length it either renders a component or a message view.
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

  //Triggers when child component find validation errors
  const handleErrors = () => {
    valiationFailedWithErrors();
  };

  //Triggers when child component does not find any validation erros
  const handleValidationSuccess = data => {
    updateTmpListData(data);
  };

  //Clicking on Add Product button will create a new product line item
  const handleAddNewLineItem = () => {
    addNewProductLineItem();
  };

  //Triggers when user tries to delete the existing/saved product list record
  const handleDeleteProductItem = id => {
    updateProductListData(id);
  };

  //Triggers when user tries to add new product into the product list record
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

Products.propTypes = {
  productList: PropTypes.array,
  validateForm3: PropTypes.bool,
  proceedNext: PropTypes.func,
  tmpList: PropTypes.array,
  valiationFailedWithErrors: PropTypes.func,
  updateProductListData: PropTypes.func,
  updateTmpListData: PropTypes.func,
  addNewProductLineItem: PropTypes.func,
  saveNewProductItem: PropTypes.func
};
