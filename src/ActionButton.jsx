import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { Button, Icon, IconButton, Tooltip, withStyles } from "material-ui";

const styles = theme => ({
  action: {
    color: theme.palette.action.link,
  },
  danger: {
    color: theme.palette.action.danger,
  },
});

const ActionButton = ({ classes, danger, icon, label, link, onClick }) => {
  const linkProps = link ? { component: Link, to: link } : {};
  const buttonClass = danger ? classes.danger : classes.action;
  if (icon) {
    return (
      <Tooltip title={label}>
        <IconButton key={label} className={buttonClass} onClick={onClick} {...linkProps}>
          <Icon>{icon}</Icon>
        </IconButton>
      </Tooltip>
    );
  } else {  // eslint-disable-line no-else-return
    return (
      <Button size="small" key={label} className={buttonClass} onClick={onClick} {...linkProps}>
        {label}
      </Button>
    );
  }
};

ActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
  danger: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

ActionButton.defaultProps = {
  danger: null,
  icon: null,
  link: null
};

export const ActionButtonPropTypes = ActionButton.propTypes;
export default withStyles(styles)(ActionButton);
