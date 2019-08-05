import React from "react";
import { polyfill } from "react-lifecycles-compat";
import PropTypes from "prop-types";
import { Data } from "@perchsecurity/perch-data";
import { TableRow, TableCell, Typography, Checkbox } from "@material-ui/core";
import isEqual from "lodash.isequal";
import { BaseTable as Table, LoadingRow } from "./";
import { ActionButtonPropTypes } from "./ActionButton";

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

const NoResultsRow = ({ columnCount }) => (
  <TableRow>
    <TableCell colSpan={columnCount}>
      <Typography variant="caption" align="center">
        No results found.
      </Typography>
    </TableCell>
  </TableRow>
);

NoResultsRow.propTypes = {
  columnCount: PropTypes.number.isRequired
};

const getSortFromOrdering = ordering => {
  let sortColumn;
  let sortDirection;

  if (ordering) {
    const isFirstCharDirection = ordering.slice(0, 1) === "-";
    sortColumn = isFirstCharDirection ? ordering.slice(1) : ordering;
    sortDirection = isFirstCharDirection ? "desc" : "asc";
  }

  return { sortColumn, sortDirection };
};

class AutoTable extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.variables, prevState.variables)) {
      const { sortColumn, sortDirection } = getSortFromOrdering(
        nextProps.initialOrdering
      );
      return {
        allItems: new Set(),
        variables: nextProps.variables,
        page: 1,
        sortColumn,
        sortDirection,
        selectedItems: new Set()
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const { initialOrdering, rowsPerPage, variables } = props;
    const { sortColumn, sortDirection } = getSortFromOrdering(initialOrdering);

    this.state = {
      allItems: new Set(),
      ordering: initialOrdering,
      page: 1,
      rowsPerPage,
      search: null,
      sortColumn,
      sortDirection,
      selectedItems: new Set(),
      variables
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { allItems, ...relevantState } = this.state;
    const { allItems: nextAllItems, ...nextRelevantState } = nextState;
    return (
      !isEqual(this.props, nextProps) ||
      !isEqual(relevantState, nextRelevantState)
    );
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

  getTableBodyForResult = (
    { data, error, loading, refetch },
    { columns, variables }
  ) => {
    const {
      children,
      multiselectable,
      renderError,
      renderNoResults
    } = this.props;
    const { rowsPerPage, selectedItems } = this.state;
    const numColumns = multiselectable ? columns.length + 1 : columns.length;
    if (error) {
      return renderError ? (
        renderError(error, { columns, data, refetch, variables })
      ) : (
        <ErrorRow columnCount={numColumns} />
      );
    } else if (loading) {
      return [...Array(rowsPerPage || 1)].map((_, index) => (
        <LoadingRow key={index} rows={numColumns} /> // eslint-disable-line react/no-array-index-key
      ));
    } else if (data && !data.results.length) {
      return renderNoResults ? (
        renderNoResults(null, { columns, data, refetch, variables })
      ) : (
        <NoResultsRow columnCount={numColumns} />
      );
    } else if (data) {
      this.setState({ allItems: new Set(data.results) });
      return data.results.map((item, index) => {
        const cells = children(item, {
          columns,
          data,
          index,
          refetch,
          variables
        });
        return (
          <TableRow hover key={item.id || JSON.stringify(item)}>
            {multiselectable && (
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  onChange={(event, checked) =>
                    this.handleSelectItem(item, checked)
                  }
                  checked={selectedItems.has(item)}
                />
              </TableCell>
            )}
            {cells}
          </TableRow>
        );
      });
    }

    return null;
  };

  changeTableVariables(variables) {
    this.setState({
      selectedItems: new Set(),
      allItems: new Set(),
      ...variables
    });
  }

  handleSort = (column, direction) => {
    const ordering = `${direction === "desc" ? "-" : ""}${column}`;
    this.changeTableVariables({
      ordering,
      sortColumn: column,
      sortDirection: direction
    });
  };

  handleSearch = search => this.changeTableVariables({ search, page: 1 }); // Reset page on search

  handleChangePage = page => this.changeTableVariables({ page });

  handleChangeRowsPerPage = rowsPerPage =>
    this.changeTableVariables({ rowsPerPage });

  handleSelectAll = () => {
    const { selectedItems, allItems } = this.state;
    if (allItems.size === 0) return;

    if (allItems.size > selectedItems.size) {
      this.setState({ selectedItems: new Set(allItems) });
    } else {
      this.setState({ selectedItems: new Set() });
    }
  };

  handleSelectItem = (item, checked) => {
    const { selectedItems } = this.state;
    const newSelectedItems = new Set(selectedItems);

    if (checked) {
      newSelectedItems.add(item);
    } else {
      newSelectedItems.delete(item);
    }

    this.setState({ selectedItems: newSelectedItems });
  };

  render() {
    const {
      action,
      columns,
      fullWidth,
      multiselectable,
      multiselectActions,
      options,
      padding,
      pageable,
      searchable,
      size,
      sortable,
      tableActions
    } = this.props;

    const {
      variables,
      ordering,
      page,
      rowsPerPage,
      search,
      sortColumn,
      sortDirection,
      selectedItems,
      allItems
    } = this.state;

    // Ensure all column descriptors are objects, for easy handling
    let tableColumns = columns.map(
      column => (typeof column === "string" ? { label: column } : column)
    );

    if (multiselectable) {
      const isAllSelected =
        selectedItems.size > 0 && selectedItems.size === allItems.size;
      const multiselectColumn = {
        key: "select all",
        label: (
          <Checkbox
            color="primary"
            onChange={this.handleSelectAll}
            checked={isAllSelected}
          />
        )
      };
      tableColumns = [multiselectColumn, ...tableColumns].map(column => ({
        ...column,
        hidden:
          selectedItems.size && column.hideOnMultiselect
            ? { ...column.hidden, xsUp: true }
            : column.hidden
      }));
    }

    const dataVariables = { ...variables, ordering, page, rowsPerPage, search };

    const multiselectActionsWithState = multiselectActions.map(
      ({ onClick, ...props }) => ({
        ...props,
        onClick: () => {
          this.setState({ selectedItems: new Set() });
          return onClick([...selectedItems], { variables: dataVariables });
        }
      })
    );

    const columnsWithoutCheckbox = multiselectable
      ? tableColumns.slice(1)
      : tableColumns;
    
    return (
      <Data action={action} options={options} variables={dataVariables}>
        {result => (
          <Table
            actions={tableActions}
            columns={
              sortable
                ? tableColumns
                : tableColumns.map(({ sortId, ...column }) => column)
            }
            fullWidth={fullWidth}
            multiselectActions={multiselectActionsWithState}
            onSearch={this.handleSearch}
            onSort={this.handleSort}
            padding={padding}
            pagination={
              pageable ? this.getPaginationForData(result.data) : null
            }
            searchable={searchable}
            selectedCount={selectedItems.size}
            size={size}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          >
            {this.getTableBodyForResult(result, {
              columns: columnsWithoutCheckbox,
              variables: dataVariables
            })}
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
  fullWidth: PropTypes.bool,
  initialOrdering: PropTypes.string,
  multiselectable: PropTypes.bool,
  multiselectActions: PropTypes.arrayOf(PropTypes.shape(ActionButtonPropTypes)),
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
  pageable: PropTypes.bool,
  renderError: PropTypes.func,
  renderNoResults: PropTypes.func,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  searchable: PropTypes.bool,
  size: PropTypes.string,
  sortable: PropTypes.bool,
  tableActions: PropTypes.arrayOf(PropTypes.shape(ActionButtonPropTypes)),
  variables: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

AutoTable.defaultProps = {
  fullWidth: false,
  initialOrdering: null,
  multiselectable: false,
  multiselectActions: [],
  options: null,
  padding: undefined,
  pageable: false,
  renderError: null,
  renderNoResults: null,
  rowsPerPage: null,
  rowsPerPageOptions: [10, 25, 50, 100],
  searchable: false,
  size: undefined,
  sortable: false,
  tableActions: [],
  variables: null
};

polyfill(AutoTable);

export default AutoTable;
