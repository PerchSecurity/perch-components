"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _perchData = require("perch-data");

var _materialUi = require("material-ui");

var _2 = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorRow = function ErrorRow(_ref) {
  var columnCount = _ref.columnCount;
  return _react2.default.createElement(
    _materialUi.TableRow,
    null,
    _react2.default.createElement(
      _materialUi.TableCell,
      { colSpan: columnCount },
      _react2.default.createElement(
        _materialUi.Typography,
        { type: "caption", align: "center" },
        "An error occurred while fetching this data."
      )
    )
  );
};

ErrorRow.propTypes = {
  columnCount: _propTypes2.default.number.isRequired
};

var AutoTable = function (_React$Component) {
  _inherits(AutoTable, _React$Component);

  function AutoTable(props) {
    _classCallCheck(this, AutoTable);

    var _this = _possibleConstructorReturn(this, (AutoTable.__proto__ || Object.getPrototypeOf(AutoTable)).call(this, props));

    _this.getPaginationForData = function (data) {
      var rowsPerPageOptions = _this.props.rowsPerPageOptions;


      if (data && data.total_count > 0) {
        return {
          count: data.total_count,
          onChangePage: _this.handleChangePage,
          onChangeRowsPerPage: _this.handleChangeRowsPerPage,
          page: data.page_number,
          rowsPerPage: data.page_size,
          rowsPerPageOptions: rowsPerPageOptions
        };
      }
      return null;
    };

    _this.getTableBodyForResult = function (_ref2) {
      var data = _ref2.data,
          error = _ref2.error,
          loading = _ref2.loading;
      var _this$props = _this.props,
          children = _this$props.children,
          columns = _this$props.columns;
      var rowsPerPage = _this.state.rowsPerPage;


      if (data) {
        return children(data);
      } else if (error) {
        return _react2.default.createElement(ErrorRow, { columnCount: columns.length });
      } else if (loading) {
        return [].concat(_toConsumableArray(Array(rowsPerPage || 1))).map(function (_, index) {
          return _react2.default.createElement(_2.LoadingRow, { key: index, rows: columns.length }) // eslint-disable-line react/no-array-index-key
          ;
        });
      }

      return null;
    };

    _this.handleSort = function (column, direction) {
      var ordering = "" + (direction === "desc" ? "-" : "") + column;
      _this.setState({ ordering: ordering, sortColumn: column, sortDirection: direction });
    };

    _this.handleSearch = function (search) {
      return _this.setState({ search: search });
    };

    _this.handleChangePage = function (page) {
      return _this.setState({ page: page });
    };

    _this.handleChangeRowsPerPage = function (rowsPerPage) {
      return _this.setState({ rowsPerPage: rowsPerPage });
    };

    var _props$initialOrderin = props.initialOrdering,
        initialOrdering = _props$initialOrderin === undefined ? null : _props$initialOrderin;

    var sortColumn = null;
    var sortDirection = null;

    if (initialOrdering) {
      var firstCharIsDirection = initialOrdering.slice(0, 1) === "-";
      sortColumn = firstCharIsDirection ? initialOrdering.slice(1) : initialOrdering;
      sortDirection = firstCharIsDirection ? "desc" : "asc";
    }

    _this.state = {
      ordering: initialOrdering,
      page: 1,
      rowsPerPage: props.rowsPerPage,
      search: null,
      sortColumn: sortColumn,
      sortDirection: sortDirection
    };
    return _this;
  }

  _createClass(AutoTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          action = _props.action,
          columns = _props.columns,
          filter = _props.filter,
          headerPadding = _props.headerPadding,
          paginatable = _props.paginatable,
          searchable = _props.searchable,
          sortable = _props.sortable;
      var _state = this.state,
          ordering = _state.ordering,
          page = _state.page,
          rowsPerPage = _state.rowsPerPage,
          search = _state.search,
          sortColumn = _state.sortColumn,
          sortDirection = _state.sortDirection;


      var variables = _extends({}, filter, { ordering: ordering, page: page, rowsPerPage: rowsPerPage, search: search });

      return _react2.default.createElement(
        _perchData.Data,
        { action: action, variables: variables },
        function (result) {
          return _react2.default.createElement(
            _2.BaseTable,
            {
              columns: sortable ? columns : columns.map(function (_ref3) {
                var sortId = _ref3.sortId,
                    column = _objectWithoutProperties(_ref3, ["sortId"]);

                return column;
              }),
              headerPadding: headerPadding,
              onSearch: _this2.handleSearch,
              onSort: _this2.handleSort,
              pagination: paginatable ? _this2.getPaginationForData(result.data) : null,
              searchable: searchable,
              sortColumn: sortColumn,
              sortDirection: sortDirection
            },
            _this2.getTableBodyForResult(result)
          );
        }
      );
    }
  }]);

  return AutoTable;
}(_react2.default.Component);

AutoTable.propTypes = {
  action: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.func.isRequired,
  columns: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    label: _propTypes2.default.string,
    sortId: _propTypes2.default.string
  })])).isRequired,
  filter: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
  headerPadding: _propTypes2.default.string,
  initialOrdering: _propTypes2.default.string,
  paginatable: _propTypes2.default.bool,
  rowsPerPage: _propTypes2.default.number,
  rowsPerPageOptions: _propTypes2.default.arrayOf(_propTypes2.default.number),
  searchable: _propTypes2.default.bool,
  sortable: _propTypes2.default.bool
};

AutoTable.defaultProps = {
  filter: null,
  headerPadding: "default",
  paginatable: false,
  rowsPerPage: null,
  rowsPerPageOptions: [10, 25, 50, 100],
  searchable: false,
  initialOrdering: null,
  sortable: false
};

exports.default = AutoTable;