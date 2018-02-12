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

var _ = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleDirection = function toggleDirection(direction) {
  return direction === "asc" ? "desc" : "asc";
};

var toggleSort = function toggleSort(column, prevColumn, prevDirection) {
  return column === prevColumn ? toggleDirection(prevDirection) : "asc";
};

var HeaderCell = function HeaderCell(label) {
  return _react2.default.createElement(
    _Table.TableCell,
    { padding: "none", key: label },
    label && label.toString().toUpperCase()
  );
};

var SortableHeaderCell = function SortableHeaderCell(column, onSort, sortColumn, sortDirection) {
  return _react2.default.createElement(
    _Table.TableCell,
    { padding: "none", key: column.label },
    _react2.default.createElement(
      _Table.TableSortLabel,
      {
        active: sortColumn === column.sortId,
        direction: sortDirection,
        onClick: function onClick() {
          return onSort(column.sortId, toggleSort(column.sortId, sortColumn, sortDirection));
        }
      },
      column.label && column.label.toString().toUpperCase()
    )
  );
};

var BaseTable = function BaseTable(_ref) {
  var children = _ref.children,
      columns = _ref.columns,
      onSearch = _ref.onSearch,
      onSort = _ref.onSort,
      pagination = _ref.pagination,
      searchable = _ref.searchable,
      sortColumn = _ref.sortColumn,
      sortDirection = _ref.sortDirection;
  return _react2.default.createElement(
    "div",
    null,
    searchable && _react2.default.createElement(_.SearchBar, { onChange: onSearch }),
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
              return HeaderCell(column);
            } else if (!column.sortId) {
              return HeaderCell(column.label);
            }
            return SortableHeaderCell(column, onSort, sortColumn, sortDirection);
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
            rowsPerPage: pagination.rowsPerPage || 20,
            page: pagination.page - 1,
            onChangePage: function onChangePage(e, page) {
              return pagination.onChangePage(page + 1);
            },
            rowsPerPageOptions: [pagination.rowsPerPage || 20]
          })
        )
      )
    )
  );
};

BaseTable.propTypes = {
  children: _propTypes2.default.arrayOf(_propTypes2.default.element),
  columns: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    label: _propTypes2.default.string,
    sortId: _propTypes2.default.string
  })])).isRequired,
  onSearch: _propTypes2.default.func,
  onSort: _propTypes2.default.func,
  pagination: _propTypes2.default.shape({
    count: _propTypes2.default.number, // Total number of rows
    onChangePage: _propTypes2.default.func,
    page: _propTypes2.default.number, // Current page number
    rowsPerPage: _propTypes2.default.number
  }),
  searchable: _propTypes2.default.bool,
  sortColumn: _propTypes2.default.string,
  sortDirection: _propTypes2.default.string
};

BaseTable.defaultProps = {
  children: [],
  onSearch: null,
  onSort: null,
  pagination: null,
  searchable: false,
  sortColumn: null,
  sortDirection: null
};

exports.default = BaseTable;