import React from "react";
import PropTypes from "prop-types";
import {
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableSortLabel,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import { SearchBar, ActionBar } from "./";
import { ActionButtonPropTypes } from "./ActionButton";

const toggleDirection = direction => (direction === "asc" ? "desc" : "asc");

const toggleSort = (column, prevColumn, prevDirection) =>
  column === prevColumn ? toggleDirection(prevDirection) : "asc";

const styles = theme => ({
  fullWidthContainer: {
    width: "100%"
  },
  headerCell: {
    whiteSpace: "nowrap",
    textTransform: "uppercase"
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottom: "2px #D8D8D8 solid"
  },
  grow: {
    flex: 1
  },
  multiBar: {
    marginLeft: theme.spacing(3),
    display: "flex",
    alignItems: "center"
  }
});

const HeaderCell = ({ children, classes, hidden, padding, size }) => (
  <Hidden {...hidden}>
    <TableCell className={classes.headerCell} padding={padding} size={size}>
      {children}
    </TableCell>
  </Hidden>
);

HeaderCell.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  hidden: PropTypes.object,
  padding: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired
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
  size,
  sortColumn,
  sortDirection,
  sortId
}) => (
  <Hidden {...hidden}>
    <TableCell className={classes.headerCell} padding={padding} size={size}>
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
  size: PropTypes.string.isRequired,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string,
  sortId: PropTypes.string.isRequired
};

SortableHeaderCell.defaultProps = {
  hidden: null,
  sortColumn: undefined,
  sortDirection: undefined
};

const BaseTable = ({
  actions,
  children,
  classes,
  columns,
  fullWidth,
  headerSize,
  multiselectActions,
  onSearch,
  onSort,
  pagination,
  searchable,
  selectedCount,
  sortColumn,
  sortDirection
}) => (
  <div className={fullWidth ? classes.fullWidthContainer : undefined}>
    <div className={classes.topBar}>
      {searchable && (
        <SearchBar
          classes={{ searchBar: classes.grow }}
          debounce={1000}
          isHidden={Boolean(selectedCount)}
          onChange={onSearch}
        />
      )}
      {multiselectActions.length > 0 && selectedCount > 0 && (
        <div className={`${classes.grow} ${classes.multiBar}`}>
          <Typography variant="h6" className={classes.grow}>
            {selectedCount} selected
          </Typography>
          <ActionBar actions={multiselectActions} />
        </div>
      )}
      {actions.length > 0 && !selectedCount && <ActionBar actions={actions} />}
    </div>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(column => {
            if (typeof column === "string") {
              return (
                <HeaderCell classes={classes} key={column} size={headerSize}>
                  {column}
                </HeaderCell>
              );
            } else if (!column.sortId) {
              return (
                <HeaderCell
                  classes={classes}
                  hidden={column.hidden}
                  key={column.key || column.label}
                  padding={column.key && "checkbox"}
                  size={headerSize}
                >
                  {column.label}
                </HeaderCell>
              );
            }
            return (
              <SortableHeaderCell
                classes={classes}
                hidden={column.hidden}
                key={column.key || column.label}
                size={headerSize}
                sortId={column.sortId}
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
              page={pagination.page - 1}
              onChangePage={(e, page) => pagination.onChangePage(page + 1)}
              onChangeRowsPerPage={({ target: { value: rpp } }) =>
                pagination.onChangeRowsPerPage
                  ? pagination.onChangeRowsPerPage(rpp)
                  : null
              }
              rowsPerPage={pagination.rowsPerPage}
              rowsPerPageOptions={pagination.rowsPerPageOptions}
            />
          </TableRow>
        </TableFooter>
      )}
    </Table>
  </div>
);

BaseTable.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape(ActionButtonPropTypes)),
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.node,
        sortId: PropTypes.string
      })
    ])
  ).isRequired,
  fullWidth: PropTypes.bool,
  headerSize: PropTypes.string,
  multiselectActions: PropTypes.arrayOf(PropTypes.shape(ActionButtonPropTypes)),
  onSearch: PropTypes.func,
  onSort: PropTypes.func,
  pagination: PropTypes.shape({
    count: PropTypes.number, // Total number of rows
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func,
    page: PropTypes.number, // Current page number
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array
  }),
  searchable: PropTypes.bool,
  selectedCount: PropTypes.number,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string
};

BaseTable.defaultProps = {
  actions: null,
  children: [],
  fullWidth: false,
  headerPadding: "default",
  multiselectActions: null,
  onSearch: null,
  onSort: null,
  pagination: null,
  searchable: false,
  selectedCount: 0,
  sortColumn: undefined,
  sortDirection: undefined
};

export default withStyles(styles)(BaseTable);
