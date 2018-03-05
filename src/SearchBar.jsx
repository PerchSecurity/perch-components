import React from "react";
import PropTypes from "prop-types";
import { Icon, Input } from "material-ui";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import debounce from "lodash.debounce";

const DEBOUNCE_DURATION = 300;

const styles = {
  searchBar: {
    height: 64,
    display: "flex",
    alignItems: "center"
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

class SearchBar extends React.Component {
  debouncedOnChange = debounce(this.props.onChange, DEBOUNCE_DURATION);

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.searchBar}>
        <Input
          fullWidth
          id="search"
          placeholder="Search"
          type="search"
          onChange={event => this.debouncedOnChange(event.target.value)}
          startAdornment={<Icon className={classes.icon}>search</Icon>}
          classes={{ root: classes.input }}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.shape({
    icon: PropTypes.string,
    input: PropTypes.string,
    searchBar: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(SearchBar);
