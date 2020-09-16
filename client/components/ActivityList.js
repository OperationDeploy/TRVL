import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const ActivityList = ({ activities, deleteActivity }) => (
  <List className="activity-list-container">
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

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  deleteActivity: PropTypes.func.isRequired,
};

export default ActivityList;
