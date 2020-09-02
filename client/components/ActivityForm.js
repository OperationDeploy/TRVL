import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ActivityForm = ({ saveActivity }) => {
  const [value, setValue] = useState('');

  return (
    <div>
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
      </form>
    </div>
  );
};

ActivityForm.propTypes = {
  saveActivity: PropTypes.func.isRequired,
};

export default ActivityForm;
