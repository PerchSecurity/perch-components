import React from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";

const SaveButton = (
  { label, validationSchema, ...props },
  { formik: { values, isSubmitting } }
) => {
  const disabled = isSubmitting || !validationSchema.isValidSync(values);
  return (
    <Button raised color="primary" type="submit" disabled={disabled} {...props}>
      {label}
    </Button>
  );
};

SaveButton.propTypes = {
  label: PropTypes.string.isRequired,
  validationSchema: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

SaveButton.contextTypes = {
  formik: PropTypes.object
};

export default SaveButton;
