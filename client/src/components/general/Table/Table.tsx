import React from 'react'
import { useTable } from 'react-table'
import StyledTable, {StyledDataTable} from "./Table.styles";
import {IUser} from "../../../pages/Dashboard/Dashboard";

interface Column {
  Header: string;
}

interface ChildColumn extends Column {
  accessor: string;
}

interface ParentColumn extends Column {
  columns: ChildColumn[]
}



type Props = {
  columns: ParentColumn[],
  data: IUser[],
};

function Table({ columns, data }: Props) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
    <StyledDataTable>
      <StyledTable {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.value || 'x'}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </StyledTable>
    </StyledDataTable>
  )
}

export default Table;