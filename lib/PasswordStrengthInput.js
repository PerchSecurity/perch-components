'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _zxcvbn2 = require('zxcvbn');

var _zxcvbn3 = _interopRequireDefault(_zxcvbn2);

var _materialUi = require('material-ui');

var _styles = require('material-ui/styles');

var _colors = require('material-ui/colors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  0: { color: _colors.pink[500] },
  1: { color: _colors.orange[500] },
  2: { color: _colors.blue[500] },
  3: { color: _colors.teal[500] },
  4: { color: _colors.green[500] }
};

var checkPasswordStrength = function checkPasswordStrength(password) {
  var _zxcvbn = (0, _zxcvbn3.default)(password),
      score = _zxcvbn.score,
      feedback = _zxcvbn.feedback;

  return { score: score, feedback: feedback.warning || feedback.suggestions[0] };
};

var scoreLabels = ['Very Weak', 'Weak', 'Good', 'Strong', 'Very Strong'];

var PasswordStrengthInput = function PasswordStrengthInput(_ref) {
  var classes = _ref.classes,
      field = _ref.field,
      _ref$form = _ref.form,
      touched = _ref$form.touched,
      errors = _ref$form.errors,
      label = _ref.label,
      props = _objectWithoutProperties(_ref, ['classes', 'field', 'form', 'label']);

  var _ref2 = field.value ? checkPasswordStrength(field.value) : {},
      score = _ref2.score,
      feedback = _ref2.feedback;

  var formattedFeedback = feedback ? ': ' + feedback : '';
  var helperText = field.value ? '' + scoreLabels[score] + formattedFeedback : '';
  return _react2.default.createElement(_materialUi.TextField, _extends({}, props, field, {
    type: 'password',
    value: field.value || '',
    helperText: helperText,
    helperTextClassName: field.value ? classes[score] : '',
    label: touched.password && errors.password || label,
    error: Boolean(touched[field.name] && errors[field.name])
  }));
};

PasswordStrengthInput.propTypes = {
  classes: _propTypes2.default.object.isRequired,
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

PasswordStrengthInput.defaultProps = {
  value: null
};

exports.default = (0, _styles.withStyles)(styles)(PasswordStrengthInput);