import React from "react";
import { polyfill } from "react-lifecycles-compat";
import PropTypes from "prop-types";
import { Data } from "perch-data";
import { TableRow, TableCell, Typography } from "material-ui";
import isEqual from "lodash.isequal";
import { BaseTable as Table, LoadingRow } from "./";

const ErrorRow = ({ columnCount }) => (
  <TableRow>
    <TableCell colSpan={columnCount}>
      <Typography variant="caption" align="center">
        An error occurred while fetching this data.
      </Typography>
    </TableCell>
  </TableRow>
);

ErrorRow.propTypes = {
  columnCount: PropTypes.number.isRequired
};

const getSortFromOrdering = ordering => {
  let sortColumn = null;
  let sortDirection = null;

  if (ordering) {
    const isFirstCharDirection = ordering.slice(0, 1) === "-";
    sortColumn = isFirstCharDirection ? ordering.slice(1) : ordering;
    sortDirection = isFirstCharDirection ? "desc" : "asc";
  }

  return { sortColumn, sortDirection };
};

class AutoTable extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.filter, prevState.filter)) {
      const { sortColumn, sortDirection } = getSortFromOrdering(
        nextProps.initialOrdering
      );
      return { filter: nextProps.filter, page: 1, sortColumn, sortDirection };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const { filter, initialOrdering, rowsPerPage } = props;
    const { sortColumn, sortDirection } = getSortFromOrdering(initialOrdering);

    this.state = {
      filter,
      ordering: initialOrdering,
      page: 1,
      rowsPerPage,
      search: null,
      sortColumn,
      sortDirection
    };
  }

  getPaginationForData = data => {
    const { rowsPerPageOptions = [] } = this.props;
    const { page, rowsPerPage } = this.state;

    if (data && data.total_count > 0) {
      return {
        count: data.total_count,
        onChangePage: this.handleChangePage,
        onChangeRowsPerPage: this.handleChangeRowsPerPage,
        page,
        rowsPerPage,
        rowsPerPageOptions
      };
    }
    return null;
  };

  getTableBodyForResult = ({ data, error, loading, refetch }) => {
    const { children, columns } = this.props;
    const { rowsPerPage } = this.state;

    if (error) {
      return <ErrorRow columnCount={columns.length} />;
    } else if (loading) {
      return [...Array(rowsPerPage || 1)].map((_, index) => (
        <LoadingRow key={index} rows={columns.length} /> // eslint-disable-line react/no-array-index-key
      ));
    } else if (data) {
      return children(data, refetch);
    }

    return null;
  };

  handleSort = (column, direction) => {
    const ordering = `${direction === "desc" ? "-" : ""}${column}`;
    this.setState({ ordering, sortColumn: column, sortDirection: direction });
  };

  handleSearch = search => this.setState({ search, page: 1 }); // Reset page on search

  handleChangePage = page => this.setState({ page });

  handleChangeRowsPerPage = rowsPerPage => this.setState({ rowsPerPage });

  render() {
    const {
      action,
      columns,
      headerPadding,
      pageable,
      searchable,
      sortable
    } = this.props;

    const {
      filter,
      ordering,
      page,
      rowsPerPage,
      search,
      sortColumn,
      sortDirection
    } = this.state;

    const variables = { ...filter, ordering, page, rowsPerPage, search };

    return (
      <Data action={action} variables={variables}>
        {result => (
          <Table
            columns={
              sortable
                ? columns
                : columns.map(({ sortId, ...column }) => column)
            }
            headerPadding={headerPadding}
            onSearch={this.handleSearch}
            onSort={this.handleSort}
            pagination={
              pageable ? this.getPaginationForData(result.data) : null
            }
            searchable={searchable}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          >
            {this.getTableBodyForResult(result)}
          </Table>
        )}
      </Data>
    );
  }
}

AutoTable.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        sortId: PropTypes.string
      })
    ])
  ).isRequired,
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  headerPadding: PropTypes.string,
  initialOrdering: PropTypes.string,
  pageable: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  searchable: PropTypes.bool,
  sortable: PropTypes.bool
};

AutoTable.defaultProps = {
  filter: null,
  headerPadding: "default",
  pageable: false,
  rowsPerPage: null,
  rowsPerPageOptions: [10, 25, 50, 100],
  searchable: false,
  initialOrdering: null,
  sortable: false
};

polyfill(AutoTable);

export default AutoTable;
