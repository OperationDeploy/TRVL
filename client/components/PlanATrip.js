import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Preferences from './preferences.js';
// TODO: Handle plan a trip click
// const [plan, setPlan] = useState(false);
const PlanATrip = ({ clickPlan, onClickPlanTrip }) => {
  if (clickPlan) {
    return <Preferences />;
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
