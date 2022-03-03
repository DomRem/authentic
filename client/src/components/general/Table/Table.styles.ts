import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border: 1px solid black;
  table-layout: fixed;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
    vertical-align: middle;
    word-wrap: break-word;

    :last-child {
      border-right: 0;
    }
  }
`;

export const StyledDataTable = styled.div`
  padding: 1rem 0;
`;

export default StyledTable;