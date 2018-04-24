"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _perchData = require("perch-data");

var _materialUi = require("material-ui");

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

var getSortFromOrdering = function getSortFromOrdering(ordering) {
  var sortColumn = null;
  var sortDirection = null;

  if (ordering) {
    var isFirstCharDirection = ordering.slice(0, 1) === "-";
    sortColumn = isFirstCharDirection ? ordering.slice(1) : ordering;
    sortDirection = isFirstCharDirection ? "desc" : "asc";
  }

  return { sortColumn: sortColumn, sortDirection: sortDirection };
};

var AutoTable = function (_React$Component) {
  _inherits(AutoTable, _React$Component);

  _createClass(AutoTable, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (!(0, _lodash2.default)(nextProps.filter, prevState.filter)) {
        var _getSortFromOrdering = getSortFromOrdering(nextProps.initialOrdering),
            sortColumn = _getSortFromOrdering.sortColumn,
            sortDirection = _getSortFromOrdering.sortDirection;

        return { filter: nextProps.filter, page: 1, sortColumn: sortColumn, sortDirection: sortDirection };
      }
      return null;
    }
  }]);

  function AutoTable(props) {
    _classCallCheck(this, AutoTable);

    var _this = _possibleConstructorReturn(this, (AutoTable.__proto__ || Object.getPrototypeOf(AutoTable)).call(this, props));

    _initialiseProps.call(_this);

    var filter = props.filter,
        initialOrdering = props.initialOrdering,
        rowsPerPage = props.rowsPerPage;

    var _getSortFromOrdering2 = getSortFromOrdering(initialOrdering),
        sortColumn = _getSortFromOrdering2.sortColumn,
        sortDirection = _getSortFromOrdering2.sortDirection;

    _this.state = {
      filter: filter,
      ordering: initialOrdering,
      page: 1,
      rowsPerPage: rowsPerPage,
      search: null,
      sortColumn: sortColumn,
      sortDirection: sortDirection
    };
    return _this;
  } // Reset page on search

  _createClass(AutoTable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          action = _props.action,
          columns = _props.columns,
          headerPadding = _props.headerPadding,
          pageable = _props.pageable,
          searchable = _props.searchable,
          sortable = _props.sortable;
      var _state = this.state,
          filter = _state.filter,
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
              columns: sortable ? columns : columns.map(function (_ref2) {
                var sortId = _ref2.sortId,
                    column = _objectWithoutProperties(_ref2, ["sortId"]);

                return column;
              }),
              headerPadding: headerPadding,
              onSearch: _this2.handleSearch,
              onSort: _this2.handleSort,
              pagination: pageable ? _this2.getPaginationForData(result.data) : null,
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getPaginationForData = function (data) {
    var _props$rowsPerPageOpt = _this3.props.rowsPerPageOptions,
        rowsPerPageOptions = _props$rowsPerPageOpt === undefined ? [] : _props$rowsPerPageOpt;


    if (data && data.total_count > 0) {
      return {
        count: data.total_count,
        onChangePage: _this3.handleChangePage,
        onChangeRowsPerPage: _this3.handleChangeRowsPerPage,
        page: data.page_number,
        rowsPerPage: data.page_size,
        rowsPerPageOptions: rowsPerPageOptions
      };
    }
    return null;
  };

  this.getTableBodyForResult = function (_ref3) {
    var data = _ref3.data,
        error = _ref3.error,
        loading = _ref3.loading;
    var _props2 = _this3.props,
        children = _props2.children,
        columns = _props2.columns;
    var rowsPerPage = _this3.state.rowsPerPage;


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

  this.handleSort = function (column, direction) {
    var ordering = "" + (direction === "desc" ? "-" : "") + column;
    _this3.setState({ ordering: ordering, sortColumn: column, sortDirection: direction });
  };

  this.handleSearch = function (search) {
    return _this3.setState({ search: search, page: 1 });
  };

  this.handleChangePage = function (page) {
    return _this3.setState({ page: page });
  };

  this.handleChangeRowsPerPage = function (rowsPerPage) {
    return _this3.setState({ rowsPerPage: rowsPerPage });
  };
};

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
  pageable: _propTypes2.default.bool,
  rowsPerPage: _propTypes2.default.number,
  rowsPerPageOptions: _propTypes2.default.arrayOf(_propTypes2.default.number),
  searchable: _propTypes2.default.bool,
  sortable: _propTypes2.default.bool
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

(0, _reactLifecyclesCompat.polyfill)(AutoTable);

exports.default = AutoTable;