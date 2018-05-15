import React from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Switch } from "material-ui";

const MaterialInputBoolean = ({
  checkbox,
  field: { value, ...field },
  form,
  label,
  ...props
}) => {
  const Component = checkbox ? Checkbox : Switch;
  return (
    <FormControlLabel
      control={<Component {...field} {...props} checked={value || false} />}
      label={label}
    />
  );
};

MaterialInputBoolean.propTypes = {
  checkbox: PropTypes.bool,
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

MaterialInputBoolean.defaultProps = {
  checkbox: false
};

export default MaterialInputBoolean;
