import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import Papa from 'papaparse';

interface ResultsTableProps {
  data: any[];
  darkMode: boolean;
}

declare module 'react-table' {
    export interface TableInstance<D extends object = {}> extends UsePaginationInstanceProps<D>, UsePaginationState<D> {}
    export interface TableState<D extends object = {}> extends UsePaginationState<D> {}
  }
const ResultsTable: React.FC<ResultsTableProps> = ({ data, darkMode }) => {
  const columns = useMemo(() => {
    if (data.length === 0) {
      return [
        {
          Header: 'No Data',
          accessor: 'noData',
        },
      ];
    }
    return Object.keys(data[0]).map(key => ({
      Header: key,
      accessor: key,
    }));
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const exportToCSV = () => {
    if (data.length === 0) {
      alert('No data available to export.');
      return;
    }
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'query_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (data.length === 0) {
    return <div className="no-results">No results to display</div>;
  }

  return (
    <div className={`results-container ${darkMode ? 'dark' : ''}`}>
      <div className="export-actions">
        <button onClick={exportToCSV} aria-label="Export results to CSV">
          Export to CSV
        </button>
      </div>

      <div className="table-wrapper">
        <table {...getTableProps()}>
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
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="pagination">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            aria-label="Go to first page"
          >
            {'<<'}
          </button>{' '}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            aria-label="Go to previous page"
          >
            {'<'}
          </button>{' '}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            aria-label="Go to next page"
          >
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            aria-label="Go to last page"
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            aria-label="Select page size"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;