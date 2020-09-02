import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Preferences from './preferences.js';

const PlanATrip = ({ clickPlan, onClickPlanTrip, currentUser, currentId }) => {
  if (clickPlan) {
    return <Preferences currentUser={currentUser} currentId={currentId} />;
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          onClickPlanTrip();
        }}
      >
        Plan A Trip
      </Button>
    </div>
  );
};

export default PlanATrip;
