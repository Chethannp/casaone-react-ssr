import styled from "styled-components";

const Table = styled.table`
  padding: 10px;
  border-radius: 3px;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
  text-align: center;

  @media screen and (max-width: 767px) {
    border: 0;
  }
`;

const Thead = styled.thead`
  @media screen and (max-width: 767px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

const Tbody = styled.tbody``;

const Th = styled.th`
  font-size: 0.85em;
  letter-spacing: 0.1em;
  padding: 0.625em 0.625em 1.5em 0.625em;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  background-color: #fff;
  padding: 0.35em;
  border-bottom: 1px solid #ddd;

  @media screen and (max-width: 767px) {
    display: block;
    margin-bottom: 0.625em;
    background: whitesmoke;
  }
`;

const Td = styled.td`
  padding: 0.625em;
  text-align: center;

  @media screen and (max-width: 767px) {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`;

const TableInput = styled.input`
  border: 1px solid #dfdfdf;
  outline: none;
  width: 90%;
  padding: 5px 10px;

  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;

const TableTextArea = styled.textarea`
  border: 1px solid #dfdfdf;
  outline: none;
  width: 90%;
  padding: 5px 10px;
  @media screen and (max-width: 767px) {
    width: auto;
  }
`;

const TableInputError = styled.span`
  color: red;
  font-size: 12px;
`;

export {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  TableInput,
  TableTextArea,
  TableInputError
};
