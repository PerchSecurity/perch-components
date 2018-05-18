"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require("material-ui");

var _styles = require("material-ui/styles");

var _index = require("./index");

var _ActionButton = require("./ActionButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    actionBar: {
      height: 64,
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      borderBottom: "2px #D8D8D8 solid"
    },
    text: {
      marginRight: "auto"
    }
  };
};

var ActionBar = function ActionBar(_ref) {
  var actions = _ref.actions,
      classes = _ref.classes,
      items = _ref.items;
  return _react2.default.createElement(
    "div",
    { className: classes.actionBar },
    _react2.default.createElement(
      _materialUi.Typography,
      { variant: "title", className: classes.text },
      items,
      " selected"
    ),
    actions.map(function (action) {
      return _react2.default.createElement(_index.ActionButton, _extends({ key: action.label }, action));
    })
  );
};

ActionBar.propTypes = {
  actions: _propTypes2.default.arrayOf(_propTypes2.default.shape(_ActionButton.ActionButtonPropTypes)).isRequired,
  classes: _propTypes2.default.object.isRequired,
  items: _propTypes2.default.number.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(ActionBar);