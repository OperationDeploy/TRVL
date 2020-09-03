import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Preferences from './preferences';

const PlanATrip = ({ clickPlan, onClickPlanTrip, currentUser }) => {
  if (clickPlan) {
    return <Preferences currentUser={currentUser} />;
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

PlanATrip.propTypes = {
  clickPlan: PropTypes.bool.isRequired,
  onClickPlanTrip: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
};

export default PlanATrip;
