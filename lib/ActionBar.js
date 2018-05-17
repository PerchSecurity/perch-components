"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("material-ui/styles");

var _colors = require("material-ui/colors");

var _index = require("./index");

var _ActionButton = require("./ActionButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  actionBar: {
    height: 64,
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    alignContent: "space-evenly",
    justifyItems: "space-between",
    flexDirection: "row",
    flexWrap: 'nowrap'
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

var JUSTIFICATIONS = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
};

var ActionBar = function ActionBar(_ref) {
  var classes = _ref.classes,
      actions = _ref.actions,
      position = _ref.position;
  return _react2.default.createElement(
    "div",
    { className: classes.actionBar, style: { justifyContent: JUSTIFICATIONS[position] } },
    actions.map(function (action) {
      return _react2.default.createElement(_index.ActionButton, action);
    })
  );
};

ActionBar.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  position: _propTypes2.default.oneOf(Object.keys(JUSTIFICATIONS)),
  actions: _propTypes2.default.arrayOf(_propTypes2.default.shape(_ActionButton.ActionButtonPropTypes)).isRequired
};

ActionBar.defaultProps = {
  position: 'right'
};

exports.default = (0, _styles.withStyles)(styles)(ActionBar);