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

var styles = function styles(theme) {
  return {
    searchBar: {
      height: 64,
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      borderBottom: "2px #D8D8D8 solid"
    },
    hidden: {
      display: "none"
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
};

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

    _this.handleChange = function (query) {
      _this.setState({ query: query });
      _this.debouncedOnChange(query);
    };

    _this.debouncedOnChange = (0, _lodash2.default)(_this.props.onChange, _this.props.debounce);

    _this.state = { query: "" };
    return _this;
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          classes = _props.classes,
          isHidden = _props.isHidden;
      var query = this.state.query;

      return _react2.default.createElement(
        "div",
        { className: classes.searchBar + " " + (isHidden && classes.hidden) },
        _react2.default.createElement(_materialUi.Input, {
          fullWidth: true,
          disableUnderline: true,
          classes: { root: classes.input },
          id: "search",
          placeholder: "Search",
          onChange: function onChange(event) {
            return _this2.handleChange(event.target.value);
          },
          startAdornment: _react2.default.createElement(
            _materialUi.Icon,
            { className: classes.icon },
            "search"
          ),
          type: "search",
          value: query
        }),
        query && _react2.default.createElement(
          _materialUi.IconButton,
          { onClick: function onClick() {
              return _this2.handleChange("");
            } },
          _react2.default.createElement(
            _materialUi.Icon,
            null,
            "clear"
          )
        )
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
  debounce: _propTypes2.default.number,
  isHidden: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired
};

SearchBar.defaultProps = {
  debounce: DEBOUNCE_DURATION,
  isHidden: false
};

exports.default = (0, _styles.withStyles)(styles)(SearchBar);