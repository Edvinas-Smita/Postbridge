import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Forward from '@material-ui/icons/Forward'

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 300,
    margin: 24
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
    display: 'grid',
    gridTemplateColumns: '88% 12%',
    gridColumnGap: '1px',
    alignItems: 'center',
    //backgroundColor: 'lightgray'
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />;
}

const Control = onClick => props => {
  return (
    <div className={props.selectProps.classes.divider}>
      <div style={{backgroundColor: 'white'}}>
        <TextField
          fullWidth
          InputProps={{
            inputComponent,
            inputProps: {
              className: props.selectProps.classes.input,
              inputRef: props.innerRef,
              children: [
                ...props.children,
              ],
              ...props.innerProps,
            },
          }}
          {...props.selectProps.textFieldProps}
        />
      </div>
      <div style={{backgroundColor: 'white', display: 'grid', height: '100%'}}>
        <Tooltip title="Filter">
          <Button
            style={{minWidth: 0, marginTop: 16}}
            onClick={(e) => {
              e.stopPropagation();
              if (typeof onClick === 'function') {
                onClick(e);
              }
            }}
          >
            <Forward style={{fill: 'lightgray'}}/>
          </Button>
        </Tooltip>
      </div>
      <div style={{ //makes-shift divider that looks similar to the built-in one - the divs with white background color are needed to mask the overflow of this
        position: 'absolute',
        width: '100%',
        backgroundColor: 'lightgray',
        height: 'calc(100% - 32px)',
        top: '24px',
        zIndex: -1
      }}/>
    </div>
  );
};

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = onClick => ({
  Control: Control(onClick),
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
});

class IntegrationReactSelect extends React.Component {
  render() {
    const {classes, theme} = this.props;

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
      <div className={classes.root} style={this.props.style}>
        <NoSsr>
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: this.props.label,
              InputLabelProps: {
                shrink: true,
              },
            }}
            components={components(this.props.onFilter)}
            options={this.props.options}
            value={this.props.value}
            onChange={(selectedOptions) => this.props.onChange(selectedOptions)}
            placeholder="Enter the users name"
            isMulti
          />
        </NoSsr>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(IntegrationReactSelect);