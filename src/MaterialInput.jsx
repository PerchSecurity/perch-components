import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { getIn } from "formik";

const MaterialInput = ({
  field,
  form: { touched, errors },
  label,
  ...props
}) => (
  <TextField
    {...props}
    {...field}
    value={field.value !== undefined ? field.value : ""}
    error={Boolean(getIn(touched, field.name) && getIn(errors, field.name))}
    label={(getIn(touched, field.name) && getIn(errors, field.name)) || label}
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
    touched: PropTypes.object,
    errors: PropTypes.object
    // the rest of the formik bag too
  }).isRequired,
  label: PropTypes.string.isRequired
};

export default MaterialInput;
