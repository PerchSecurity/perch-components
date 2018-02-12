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

var SaveButton = function SaveButton(_ref, _ref2) {
  var _ref2$formik = _ref2.formik,
      values = _ref2$formik.values,
      isSubmitting = _ref2$formik.isSubmitting;

  var label = _ref.label,
      validationSchema = _ref.validationSchema,
      props = _objectWithoutProperties(_ref, ['label', 'validationSchema']);

  var disabled = isSubmitting || !validationSchema.isValidSync(values);
  return _react2.default.createElement(
    _materialUi.Button,
    _extends({ raised: true, color: 'primary', type: 'submit', disabled: disabled }, props),
    label
  );
};

SaveButton.propTypes = {
  label: _propTypes2.default.string.isRequired,
  validationSchema: _propTypes2.default.object.isRequired
};

SaveButton.contextTypes = {
  formik: _propTypes2.default.object
};

exports.default = SaveButton;