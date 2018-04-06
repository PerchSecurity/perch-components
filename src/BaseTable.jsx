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
import { Hidden } from "material-ui";
import { withStyles } from "material-ui/styles";
import { SearchBar } from "./";

const toggleDirection = direction => (direction === "asc" ? "desc" : "asc");

const toggleSort = (column, prevColumn, prevDirection) =>
  column === prevColumn ? toggleDirection(prevDirection) : "asc";

const styles = theme => ({
  headerCell: {
    whiteSpace: "nowrap",
    textTransform: "uppercase"
  }
});

const HeaderCell = ({ children, classes, hidden, padding }) => (
  <Hidden {...hidden}>
    <TableCell className={classes.headerCell} padding={padding}>
      {children}
    </TableCell>
  </Hidden>
);

HeaderCell.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  hidden: PropTypes.object,
  padding: PropTypes.string.isRequired
};

HeaderCell.defaultProps = {
  hidden: null
};

const SortableHeaderCell = ({
  children,
  classes,
  hidden,
  padding,
  onSort,
  sortColumn,
  sortDirection,
  sortId
}) => (
  <Hidden {...hidden}>
    <TableCell className={classes.headerCell} padding={padding}>
      <TableSortLabel
        active={sortColumn === sortId}
        direction={sortDirection}
        onClick={() =>
          onSort(sortId, toggleSort(sortId, sortColumn, sortDirection))
        }
      >
        {children}
      </TableSortLabel>
    </TableCell>
  </Hidden>
);

SortableHeaderCell.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  hidden: PropTypes.object,
  onSort: PropTypes.func.isRequired,
  padding: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  sortId: PropTypes.string.isRequired
};

SortableHeaderCell.defaultProps = {
  hidden: null
};

const BaseTable = ({
  children,
  classes,
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
              return (
                <HeaderCell
                  classes={classes}
                  key={column}
                  padding={headerPadding}
                >
                  {column}
                </HeaderCell>
              );
            } else if (!column.sortId) {
              return (
                <HeaderCell
                  classes={classes}
                  hidden={column.hidden}
                  key={column.label}
                  padding={headerPadding}
                >
                  {column.label}
                </HeaderCell>
              );
            }
            return (
              <SortableHeaderCell
                classes={classes}
                hidden={column.hidden}
                key={column.label}
                sortId={column.sortId}
                padding={headerPadding}
                onSort={onSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
              >
                {column.label}
              </SortableHeaderCell>
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
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(BaseTable);
