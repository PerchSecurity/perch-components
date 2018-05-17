import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import { ActionButton } from './index';
import { ActionButtonPropTypes } from './ActionButton';

const styles = {
  actionBar: {
    height: 64,
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    alignContent: "space-evenly",
    justifyItems: "space-between",
    flexDirection: "row",
    flexWrap: 'nowrap'
  },
  icon: {
    marginLeft: 8,
    marginRight: 16,
    color: grey[600],
    alignSelf: "center",
    marginBottom: 4
  },
  input: {
    color: grey[800],
    fontSize: 24
  }
};

const JUSTIFICATIONS = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const ActionBar = ({ classes, actions, position }) => (
  <div className={classes.actionBar} style={{ justifyContent: JUSTIFICATIONS[position] }}>
    {actions.map(action => <ActionButton {...action} />)}
  </div>
);

ActionBar.propTypes = {
  classes: PropTypes.object.isRequired,
  position: PropTypes.oneOf(Object.keys(JUSTIFICATIONS)),
  actions: PropTypes.arrayOf(
    PropTypes.shape(ActionButtonPropTypes)
  ).isRequired,
};

ActionBar.defaultProps = {
  position: 'right'
};

export default withStyles(styles)(ActionBar);
