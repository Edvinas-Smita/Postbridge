import React from 'react';

import {withStyles} from "@material-ui/core/styles";

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid';
import IconButton from '@material-ui/core/IconButton';

import PlaneIcon from '@material-ui/icons/AirplanemodeActive';
import PointIcon from '@material-ui/icons/Lens';
import CarIcon from '@material-ui/icons/DirectionsCar';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

import {formatWeight, STATUS} from '../../helpers';

const styles = theme => ({
  table: {
    width: '90%',
    marginLeft: '3%',
    marginRight: '3%',
    tableLayout: 'fixed',
  },
  tableRow: {
    borderColor: theme.palette.grey[300],
    border: '1.4px solid',
    height: '60px'
  },
  column: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: '5px',
    backgroundColor: 'white',
    verticalAlign: 'middle'
  },
  greyTextColor: {
    color: theme.palette.grey[700],
  },
  boldText: {
    fontWeight: 'bold'
  },
  statusColumnBorder: {
    border: '1px dashed',
    justifyContent: 'center',
    borderRadius: '3px',
    height: '30px',
    width: '90px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  button: {
    height: '20px',
    borderRadius: '20px',
    width: '90px',
    fontSize: '12px',
    textTransform: 'none',
    marginRight: '10px'
  },
  pointIcon: {
    width: '10px',
    height: '10px',
        marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit *2
  },
  planeIcon: {
    transform: 'rotate(90deg)',
        marginRight: theme.spacing.unit *2
  },
  endLocationIcon: {
    color: theme.palette.grey[500],
    marginRight: '14px'
  },
  closeEditIcon: {
    width: '20px',
    height: '20px',
    color: theme.palette.grey[500],
    justifyContent: 'center',
    marginRight: '5px',
    verticalAlign: 'middle'
  },
  greyColor: {
    color: theme.palette.grey[500]
  },
  primaryColor: {
    color: theme.palette.primary.dark
  },
  secondaryColor: {
    color: theme.palette.secondary.dark
  },
  iconButton: {
    padding: '7px'
  }
});

const parcelTable = (props) => {
  const {classes} = props;
  const destinationColumnStyle = [classes.column, classes.boldText].join(' ');
  const otherColumnStyle = [classes.column, classes.greyTextColor].join(' ');
  return (
    <TableBody>
      {props.parcels.map((parcel, index) => {
        let statusButtonText =
          parcel.courier
            ? parcel.courier.id === props.user.id
              ? "Change status"
              : "View status"
            : parcel.recipient.id === props.user.id
              ? "View status"
              : "I'll deliver";
        let buttonVariant =
          statusButtonText === "View status"
            ? "outlined"
            : "contained";
        let buttonColor =
          statusButtonText === "View status"
            ? "default"
            : "primary";
        let statusColor;
        switch (parcel.status) {
          case 1:
            statusColor = classes.primaryColor;
            break;
          case 2:
            statusColor = classes.secondaryColor;
            break;
          default:
            statusColor = classes.greyColor;
        }
        let statusColumn = [statusColor, classes.statusColumnBorder].join(' ');
        let pointIcon = [statusColor, classes.pointIcon].join(' ');
        let icon = <PlaneIcon className={[classes.planeIcon, classes.endLocationIcon].join(' ')}/>;

        if ((parcel.startLocation === 'Vilnius' && parcel.endLocation === 'Kaunas') ||
          (parcel.startLocation === 'Kaunas' && parcel.endLocation === 'Vilnius')) {
          icon = <CarIcon className={classes.endLocationIcon}/>
        }

        return (
          <TableRow className={classes.tableRow} key={index}>
            <TableCell className={destinationColumnStyle}>
              <PointIcon className={pointIcon}/>
              {parcel.startLocation}
            </TableCell>
            <TableCell className={destinationColumnStyle}>
              <Grid container alignItems="center">
                {icon}
                {parcel.endLocation}
              </Grid>
            </TableCell>
            <TableCell className={classes.column}>
              <div className={statusColumn}>{STATUS[parcel.status]}</div>
            </TableCell>
            <TableCell className={otherColumnStyle}>{parcel.description}</TableCell>
            <TableCell className={otherColumnStyle}>{formatWeight(parcel.weight)}</TableCell>
            <TableCell className={otherColumnStyle}>{parcel.createdDate.slice(0, 10)}</TableCell>
            <TableCell className={otherColumnStyle}>
              {parcel.recipient
                ? (parcel.recipient.firstName +
                  " " +
                  parcel.recipient.lastName +
                  (parcel.recipient.id === props.user.id
                    ? " (Me)"
                    : "")
                )
                : "---"}
            </TableCell>
            <TableCell className={otherColumnStyle}>
              {parcel.courier
                ? (parcel.courier.firstName +
                  " " +
                  parcel.courier.lastName +
                  (parcel.courier.id === props.user.id
                    ? " (Me)"
                    : "")
                )
                : "---"}
            </TableCell>
            <TableCell className={classes.column}>
              <div style={{display:'flex'}}>
                <Button variant={buttonVariant} color={buttonColor} size="small" className={classes.button}
                        onClick={() => {props.openParcelStatus(parcel.id)}}>
                  {statusButtonText}
                </Button>
                {
                  (
                    !parcel.courier &&
                    parcel.recipient.id === props.user.id &&
                    STATUS[parcel.status] === 'Open'
                  ) &&
                  <IconButton className={classes.iconButton} onClick={() => props.onEditParcel(parcel)}>
                    <EditIcon fontSize="small"/>
                  </IconButton>
                }
                {
                  (
                    parcel.recipient.id === props.user.id &&
                    (STATUS[parcel.status] === 'Open' || STATUS[parcel.status] === 'Delivered')
                  ) &&
                  <IconButton className={classes.iconButton} onClick={props.deleteParcelFactory(parcel.id)}>
                    <CloseIcon fontSize="small"/>
                  </IconButton>
                }
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  )
};

export default withStyles(styles)(parcelTable);