import React from "react";
import PropTypes from "prop-types";
import { TextField } from "material-ui";

const MaterialInputSelect = ({
  field,
  form: { touched, errors },
  label,
  options,
  ...props
}) => (
  <TextField
    {...props}
    {...field}
    value={field.value || ""}
    error={Boolean(touched[field.name] && errors[field.name])}
    label={(touched[field.name] && errors[field.name]) || label}
    select
    SelectProps={{ native: true }}
  >
    <option value="">Select</option>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </TextField>
);

MaterialInputSelect.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
    // the rest of the formik bag too
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string
    })
  )
};

MaterialInputSelect.defaultProps = {
  options: []
};

export default MaterialInputSelect;
