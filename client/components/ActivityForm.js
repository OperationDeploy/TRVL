import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

export default ActivityForm;
