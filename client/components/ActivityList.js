import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const AcitivityList = ({ activities, deleteActivity }) => (
  <List>
    {activities.map((activity, index) => (
      <ListItem key={index.toString()} dense button>
        <ListItemText primary={activity} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              deleteActivity(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

AcitivityList.propTypes = {
  activities: PropTypes.arrayOf.isRequired,
  deleteActivity: PropTypes.func.isRequired,
};

export default AcitivityList;
