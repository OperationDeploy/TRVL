import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const DebtorList = ({ debts }) => {
  const debtViews = Object.keys(debts).map(
    (name) => `${name}: $${Number(debts[name]).toFixed(2)}`,
  );
  if (debtViews.length) {
    return (
      <List className="debts-container">
        {debtViews.map((debt, index) => (
          <ListItem key={index.toString()} dense button>
            <ListItemText primary={debt} />
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <List>
      <ListItem dense button>
        <ListItemText primary="No one yet." />
      </ListItem>
    </List>
  );
};

DebtorList.propTypes = {
  debts: PropTypes.arrayOf.isRequired,
};

export default DebtorList;
