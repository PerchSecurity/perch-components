import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

const MaterialInput = ({ field, form: { touched, errors }, label, ...props }) => (
  <TextField
    {...props}
    {...field}
    value={field.value || ''}
    error={Boolean(touched[field.name] && errors[field.name])}
    label={(touched[field.name] && errors[field.name]) || label}
  />
);

MaterialInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object,
    // the rest of the formik bag too
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default MaterialInput;
