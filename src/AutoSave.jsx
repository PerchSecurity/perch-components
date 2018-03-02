import React from "react";
import PropTypes from "prop-types";
import isEqual from "lodash.isequal";
import debounce from "lodash.debounce";

const DEBOUNCE_DURATION = 1000;

class AutoSave extends React.Component {
  componentWillReceiveProps(nextProps, nextContext) {
    const { validationSchema } = this.props;
    const newValues = nextContext.formik.values;
    const oldValues = this.context.formik.values;
    const valuesHaveChanged = !isEqual(newValues, oldValues);

    if (valuesHaveChanged) {
      validationSchema
        .isValid(newValues)
        .then(isValid => isValid && this.saveForm());
    }
  }

  saveForm = debounce(this.context.formik.submitForm, DEBOUNCE_DURATION);

  render() {
    return null;
  }
}

AutoSave.propTypes = {
  validationSchema: PropTypes.object.isRequired
};

AutoSave.contextTypes = {
  formik: PropTypes.object
};

export default AutoSave;
