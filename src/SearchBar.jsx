import React from "react";
import PropTypes from "prop-types";
import { Icon, IconButton, Input } from "material-ui";
import { withStyles } from "material-ui/styles";
import { grey } from "material-ui/colors";
import debounce from "lodash.debounce";

const DEBOUNCE_DURATION = 300;

const styles = theme => ({
  searchBar: {
    height: 64,
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    borderBottom: "2px #D8D8D8 solid"
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
});

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  handleChange = query => {
    this.setState({ query });
    this.debouncedOnChange(query);
  };

  debouncedOnChange = debounce(this.props.onChange, this.props.debounce);

  render() {
    const { classes } = this.props;
    const { query } = this.state;
    return (
      <div className={classes.searchBar}>
        <Input
          fullWidth
          disableUnderline
          classes={{ root: classes.input }}
          id="search"
          placeholder="Search"
          onChange={event => this.handleChange(event.target.value)}
          startAdornment={<Icon className={classes.icon}>search</Icon>}
          type="search"
          value={query}
        />
        {query && (
          <IconButton onClick={() => this.handleChange("")}>
            <Icon>clear</Icon>
          </IconButton>
        )}
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
  debounce: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  debounce: DEBOUNCE_DURATION
};

export default withStyles(styles)(SearchBar);
