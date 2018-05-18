"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Table = require("material-ui/Table");

var _Table2 = _interopRequireDefault(_Table);

var _materialUi = require("material-ui");

var _styles = require("material-ui/styles");

var _ = require("./");

var _ActionButton = require("./ActionButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleDirection = function toggleDirection(direction) {
  return direction === "asc" ? "desc" : "asc";
};

var toggleSort = function toggleSort(column, prevColumn, prevDirection) {
  return column === prevColumn ? toggleDirection(prevDirection) : "asc";
};

var styles = function styles() {
  return {
    headerCell: {
      whiteSpace: "nowrap",
      textTransform: "uppercase"
    },
    topBar: {
      display: "flex",
      flexDirection: "row"
    },
    searchBar: {
      flex: 1
    },
    actionBar: {
      flex: 1
    }
  };
};

var HeaderCell = function HeaderCell(_ref) {
  var children = _ref.children,
      classes = _ref.classes,
      hidden = _ref.hidden,
      padding = _ref.padding;
  return _react2.default.createElement(
    _materialUi.Hidden,
    hidden,
    _react2.default.createElement(
      _Table.TableCell,
      { className: classes.headerCell, padding: padding },
      children
    )
  );
};

HeaderCell.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,
  hidden: _propTypes2.default.object,
  padding: _propTypes2.default.string.isRequired
};

HeaderCell.defaultProps = {
  hidden: null
};

var SortableHeaderCell = function SortableHeaderCell(_ref2) {
  var children = _ref2.children,
      classes = _ref2.classes,
      hidden = _ref2.hidden,
      padding = _ref2.padding,
      onSort = _ref2.onSort,
      sortColumn = _ref2.sortColumn,
      sortDirection = _ref2.sortDirection,
      sortId = _ref2.sortId;
  return _react2.default.createElement(
    _materialUi.Hidden,
    hidden,
    _react2.default.createElement(
      _Table.TableCell,
      { className: classes.headerCell, padding: padding },
      _react2.default.createElement(
        _Table.TableSortLabel,
        {
          active: sortColumn === sortId,
          direction: sortDirection,
          onClick: function onClick() {
            return onSort(sortId, toggleSort(sortId, sortColumn, sortDirection));
          }
        },
        children
      )
    )
  );
};

SortableHeaderCell.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.string.isRequired,
  hidden: _propTypes2.default.object,
  onSort: _propTypes2.default.func.isRequired,
  padding: _propTypes2.default.string.isRequired,
  sortColumn: _propTypes2.default.string,
  sortDirection: _propTypes2.default.string,
  sortId: _propTypes2.default.string.isRequired
};

SortableHeaderCell.defaultProps = {
  hidden: null,
  sortColumn: undefined,
  sortDirection: undefined
};

var BaseTable = function BaseTable(_ref3) {
  var actions = _ref3.actions,
      children = _ref3.children,
      classes = _ref3.classes,
      columns = _ref3.columns,
      headerPadding = _ref3.headerPadding,
      onSearch = _ref3.onSearch,
      onSort = _ref3.onSort,
      pagination = _ref3.pagination,
      searchable = _ref3.searchable,
      selectedCount = _ref3.selectedCount,
      sortColumn = _ref3.sortColumn,
      sortDirection = _ref3.sortDirection;
  return _react2.default.createElement(
    "div",
    null,
    (searchable || actions) && _react2.default.createElement(
      "div",
      { className: classes.topBar },
      searchable && _react2.default.createElement(_.SearchBar, {
        classes: { searchBar: classes.searchBar },
        debounce: 1000,
        isHidden: Boolean(selectedCount),
        onChange: onSearch
      }),
      actions && selectedCount > 0 && _react2.default.createElement(_.ActionBar, {
        actions: actions,
        classes: { actionBar: classes.actionBar },
        items: selectedCount
      })
    ),
    _react2.default.createElement(
      _Table2.default,
      null,
      _react2.default.createElement(
        _Table.TableHead,
        null,
        _react2.default.createElement(
          _Table.TableRow,
          null,
          columns.map(function (column) {
            if (typeof column === "string") {
              return _react2.default.createElement(
                HeaderCell,
                {
                  classes: classes,
                  key: column,
                  padding: headerPadding
                },
                column
              );
            } else if (!column.sortId) {
              return _react2.default.createElement(
                HeaderCell,
                {
                  classes: classes,
                  hidden: column.hidden,
                  key: column.key || column.label,
                  padding: column.key ? "checkbox" : headerPadding
                },
                column.label
              );
            }
            return _react2.default.createElement(
              SortableHeaderCell,
              {
                classes: classes,
                hidden: column.hidden,
                key: column.key || column.label,
                sortId: column.sortId,
                padding: headerPadding,
                onSort: onSort,
                sortColumn: sortColumn,
                sortDirection: sortDirection
              },
              column.label
            );
          })
        )
      ),
      _react2.default.createElement(
        _Table.TableBody,
        null,
        children
      ),
      pagination && _react2.default.createElement(
        _Table.TableFooter,
        null,
        _react2.default.createElement(
          _Table.TableRow,
          null,
          _react2.default.createElement(_Table.TablePagination, {
            count: pagination.count,
            page: pagination.page - 1,
            onChangePage: function onChangePage(e, page) {
              return pagination.onChangePage(page + 1);
            },
            onChangeRowsPerPage: function onChangeRowsPerPage(_ref4) {
              var rpp = _ref4.target.value;
              return pagination.onChangeRowsPerPage ? pagination.onChangeRowsPerPage(rpp) : null;
            },
            rowsPerPage: pagination.rowsPerPage,
            rowsPerPageOptions: pagination.rowsPerPageOptions
          })
        )
      )
    )
  );
};

BaseTable.propTypes = {
  actions: _propTypes2.default.arrayOf(_propTypes2.default.shape(_ActionButton.ActionButtonPropTypes)),
  children: _propTypes2.default.node,
  classes: _propTypes2.default.object.isRequired,
  columns: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    key: _propTypes2.default.string,
    label: _propTypes2.default.node,
    sortId: _propTypes2.default.string
  })])).isRequired,
  headerPadding: _propTypes2.default.string,
  onSearch: _propTypes2.default.func,
  onSort: _propTypes2.default.func,
  pagination: _propTypes2.default.shape({
    count: _propTypes2.default.number, // Total number of rows
    onChangePage: _propTypes2.default.func,
    onChangeRowsPerPage: _propTypes2.default.func,
    page: _propTypes2.default.number, // Current page number
    rowsPerPage: _propTypes2.default.number,
    rowsPerPageOptions: _propTypes2.default.array
  }),
  searchable: _propTypes2.default.bool,
  selectedCount: _propTypes2.default.number,
  sortColumn: _propTypes2.default.string,
  sortDirection: _propTypes2.default.string
};

BaseTable.defaultProps = {
  actions: null,
  children: [],
  headerPadding: "default",
  onSearch: null,
  onSort: null,
  pagination: null,
  searchable: false,
  selectedCount: 0,
  sortColumn: undefined,
  sortDirection: undefined
};

exports.default = (0, _styles.withStyles)(styles)(BaseTable);