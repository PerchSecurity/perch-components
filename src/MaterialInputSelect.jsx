import React from "react";
import PropTypes from "prop-types";
import { Checkbox, MenuItem, TextField } from "@material-ui/core";

// See https://github.com/mui-org/material-ui/issues/10938 for why haxx
// If using in an MUI modal/dialog, be sure to pass `disableEnforceFocus=true`

const defaultValue = multiSelect => (multiSelect ? [] : "");
const getLabelForValues = values => {
  if (!values || !values.length) return "Select";
  return values.length > 1 ? `${values.length} Selected` : values[0];
};

const MaterialInputSelect = ({
  field,
  form: { errors, handleBlur, touched },
  label,
  multiSelect,
  options,
  ...props
}) => {
  const SelectProps = multiSelect
    ? {
        multiple: true,
        renderValue: () => getLabelForValues(field.value)
      }
    : undefined;
  return (
    <TextField
      {...props}
      {...field}
      value={
        field.value !== undefined ? field.value : defaultValue(multiSelect)
      }
      error={Boolean(touched[field.name] && errors[field.name])}
      label={(touched[field.name] && errors[field.name]) || label}
      onBlur={event => {
        event.target.name = field.name; // eslint-disable-line
        handleBlur(event);
      }}
      select
      SelectProps={SelectProps}
    >
      {field.value === "" && <MenuItem value="">Select</MenuItem>}
      {options.map(option => (
        <MenuItem value={option.value} key={option.value}>
          {multiSelect && (
            <Checkbox
              color="primary"
              checked={field.value ? field.value.includes(option.value) : false}
            />
          )}
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

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
  multiSelect: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.string
    })
  )
};

MaterialInputSelect.defaultProps = {
  multiSelect: false,
  options: []
};

export default MaterialInputSelect;
