import React from "react";
import PropTypes from "prop-types";
import { TableCell, TableRow, withStyles } from "@material-ui/core";

const styles = theme => ({
  rect: {
    height: "10px",
    width: "80%",
    backgroundColor: theme.palette.action.loading,
    animation: "pulse 1s infinite"
  },
  "@keyframes pulse": {
    "0%": {
      opacity: 0.25
    },
    "50%": {
      opacity: 1
    },
    "100%": {
      opacity: 0.25
    }
  }
});

/* eslint-disable react/no-array-index-key */
const LoadingRow = ({ classes, rows }) => (
  <TableRow>
    {[...Array(rows)].map((_, index) => (
      <TableCell key={index} padding="none">
        <div className={classes.rect} />
      </TableCell>
    ))}
  </TableRow>
);

LoadingRow.propTypes = {
  classes: PropTypes.shape({
    rect: PropTypes.string
  }).isRequired,
  rows: PropTypes.number.isRequired
};

export default withStyles(styles)(LoadingRow);
