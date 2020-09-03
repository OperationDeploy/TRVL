import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Preferences from './preferences';

const PlanATrip = ({
  clickPlan, onClickPlanTrip, currentUser, currentId,
}) => {
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

PlanATrip.defaultProps = {
  clickPlan: false,
  onClickPlanTrip: () => {},
  currentUser: '',
  currentId: 0,
};

PlanATrip.propTypes = {
  clickPlan: PropTypes.bool,
  onClickPlanTrip: PropTypes.func,
  currentUser: PropTypes.objectOf(PropTypes.object()),
  currentId: PropTypes.number,
};

export default PlanATrip;
