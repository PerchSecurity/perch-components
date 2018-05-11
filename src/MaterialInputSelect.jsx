import React from "react";
import PropTypes from "prop-types";
import { TextField } from "material-ui";

// See https://github.com/mui-org/material-ui/issues/10938 for why haxx

const MaterialInputSelect = ({
  field,
  form: { errors, touched },
  label,
  options,
  ...props
}) => (
  <TextField
    {...props}
    {...field}
    value={field.value !== undefined ? field.value : ""}
    error={Boolean(touched[field.name] && errors[field.name])}
    label={(touched[field.name] && errors[field.name]) || label}
    select
    SelectProps={{ native: true }}
  >
    {field.value === "" && <option value="">Select</option>}
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
