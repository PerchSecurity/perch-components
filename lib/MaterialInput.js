"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MaterialInput = function MaterialInput(_ref) {
  var field = _ref.field,
      _ref$form = _ref.form,
      touched = _ref$form.touched,
      errors = _ref$form.errors,
      label = _ref.label,
      props = _objectWithoutProperties(_ref, ["field", "form", "label"]);

  return _react2.default.createElement(_core.TextField, _extends({}, props, field, {
    value: field.value !== undefined ? field.value : "",
    error: Boolean(touched[field.name] && errors[field.name]),
    label: touched[field.name] && errors[field.name] || label
  }));
};

MaterialInput.propTypes = {
  field: _propTypes2.default.shape({
    name: _propTypes2.default.string,
    value: _propTypes2.default.any,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func
  }).isRequired,
  form: _propTypes2.default.shape({
    touched: _propTypes2.default.object,
    errors: _propTypes2.default.object
    // the rest of the formik bag too
  }).isRequired,
  label: _propTypes2.default.string.isRequired
};

exports.default = MaterialInput;