"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require("lodash.debounce");

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEBOUNCE_DURATION = 1000;

var AutoSave = function (_React$Component) {
  _inherits(AutoSave, _React$Component);

  function AutoSave() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AutoSave);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutoSave.__proto__ || Object.getPrototypeOf(AutoSave)).call.apply(_ref, [this].concat(args))), _this), _this.saveForm = (0, _lodash4.default)(_this.context.formik.submitForm, DEBOUNCE_DURATION), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AutoSave, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      var _this2 = this;

      var validationSchema = this.props.validationSchema;

      var newValues = nextContext.formik.values;
      var oldValues = this.context.formik.values;
      var valuesHaveChanged = !(0, _lodash2.default)(newValues, oldValues);

      if (valuesHaveChanged) {
        validationSchema.isValid(newValues).then(function (isValid) {
          return isValid && _this2.saveForm();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return AutoSave;
}(_react2.default.Component);

AutoSave.propTypes = {
  validationSchema: _propTypes2.default.object.isRequired // eslint-disable-line react/forbid-prop-types
};

AutoSave.contextTypes = {
  formik: _propTypes2.default.object
};

exports.default = AutoSave;