import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

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
        {/* <OutlinedInput
          value={value}
          variant="outlined"
          placeholder="add activity"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          margin="normal"
          endAdorment={(
            <InputAdornment position="end">
              <IconButton aria-label="add activity" edge="end">,jh</IconButton>
            </InputAdornment>
          )}
        /> */}
      </form>
    </div>
  );
};

ActivityForm.propTypes = {
  saveActivity: PropTypes.func.isRequired,
};

export default ActivityForm;
