import React from "react";
import PropTypes from "prop-types";
import { withData } from "perch-data";
import isEqual from "lodash.isequal";
import { BaseTable as Table, LoadingRow } from "./";

class AutoTable extends React.Component {
  constructor(props) {
    super(props);

    const { initialOrdering } = props;
    let sortColumn = null;
    let sortDirection = null;

    if (initialOrdering) {
      const firstCharIsDirection = initialOrdering.slice(0, 1) === "-";
      sortColumn = firstCharIsDirection
        ? initialOrdering.slice(1)
        : initialOrdering;
      sortDirection = firstCharIsDirection ? "desc" : "asc";
    }

    this.state = { sortColumn, sortDirection };
  }

  componentWillReceiveProps(newProps) {
    const { data: { items }, filter } = this.props;
    if (!isEqual(newProps.filter, filter)) {
      items.applyParams({ filter: newProps.filter });
    }
  }

  onSort = (column, direction) => {
    const { data: { items } } = this.props;
    const ordering = `${direction === "desc" ? "-" : ""}${column}`;
    this.setState({ sortColumn: column, sortDirection: direction });
    items.applyParams({ ordering });
  };

  onSearch = search => {
    const { data: { items } } = this.props;
    items.applyParams({ search });
  };

  render() {
    const {
      columns,
      data: { items },
      headerPadding,
      maxRows,
      paginatable,
      searchable,
      sortable
    } = this.props;
    const { sortColumn, sortDirection } = this.state;
    const pagination =
      items.total_count > 0
        ? {
            count: items.total_count,
            rowsPerPage: items.page_size,
            page: items.page_number,
            onChangePage: page => items.applyParams({ page })
          }
        : null;
    return (
      <Table
        columns={
          sortable ? columns : columns.map(column => ({ label: column.label }))
        }
        headerPadding={headerPadding}
        onSearch={this.onSearch}
        onSort={this.onSort}
        pagination={paginatable ? pagination : null}
        searchable={searchable}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      >
        {items.loading
          ? [...Array(maxRows || 1)].map((_, index) => (
              <LoadingRow key={index} rows={columns.length} />
            ))
          : this.props.children(items)}
      </Table>
    );
  }
}

AutoTable.propTypes = {
  action: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
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
  data: PropTypes.shape({
    items: PropTypes.object.isRequired
  }).isRequired,
  filter: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  // filter.isCompliant: PropTypes.bool
  headerPadding: PropTypes.string,
  initialOrdering: PropTypes.string,
  maxRows: PropTypes.number,
  paginatable: PropTypes.bool,
  searchable: PropTypes.bool,
  sortable: PropTypes.bool
};

AutoTable.defaultProps = {
  filter: null,
  headerPadding: null,
  maxRows: null,
  paginatable: false,
  searchable: false,
  initialOrdering: null,
  sortable: false
};

export default withData({
  items: ({
    action,
    filter,
    initialOrdering,
    maxRows,
    ordering,
    page,
    search
  }) =>
    action({
      ...filter,
      size: maxRows,
      ordering: ordering || initialOrdering,
      page,
      search
    })
})(AutoTable);
