import React from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import { TextField } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { blue, green, pink, orange, teal } from 'material-ui/colors';

const styles = {
  0: { color: pink[500] },
  1: { color: orange[500] },
  2: { color: blue[500] },
  3: { color: teal[500] },
  4: { color: green[500] },
};

const checkPasswordStrength = password => {
  const { score, feedback } = zxcvbn(password);
  return { score, feedback: feedback.warning || feedback.suggestions[0] };
};

const scoreLabels = ['Very Weak', 'Weak', 'Good', 'Strong', 'Very Strong'];

const PasswordStrengthInput = ({ classes, field, form: { touched, errors }, label, ...props }) => {
  const { score, feedback } = field.value ? checkPasswordStrength(field.value) : {};
  const formattedFeedback = feedback ? `: ${feedback}` : '';
  const helperText = field.value ? `${scoreLabels[score]}${formattedFeedback}` : '';
  return (
    <TextField
      {...props}
      {...field}
      type="password"
      value={field.value || ''}
      helperText={helperText}
      helperTextClassName={field.value ? classes[score] : ''}
      label={(touched.password && errors.password) || label}
      error={Boolean(touched[field.name] && errors[field.name])}
    />
  );
};

PasswordStrengthInput.propTypes = {
  classes: PropTypes.object.isRequired,
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

PasswordStrengthInput.defaultProps = {
  value: null,
};

export default withStyles(styles)(PasswordStrengthInput);
