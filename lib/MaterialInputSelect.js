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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// See https://github.com/mui-org/material-ui/issues/10938 for why haxx

var MaterialInputSelect = function MaterialInputSelect(_ref) {
  var field = _ref.field,
      _ref$form = _ref.form,
      errors = _ref$form.errors,
      touched = _ref$form.touched,
      label = _ref.label,
      options = _ref.options,
      props = _objectWithoutProperties(_ref, ["field", "form", "label", "options"]);

  return _react2.default.createElement(
    _materialUi.TextField,
    _extends({}, props, field, {
      value: field.value !== undefined ? field.value : "",
      error: Boolean(touched[field.name] && errors[field.name]),
      label: touched[field.name] && errors[field.name] || label,
      select: true,
      SelectProps: { native: true }
    }),
    field.value === "" && _react2.default.createElement(
      "option",
      { value: "" },
      "Select"
    ),
    options.map(function (option) {
      return _react2.default.createElement(
        "option",
        { key: option.value, value: option.value },
        option.label
      );
    })
  );
};

MaterialInputSelect.propTypes = {
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
  label: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.any,
    label: _propTypes2.default.string
  }))
};

MaterialInputSelect.defaultProps = {
  options: []
};

exports.default = MaterialInputSelect;