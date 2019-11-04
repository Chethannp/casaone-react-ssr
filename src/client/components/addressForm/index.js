/**
 * React Imports
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Styled Component Imports
 */
import {
  MultiFormWrapper,
  FormGroupSpacer,
  Form,
  FormGroup,
  FormInput,
  FormLabel,
  FormLabelName,
  FormInputError
} from "../../../styledComponents/form";
import { Div } from "../../../styledComponents/layout";

/**
 * Custom Hook Imports
 */
import useForm from "../customHooks/formValidator/useForm";
import validate from "../customHooks/formValidator/validate";

/**
 * @function AddressForm - Functional Re-usable Component
 * @param {title} string - Section Heading
 * @param {dateText} string - Ordered Date / Expected Delivery Date
 * @param {firstName} string - Form Input
 * @param {lastName} string - Form Input
 * @param {address1} string - Form Input
 * @param {Address2} string - Form Input
 * @param {state} string - Form Input
 * @param {city} string - Form Input
 * @param {zipcode} string - Form Input
 * @param {country} string - Form Input
 * @param {date} string - Form Input
 * @param {orderDate} string - It is derived from ordered date. It is needed to check if ordered date is greater / lesser than the expected delivery date to through validation errors accordingly
 * @param {form} string - Carries which form this component holds (Billing Address / Shipping Address)
 * @param {triggerValidation} boolean - Initiates validation inside this component
 * @param {hasErrors} Callback - Triggers the parent function to let redux know that there is a validation error so that it can stop validation execution
 * @param {handleSuccess} Callback - Triggers the parent function to let redux know that validation on this component is successfull and it can proceed with the rest.
 * @returns  {component}
 */

const AddressForm = ({
  title,
  dateText,
  firstName,
  lastName,
  address1,
  address2,
  state,
  city,
  zipcode,
  country,
  date,
  orderDate,
  form,
  triggerValidation,
  hasErrors,
  handleSuccess
}) => {
  //Need this additional constant to feed into the validator (validate.js)
  const formInputs = {
    firstName: firstName || "",
    lastName: lastName || "",
    address1: address1 || "",
    address2: address2 || "",
    state: state || "",
    city: city || "",
    zipcode: zipcode || "",
    country: country || "",
    date: date || ""
  };

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
    formInputs,
    orderDate
  );

  //Since I have implemented a step by step authentication process
  //triggervalidation is a boolean from the parent element
  //which informs the child to validate the fields once a specific step is reached.
  useEffect(() => {
    if (triggerValidation) {
      handleSubmit(event);
    } else {
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
    handleSuccess(form, values);
  }

  return (
    <MultiFormWrapper>
      <Div fontSize="sm" fontWeight="bold" color="brandSecondary">
        {title}
      </Div>
      <Div width="70%">
        <Form onSubmit={handleSubmit} noValidate>
          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="firstName"
                required
                defaultValue={values.firstName}
                onChange={handleChange}
                type="text"
              />
              <FormLabel htmlFor="firstName">
                <FormLabelName>First Name</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.firstName && (
              <FormInputError>{errors.firstName}</FormInputError>
            )}
          </FormGroupSpacer>
          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="lastName"
                required
                defaultValue={values.lastName}
                onChange={handleChange}
                type="text"
              />
              <FormLabel htmlFor="lastName">
                <FormLabelName>Last Name</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.lastName && (
              <FormInputError>{errors.lastName}</FormInputError>
            )}
          </FormGroupSpacer>
          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="address1"
                required
                defaultValue={values.address1}
                onChange={handleChange}
                type="text"
              />
              <FormLabel htmlFor="address1">
                <FormLabelName>Address line 1</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.address1 && (
              <FormInputError>{errors.address1}</FormInputError>
            )}
          </FormGroupSpacer>

          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="address2"
                required
                defaultValue={values.address2}
                onChange={handleChange}
                type="text"
              />
              <FormLabel htmlFor="address2">
                <FormLabelName>Address line 2</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.address2 && (
              <FormInputError>{errors.address2}</FormInputError>
            )}
          </FormGroupSpacer>

          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="city"
                required
                defaultValue={values.city}
                onChange={handleChange}
                type="text"
              />
              <FormLabel htmlFor="city">
                <FormLabelName>City</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.city && <FormInputError>{errors.city}</FormInputError>}
          </FormGroupSpacer>

          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="zipcode"
                required
                defaultValue={values.zipcode}
                onChange={handleChange}
                type="text"
                pattern="\d*"
                minLength="1"
                maxLength="6"
              />
              <FormLabel htmlFor="zipcode">
                <FormLabelName>Zipcode</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.zipcode && (
              <FormInputError>{errors.zipcode}</FormInputError>
            )}
          </FormGroupSpacer>

          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="state"
                required
                defaultValue={values.state}
                onChange={handleChange}
                type="text"
              />
              <FormLabel htmlFor="state">
                <FormLabelName>State</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.state && <FormInputError>{errors.state}</FormInputError>}
          </FormGroupSpacer>

          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="country"
                required
                defaultValue={values.country}
                onChange={handleChange}
                type="text"
              />
              <FormLabel htmlFor="country">
                <FormLabelName>Country</FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.country && (
              <FormInputError>{errors.country}</FormInputError>
            )}
          </FormGroupSpacer>

          <br />

          <Div fontSize="xs" fontWeight="bold" color="brandSecondary">
            {dateText}
          </Div>

          <FormGroupSpacer>
            <FormGroup>
              <FormInput
                autoComplete="off"
                name="date"
                required
                defaultValue={values.date}
                onChange={handleChange}
                type="date"
                min={orderDate}
              />
              <FormLabel htmlFor="date">
                <FormLabelName></FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.date && <FormInputError>{errors.date}</FormInputError>}
          </FormGroupSpacer>
        </Form>
      </Div>
    </MultiFormWrapper>
  );
};

export default AddressForm;

AddressForm.propTypes = {
  title: PropTypes.string,
  dateText: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  address1: PropTypes.string,
  address2: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  zipcode: PropTypes.string,
  country: PropTypes.string,
  date: PropTypes.string,
  orderDate: PropTypes.string,
  form: PropTypes.string,
  triggerValidation: PropTypes.bool,
  hasErrors: PropTypes.func,
  handleSuccess: PropTypes.func
};
