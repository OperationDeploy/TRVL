import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const Invites = () => {

  return (
    <div>
      Invited Trips:
      <Button
        variant="contained"
        onClick={() => {
          console.log('OFIFF');
        }}
      >
        Check me out
      </Button>
    </div>
  );
};

export default Invites;
