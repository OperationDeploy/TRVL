import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const DebtorList = ({ debts }) => (
  <List>
    {debts.map((debt, index) => (
      <ListItem key={index.toString()} dense button>
        <ListItemText primary={debt} />
        {/* <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              deletePurchase(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction> */}
      </ListItem>
    ))}
  </List>
);

export default DebtorList;
