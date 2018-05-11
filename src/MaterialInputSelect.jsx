import React from "react";
import PropTypes from "prop-types";
import { MenuItem, TextField } from "material-ui";

const MaterialInputSelect = ({
  field,
  form: { errors, handleBlur, touched },
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
    SelectProps={{
      onBlur: event => {
        event.target.name = field.name; // eslint-disable-line no-param-reassign
        handleBlur(event);
      }
    }}
  >
    {field.value === "" && <MenuItem value="">Select</MenuItem>}
    {options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
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
  // native: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string
    })
  )
};

MaterialInputSelect.defaultProps = {
  // native: false,
  options: []
};

export default MaterialInputSelect;
