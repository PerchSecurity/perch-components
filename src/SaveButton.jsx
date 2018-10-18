import React from "react";
import PropTypes from "prop-types";
import { FormikConsumer } from "formik";
import { Button, CircularProgress } from "@material-ui/core";

const SaveButton = ({ forceSubmit, label, validationSchema, ...props }) => (
  <FormikConsumer>
    {({ values, handleSubmit, isSubmitting }) => {
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
          {!isSubmitting && label}
          {isSubmitting && <CircularProgress size={24} />}
        </Button>
      );
    }}
  </FormikConsumer>
);

SaveButton.propTypes = {
  forceSubmit: PropTypes.bool,
  label: PropTypes.string.isRequired,
  validationSchema: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

SaveButton.defaultProps = {
  forceSubmit: false
};

export default SaveButton;
