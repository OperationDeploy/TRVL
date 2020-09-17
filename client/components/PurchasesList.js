import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const PurchasesList = ({ purchases, deletePurchase }) => (
  <List>
    {purchases.map((purchase, index) => (
      <ListItem key={index.toString()} dense button>
        <ListItemText
          primary={`${purchase.description}: $${purchase.price} (${purchase.purchaser})`}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => {
              deletePurchase(index, purchase.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
);

PurchasesList.propTypes = {
  purchases: PropTypes.arrayOf.isRequired,
  deletePurchase: PropTypes.func.isRequired,
};

export default PurchasesList;
