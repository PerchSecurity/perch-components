'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MaterialInput = function MaterialInput(_ref) {
  var _ref$field = _ref.field,
      value = _ref$field.value,
      field = _objectWithoutProperties(_ref$field, ['value']),
      form = _ref.form,
      label = _ref.label,
      props = _objectWithoutProperties(_ref, ['field', 'form', 'label']);

  return _react2.default.createElement(_materialUi.FormControlLabel, {
    control: _react2.default.createElement(_materialUi.Switch, _extends({}, field, props, { checked: value || false })),
    label: label
  });
};

MaterialInput.propTypes = {
  field: _propTypes2.default.shape({
    name: _propTypes2.default.string,
    value: _propTypes2.default.any,
    onChange: _propTypes2.default.func,
    onBlur: _propTypes2.default.func
  }).isRequired,
  form: _propTypes2.default.shape({
    // the formik bag
  }).isRequired,
  label: _propTypes2.default.string.isRequired
};

exports.default = MaterialInput;