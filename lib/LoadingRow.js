"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("material-ui/styles");

var _Table = require("material-ui/Table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var styles = function styles(theme) {
  return {
    rect: {
      height: "10px",
      width: "80%",
      backgroundColor: theme.palette.action.loading,
      animation: "pulse 1s infinite"
    },
    "@keyframes pulse": {
      "0%": {
        opacity: 0.25
      },
      "50%": {
        opacity: 1
      },
      "100%": {
        opacity: 0.25
      }
    }
  };
};

var LoadingRow = function LoadingRow(_ref) {
  var classes = _ref.classes,
      rows = _ref.rows;
  return _react2.default.createElement(
    _Table.TableRow,
    null,
    [].concat(_toConsumableArray(Array(rows))).map(function (_, index) {
      return _react2.default.createElement(
        _Table.TableCell,
        { key: index, padding: "none" },
        _react2.default.createElement("div", { className: classes.rect })
      );
    })
  );
};

LoadingRow.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  rows: _propTypes2.default.number.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(LoadingRow);