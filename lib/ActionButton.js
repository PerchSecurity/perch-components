"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionButtonPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require("react-router");

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    action: {
      color: theme.palette.action.link
    },
    danger: {
      color: theme.palette.action.danger
    }
  };
};

var ActionButton = function ActionButton(_ref) {
  var classes = _ref.classes,
      danger = _ref.danger,
      icon = _ref.icon,
      label = _ref.label,
      link = _ref.link,
      onClick = _ref.onClick;

  var linkProps = link ? { component: _reactRouter.Link, to: link } : {};
  var buttonClass = danger ? classes.danger : classes.action;
  if (icon) {
    return _react2.default.createElement(
      _materialUi.Tooltip,
      { title: label },
      _react2.default.createElement(
        _materialUi.IconButton,
        _extends({ key: label, className: buttonClass, onClick: onClick }, linkProps),
        _react2.default.createElement(
          _materialUi.Icon,
          null,
          icon
        )
      )
    );
  } else {
    // eslint-disable-line no-else-return
    return _react2.default.createElement(
      _materialUi.Button,
      _extends({ size: "small", key: label, className: buttonClass, onClick: onClick }, linkProps),
      label
    );
  }
};

ActionButton.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  danger: _propTypes2.default.bool,
  icon: _propTypes2.default.string,
  label: _propTypes2.default.string.isRequired,
  link: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired
};

ActionButton.defaultProps = {
  danger: null,
  icon: null,
  link: null
};

var ActionButtonPropTypes = exports.ActionButtonPropTypes = ActionButton.propTypes;
exports.default = (0, _materialUi.withStyles)(styles)(ActionButton);