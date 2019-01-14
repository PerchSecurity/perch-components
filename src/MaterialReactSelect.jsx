/* eslint-disable react/no-multi-comp */
import React from "react";
import PropTypes from "prop-types";
import { Icon, MenuItem, Typography, withStyles } from "@material-ui/core";
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Select from "react-select";

export const mapDataToMaterialSelectOptions = (data, key) =>
  data &&
  data[key] &&
  data[key].map(item => ({
    label: item.name,
    value: item.id
  }));

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 250,
    },
    input: {
      display: 'flex',
      padding: 0,
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    chip: {
      margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        0.08,
      ),
    },
    noOptionsMessage: {
      padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
      fontSize: 16,
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16,
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing.unit * 2,
    },
  });
  

// This must be a Class component so react-select can set a ref with it
// TODO: Does the above still apply with react-select 2?
class SelectOption extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

SelectOption.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  isFocused: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number
  }).isRequired,
};

export function SelectWrapped(props) {
  const { classes, fullWidth, getOptionLabel, getOptionValue, noOptionsMessage, theme, ...other } = props;
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  return (
    <Select
      arrowRenderer={arrowProps =>
        arrowProps.isOpen ? (
          <Icon>arrow_drop_down</Icon>
        ) : (
          <Icon>arrow_drop_up</Icon>
        )
      }
      classes={classes}
      styles={selectStyles}
      classNamePrefix="mui"
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      noOptionsMessage={() => <Typography>{noOptionsMessage}</Typography>}
      optionComponent={SelectOption}
      style={{
        width: fullWidth && "100%"
      }}
      {...other}
    />
  );
}

SelectWrapped.propTypes = {
  fullWidth: PropTypes.bool.isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func.isRequired,
  noOptionsMessage: PropTypes.string,
}

SelectWrapped.defaultProps = {
  noOptionsMessage: 'No results found'
}

export default withStyles(styles, { withTheme: true })(SelectWrapped);
