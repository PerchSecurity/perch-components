import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ActionButton } from "./index";
import { ActionButtonPropTypes } from "./ActionButton";

const styles = theme => ({
  actionBar: {
    height: 64,
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  }
});

const ActionBar = ({ actions, classes }) => (
  <div className={classes.actionBar}>
    {actions.map(action => (
      <ActionButton key={action.label} {...action} />
    ))}
  </div>
);

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape(ActionButtonPropTypes)).isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ActionBar);
