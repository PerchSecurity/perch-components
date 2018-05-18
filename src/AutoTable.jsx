import React from "react";
import { polyfill } from "react-lifecycles-compat";
import PropTypes from "prop-types";
import { Data } from "perch-data";
import { TableRow, TableCell, Typography, Checkbox } from "material-ui";
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
      sortDirection,
      selectedItems: new Set(),
      allItems: new Set()
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
    const { children, multiselectable } = this.props;
    const { rowsPerPage, selectedItems } = this.state;
    const numColumns = multiselectable ? columns.length + 1 : columns;

    if (error) {
      return <ErrorRow columnCount={numColumns} />;
    } else if (loading) {
      return [...Array(rowsPerPage || 1)].map((_, index) => (
        <LoadingRow key={index} rows={numColumns} /> // eslint-disable-line react/no-array-index-key
      ));
    } else if (data) {
      this.setState({ allItems: new Set(data.results) });

      return data.results.map(item => {
        const cells = children(item, { columns, data, refetch, variables });
        return (
          <TableRow hover key={JSON.stringify(item)}>
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
      headerPadding,
      pageable,
      searchable,
      sortable,
      multiselectable,
      multiselectActions,
      columns
    } = this.props;

    const {
      filter,
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

    const variables = { ...filter, ordering, page, rowsPerPage, search };
    const showSearchBar = searchable && selectedItems.size === 0;

    const showTableActions = multiselectable && selectedItems.size > 0;
    const tableActions = multiselectActions.map(({ onClick, ...props }) => ({
      ...props,
      onClick: () => onClick([...selectedItems], { variables })
    }));

    const columnsWithoutCheckbox = multiselectable
      ? tableColumns.slice(1)
      : tableColumns;

    return (
      <Data action={action} variables={variables}>
        {result => (
          <Table
            actions={showTableActions ? tableActions : null}
            columns={
              sortable
                ? tableColumns
                : tableColumns.map(({ sortId, ...column }) => column)
            }
            headerPadding={headerPadding}
            onSearch={this.handleSearch}
            onSort={this.handleSort}
            pagination={
              pageable ? this.getPaginationForData(result.data) : null
            }
            searchable={showSearchBar}
            selectedCount={selectedItems.size}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          >
            {this.getTableBodyForResult(result, {
              columns: columnsWithoutCheckbox,
              variables
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
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  headerPadding: PropTypes.string,
  initialOrdering: PropTypes.string,
  pageable: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  searchable: PropTypes.bool,
  sortable: PropTypes.bool,
  multiselectable: PropTypes.bool,
  multiselectActions: PropTypes.arrayOf(PropTypes.shape(ActionButtonPropTypes))
};

AutoTable.defaultProps = {
  filter: null,
  headerPadding: "default",
  pageable: false,
  rowsPerPage: null,
  rowsPerPageOptions: [10, 25, 50, 100],
  searchable: false,
  initialOrdering: null,
  sortable: false,
  multiselectable: false,
  multiselectActions: []
};

polyfill(AutoTable);

export default AutoTable;
