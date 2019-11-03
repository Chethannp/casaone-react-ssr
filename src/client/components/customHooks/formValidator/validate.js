/**
 * @function validate
 * @param {values} Object - with key value pairs
 * @returns {errors} - Object with updated erros key
 * Note:- This is a reusable component for form validations
 */

export default function validate(values) {
  const errors = {};

  switch (true) {
    case values.firstName != undefined &&
      (values.firstName || values.firstName.length == 0):
      errors.firstName = "First name is required";
      break;

    case values.lastName != undefined &&
      (values.lastName || values.lastName.length == 0):
      errors.lastName = "Last name is required";
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

    case values.country != undefined &&
      (values.country || values.country.length == 0):
      errors.country = "Country is required";
      break;

    case values.date != undefined && (values.date || values.date.length == 0):
      errors.date = "Date is required";
      break;

    default:
      break;
  }

  return errors;
}
