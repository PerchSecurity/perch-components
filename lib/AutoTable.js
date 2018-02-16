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

var _withdata = require("withdata");

var _withdata2 = _interopRequireDefault(_withdata);

var _lodash = require("lodash");

var _2 = require("./");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoTable = function (_React$Component) {
  _inherits(AutoTable, _React$Component);

  function AutoTable(props) {
    _classCallCheck(this, AutoTable);

    var _this = _possibleConstructorReturn(this, (AutoTable.__proto__ || Object.getPrototypeOf(AutoTable)).call(this, props));

    _this.onSort = function (column, direction) {
      var items = _this.props.data.items;

      var ordering = "" + (direction === "desc" ? "-" : "") + column;
      _this.setState({ sortColumn: column, sortDirection: direction });
      items.applyParams({ ordering: ordering });
    };

    _this.onSearch = function (search) {
      var items = _this.props.data.items;

      items.applyParams({ search: search });
    };

    var initialOrdering = props.initialOrdering;

    var sortColumn = null;
    var sortDirection = null;

    if (initialOrdering) {
      var firstCharIsDirection = initialOrdering.slice(0, 1) === "-";
      sortColumn = firstCharIsDirection ? initialOrdering.slice(1) : initialOrdering;
      sortDirection = firstCharIsDirection ? "desc" : "asc";
    }

    _this.state = { sortColumn: sortColumn, sortDirection: sortDirection };
    return _this;
  }

  _createClass(AutoTable, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var _props = this.props,
          items = _props.data.items,
          filter = _props.filter;

      if (!(0, _lodash.isEqual)(newProps.filter, filter)) {
        items.applyParams({ filter: newProps.filter });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          columns = _props2.columns,
          items = _props2.data.items,
          headerPadding = _props2.headerPadding,
          maxRows = _props2.maxRows,
          paginatable = _props2.paginatable,
          searchable = _props2.searchable,
          sortable = _props2.sortable;
      var _state = this.state,
          sortColumn = _state.sortColumn,
          sortDirection = _state.sortDirection;

      var pagination = items.total_count > 0 ? {
        count: items.total_count,
        rowsPerPage: items.page_size,
        page: items.page_number,
        onChangePage: function onChangePage(page) {
          return items.applyParams({ page: page });
        }
      } : null;
      return _react2.default.createElement(
        _2.BaseTable,
        {
          columns: sortable ? columns : columns.map(function (column) {
            return { label: column.label };
          }),
          headerPadding: headerPadding,
          onSearch: this.onSearch,
          onSort: this.onSort,
          pagination: paginatable ? pagination : null,
          searchable: searchable,
          sortColumn: sortColumn,
          sortDirection: sortDirection
        },
        items.loading ? [].concat(_toConsumableArray(Array(maxRows || 1))).map(function (_, index) {
          return _react2.default.createElement(_2.LoadingRow, { key: index, rows: columns.length });
        }) : this.props.children(items)
      );
    }
  }]);

  return AutoTable;
}(_react2.default.Component);

AutoTable.propTypes = {
  action: _propTypes2.default.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  children: _propTypes2.default.func.isRequired,
  columns: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    label: _propTypes2.default.string,
    sortId: _propTypes2.default.string
  })])).isRequired,
  data: _propTypes2.default.shape({
    items: _propTypes2.default.object.isRequired
  }).isRequired,
  filter: _propTypes2.default.object, // eslint-disable-line react/no-unused-prop-types
  // filter.isCompliant: PropTypes.bool
  headerPadding: _propTypes2.default.string,
  initialOrdering: _propTypes2.default.string,
  maxRows: _propTypes2.default.number,
  paginatable: _propTypes2.default.bool,
  searchable: _propTypes2.default.bool,
  sortable: _propTypes2.default.bool
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

exports.default = (0, _withdata2.default)({
  items: function items(_ref) {
    var action = _ref.action,
        filter = _ref.filter,
        initialOrdering = _ref.initialOrdering,
        maxRows = _ref.maxRows,
        ordering = _ref.ordering,
        page = _ref.page,
        search = _ref.search;
    return action(_extends({}, filter, {
      size: maxRows,
      ordering: ordering || initialOrdering,
      page: page,
      search: search
    }));
  }
})(AutoTable);