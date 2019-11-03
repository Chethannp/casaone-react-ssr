import styled, { css } from "styled-components";

const Form = styled.form`
  width: 85%;
  margin: 20px 0;
  display: flex;
  flex-flow: column;
`;

const MultiFormWrapper = styled.div`
  padding: 20px;
  width: 90%;
  margin: 0 auto;
`;

const FormGroupSpacer = styled.div`
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const FormInput = styled.input`
  width: 100%;
  height: 100%;
  color: ${props => props.theme.colors.black};
  padding-top: 23px;
  border: none;
  outline: none;
  &:focus + label span,
  &:valid + label span,
  &:read-only + label span {
    transform: translateY(-100%);
    font-size: 12px;
    color: ${props => props.theme.colors.brandPrimary};
  }
  &:focus + label::after,
  &:valid + label::after,
  &:read-only + label::after {
    transform: translate(0);
  }
`;

const FormLabel = styled.label`
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-bottom: 1px solid black;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-bottom: 3px solid ${props => props.theme.colors.brandPrimary};
    left: 0;
    bottom: -1px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
`;

const FormLabelName = styled.span`
  color: ${props => props.theme.colors.lightGrey};
  font-size: 13px;
  position: absolute;
  bottom: 5px;
  left: 0px;
  transition: all 0.3s ease-out;
`;

const FormInputError = styled.span`
  color: red;
  font-size: 12px;
`;

const AutoCompleteWrapper = styled.ul`
  border: 1px solid #999;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  position: absolute;
  top: 40px;
  width: 95%;
  z-index: 999;
  background: #fff;
`;

const AutoCompleteList = styled.li`
  padding: 0.5rem;
  ${props =>
    props.isSelected &&
    css`
      background: ${props => props.theme.colors.brandPrimary};
      color: #fff;
    `}
  &:hover {
    background-color: ${props => props.theme.colors.brandPrimary};
    color: #fff;
    cursor: pointer;
  }
`;

export {
  Form,
  MultiFormWrapper,
  FormGroup,
  FormGroupSpacer,
  FormInput,
  FormLabel,
  FormLabelName,
  FormInputError,
  AutoCompleteWrapper,
  AutoCompleteList
};
