import React from 'react';
import Button from '@material-ui/core/Button';

const Invites = () => (
  <div>
    Invited Trips:
    <Button
      variant="contained"
      onClick={() => {
        console.info('OFIFF');
      }}
    >
      Check me out
    </Button>
  </div>
);

export default Invites;
