import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import debounce from "lodash.debounce";

const DEBOUNCE_DURATION = 1000;

class AutoSave extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { formik, validationSchema } = this.props;
    const newValues = nextProps.formik.values;
    const oldValues = formik.values;
    const valuesHaveChanged = !isEqual(newValues, oldValues);

    if (valuesHaveChanged) {
      validationSchema
        .isValid(newValues)
        .then(isValid => isValid && this.saveForm());
    }
  }

  saveForm = debounce(this.props.formik.submitForm, DEBOUNCE_DURATION);

  render() {
    return null;
  }
}

AutoSave.propTypes = {
  formik: PropTypes.shape({
    submitForm: PropTypes.func,
    values: PropTypes.object
  }).isRequired,
  validationSchema: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

export default AutoSave;
