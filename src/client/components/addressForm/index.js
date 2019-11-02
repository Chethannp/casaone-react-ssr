import React, { useEffect } from "react";

import useForm from "../customHooks/formValidator/useForm";
import validate from "../customHooks/formValidator/validate";

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

const AddressForm = ({
  title,
  dateText,
  firstName,
  lastName,
  address1,
  address2,
  state,
  zipcode,
  country,
  date,
  form,
  triggerValidation,
  hasErrors,
  handleSuccess
}) => {
  const formInputs = {
    firstName: firstName || "",
    lastName: lastName || "",
    address1: address1 || "",
    address2: address2 || "",
    state: state || "",
    zipcode: zipcode || "",
    country: country || "",
    date: date || ""
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
              />
              <FormLabel htmlFor="date">
                <FormLabelName></FormLabelName>
              </FormLabel>
            </FormGroup>
            {errors.date && <FormInputError>{errors.date}</FormInputError>}
          </FormGroupSpacer>

          <button>Submit</button>
        </Form>
      </Div>
    </MultiFormWrapper>
  );
};

export default AddressForm;
