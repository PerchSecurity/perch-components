import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  IconButton,
  Tooltip,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  action: {
    color: theme.palette.action.link
  },
  danger: {
    color: theme.palette.action.danger
  }
});

const ActionButton = ({ classes, danger, icon, label, link, onClick }) => {
  const linkProps = link ? { component: Link, to: link } : {};
  const buttonClass = danger ? classes.danger : classes.action;
  return icon ? (
    <Tooltip title={label}>
      <IconButton
        key={label}
        className={buttonClass}
        onClick={onClick}
        {...linkProps}
      >
        {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      size="small"
      key={label}
      className={buttonClass}
      onClick={onClick}
      {...linkProps}
    >
      {label}
    </Button>
  );
};

ActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  danger: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

ActionButton.defaultProps = {
  danger: null,
  icon: null,
  link: null
};

const { classes, ...ActionButtonPropTypes } = ActionButton.propTypes;
export { ActionButtonPropTypes };
export default withStyles(styles)(ActionButton);
