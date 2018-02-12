import React from "react";
import PropTypes from "prop-types";
import { FormControlLabel, Switch } from "material-ui";

const MaterialInput = ({
  field: { value, ...field },
  form,
  label,
  ...props
}) => (
  <FormControlLabel
    control={<Switch {...field} {...props} checked={value || false} />}
    label={label}
  />
);

MaterialInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    // the formik bag
  }).isRequired,
  label: PropTypes.string.isRequired
};

export default MaterialInput;
