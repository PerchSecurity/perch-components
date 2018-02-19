import React from "react";
import PropTypes from "prop-types";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableSortLabel,
  TableRow
} from "material-ui/Table";
import { SearchBar } from "./";

const toggleDirection = direction => (direction === "asc" ? "desc" : "asc");

const toggleSort = (column, prevColumn, prevDirection) =>
  column === prevColumn ? toggleDirection(prevDirection) : "asc";

const HeaderCell = (label, headerPadding) => (
  <TableCell padding={headerPadding} key={label}>
    {label && label.toString().toUpperCase()}
  </TableCell>
);

const SortableHeaderCell = (
  column,
  headerPadding,
  onSort,
  sortColumn,
  sortDirection
) => (
  <TableCell key={column.label} padding={headerPadding}>
    <TableSortLabel
      active={sortColumn === column.sortId}
      direction={sortDirection}
      onClick={() =>
        onSort(
          column.sortId,
          toggleSort(column.sortId, sortColumn, sortDirection)
        )
      }
    >
      {column.label && column.label.toString().toUpperCase()}
    </TableSortLabel>
  </TableCell>
);

const BaseTable = ({
  children,
  columns,
  headerPadding,
  onSearch,
  onSort,
  pagination,
  searchable,
  sortColumn,
  sortDirection
}) => (
  <div>
    {searchable && <SearchBar onChange={onSearch} />}
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(column => {
            if (typeof column === "string") {
              return HeaderCell(column, headerPadding);
            } else if (!column.sortId) {
              return HeaderCell(column.label);
            }
            return SortableHeaderCell(
              column,
              headerPadding,
              onSort,
              sortColumn,
              sortDirection
            );
          })}
        </TableRow>
      </TableHead>

      <TableBody>{children}</TableBody>

      {pagination && (
        <TableFooter>
          <TableRow>
            <TablePagination
              count={pagination.count}
              rowsPerPage={pagination.rowsPerPage}
              page={pagination.page - 1}
              onChangePage={(e, page) => pagination.onChangePage(page + 1)}
            />
          </TableRow>
        </TableFooter>
      )}
    </Table>
  </div>
);

BaseTable.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        sortId: PropTypes.string
      })
    ])
  ).isRequired,
  headerPadding: PropTypes.string,
  onSearch: PropTypes.func,
  onSort: PropTypes.func,
  pagination: PropTypes.shape({
    count: PropTypes.number, // Total number of rows
    onChangePage: PropTypes.func,
    page: PropTypes.number, // Current page number
    rowsPerPage: PropTypes.number
  }),
  searchable: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string
};

BaseTable.defaultProps = {
  children: [],
  headerPadding: "default",
  onSearch: null,
  onSort: null,
  pagination: null,
  searchable: false,
  sortColumn: null,
  sortDirection: null
};

export default BaseTable;
