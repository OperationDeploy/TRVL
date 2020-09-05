import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const ActivityForm = ({ saveActivity }) => {
  const [value, setValue] = useState('');

  return (
    <div className="activity-form">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveActivity(value);
          setValue('');
        }}
      >
        <TextField
          value={value}
          variant="outlined"
          placeholder="add activity"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          margin="normal"
        />
        <IconButton>
          <AddIcon
            onClick={(event) => {
              event.preventDefault();
              saveActivity(value);
              setValue('');
            }}
          />
        </IconButton>
      </form>
    </div>
  );
};

ActivityForm.propTypes = {
  saveActivity: PropTypes.func.isRequired,
};

export default ActivityForm;
