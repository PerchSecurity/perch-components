import React from "react";
import PropTypes from "prop-types";
import { Typography } from "material-ui";
import { withStyles } from "material-ui/styles";
import { ActionButton } from "./index";
import { ActionButtonPropTypes } from "./ActionButton";

const styles = theme => ({
  actionBar: {
    height: 64,
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    borderBottom: "2px #D8D8D8 solid"
  },
  text: {
    marginRight: "auto"
  }
});

const ActionBar = ({ actions, classes, items }) => (
  <div className={classes.actionBar}>
    <Typography variant="title" className={classes.text}>
      {items} selected
    </Typography>
    {actions.map(action => <ActionButton key={action.label} {...action} />)}
  </div>
);

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape(ActionButtonPropTypes)).isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.number.isRequired
};

export default withStyles(styles)(ActionBar);
