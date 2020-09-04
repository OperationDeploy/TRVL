import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const DebtorList = ({ debts }) => {
  const debtViews = Object.keys(debts).map((name) => `${name}: ${debts[name]}`);
  if (debtViews.length) {
    return (
      <List>
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
