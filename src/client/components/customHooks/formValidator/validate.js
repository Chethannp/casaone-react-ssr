/**
 * @function validate
 * @param {values} Object - with key value pairs
 * @returns {errors} - Object with updated erros key
 * Note:- This is a reusable component for form validations
 */

// productId, productName, productQty, productPrice, (productNotes = "");

export default function validate(values, orderDate) {
  const errors = {};

  switch (true) {
    case values.productId != undefined &&
      (values.productId.length == 0 || values.productId.length <= 5):
      errors.productId = "Invalid Product Id";
      break;

    case values.productId != undefined && isNaN(values.productId):
      errors.productId = "In digits please!";
      break;

    case values.productName != undefined &&
      (values.productName || values.productName.length == 0):
      errors.productName = "Product Name is required!";
      break;

    case RegExp(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g).test(
      values.productName
    ):
      errors.productName =
        "Special Characters are not allowed, Please use valid product names!";
      break;

    case values.productQty != undefined &&
      (values.productQty.length == 0 || values.productId.length <= 1):
      errors.productQty = "Quantity is required";
      break;

    case values.productQty != undefined && isNaN(values.productQty):
      errors.productQty = "In digits please!";
      break;

    case values.productPrice != undefined && values.productPrice.length == 0:
      errors.productPrice = "Product price is required";
      break;

    case values.productPrice != undefined && isNaN(values.productPrice):
      errors.productPrice = "In digits please!";
      break;

    case values.firstName != undefined &&
      (values.firstName || values.firstName.length == 0):
      errors.firstName = "First name is required";
      break;

    case RegExp(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g).test(
      values.firstName
    ):
      errors.firstName = "Special Characters are not allowed!";
      break;

    case values.lastName != undefined &&
      (values.lastName || values.lastName.length == 0):
      errors.lastName = "Last name is required";
      break;

    case RegExp(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g).test(
      values.lastName
    ):
      errors.lastName = "Special Characters are not allowed!";
      break;

    case values.address1 != undefined &&
      (values.address1 || values.address1.length == 0):
      errors.address1 = "Address line 1 is required";
      break;

    case values.address2 != undefined &&
      (values.address2 || values.address2.length == 0):
      errors.address2 = "Address line 2 is required";
      break;

    case values.city != undefined && (values.city || values.city.length == 0):
      errors.city = "City is required";
      break;

    case RegExp(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g).test(values.city):
      errors.city = "Special Characters are not allowed!";
      break;

    case values.zipcode != undefined &&
      (values.zipcode.length == 0 || values.zipcode.length <= 5):
      errors.zipcode = "Invalid Zipcode";
      break;

    case values.zipcode != undefined && isNaN(values.zipcode):
      errors.zipcode = "In digits please!";
      break;

    case values.state != undefined &&
      (values.state || values.state.length == 0):
      errors.state = "State is required";
      break;

    case RegExp(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g).test(values.state):
      errors.state = "Special Characters are not allowed!";
      break;

    case values.country != undefined &&
      (values.country || values.country.length == 0):
      errors.country = "Country is required";
      break;

    case RegExp(/[~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g).test(
      values.country
    ):
      errors.country = "Special Characters are not allowed!";
      break;

    case values.date != undefined && (values.date || values.date.length == 0):
      errors.date = "Date is required";
      break;

    case orderDate && orderDate > values.date:
      errors.date = "Delivery date cannot be less than the Ordered date";
      break;

    default:
      break;
  }

  return errors;
}
