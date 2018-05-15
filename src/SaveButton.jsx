import React from "react";
import PropTypes from "prop-types";
import { Button } from "material-ui";

const SaveButton = (
  { forceSubmit, label, validationSchema, ...props },
  { formik: { values, handleSubmit, isSubmitting } }
) => {
  const disabled = isSubmitting || !validationSchema.isValidSync(values);
  return (
    <Button
      variant="raised"
      color="primary"
      type="submit"
      onClick={forceSubmit ? handleSubmit : undefined}
      disabled={disabled}
      {...props}
    >
      {label}
    </Button>
  );
};

SaveButton.propTypes = {
  forceSubmit: PropTypes.bool,
  label: PropTypes.string.isRequired,
  validationSchema: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

SaveButton.defaultProps = {
  forceSubmit: false
};

SaveButton.contextTypes = {
  formik: PropTypes.object
};

export default SaveButton;
