import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const ActivityForm = ({ saveActivity, setActivity, activity, day }) => (
  <div className="activity-form-container">
    <form>
      <TextField
        value={activity.text}
        variant="outlined"
        placeholder="add activity"
        onChange={(event) => {
          setActivity({ text: event.target.value, day });
        }}
        margin="normal"
      />
      <IconButton
        onClick={(event) => {
          event.preventDefault();
          saveActivity();
          setActivity({});
        }}
      >
        <AddIcon />
      </IconButton>
    </form>
  </div>
);

ActivityForm.propTypes = {
  saveActivity: PropTypes.func.isRequired,
  setActivity: PropTypes.func.isRequired,
  activity: PropTypes.shape({ text: PropTypes.string }).isRequired,
  day: PropTypes.string.isRequired,
};

export default ActivityForm;
