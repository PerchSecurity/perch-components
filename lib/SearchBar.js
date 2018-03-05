"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require("material-ui");

var _styles = require("material-ui/styles");

var _colors = require("material-ui/colors");

var _lodash = require("lodash.debounce");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEBOUNCE_DURATION = 300;

var styles = {
  searchBar: {
    height: 64,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginLeft: 8,
    marginRight: 16,
    color: _colors.grey[600],
    alignSelf: "center",
    marginBottom: 4
  },
  input: {
    color: _colors.grey[800],
    fontSize: 24
  }
};

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call.apply(_ref, [this].concat(args))), _this), _this.debouncedOnChange = (0, _lodash2.default)(_this.props.onChange, DEBOUNCE_DURATION), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;

      return _react2.default.createElement(
        "div",
        { className: classes.searchBar },
        _react2.default.createElement(_materialUi.Input, {
          fullWidth: true,
          id: "search",
          placeholder: "Search",
          type: "search",
          onChange: function onChange(event) {
            return _this2.debouncedOnChange(event.target.value);
          },
          startAdornment: _react2.default.createElement(
            _materialUi.Icon,
            { className: classes.icon },
            "search"
          ),
          classes: { root: classes.input }
        })
      );
    }
  }]);

  return SearchBar;
}(_react2.default.Component);

SearchBar.propTypes = {
  classes: _propTypes2.default.shape({
    icon: _propTypes2.default.string,
    input: _propTypes2.default.string,
    searchBar: _propTypes2.default.string
  }).isRequired,
  onChange: _propTypes2.default.func.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(SearchBar);