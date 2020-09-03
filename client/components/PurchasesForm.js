import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const PurchasesForm = ({ savePurchase }) => {
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          savePurchase({ description, price });
          setPrice('');
          setDescription('');
        }}
      >
        <TextField
          value={description}
          variant="outlined"
          placeholder="add purchase"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          margin="normal"
        />
      </form>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          savePurchase({ description, price });
          setPrice('');
          setDescription('');
        }}
      >
        <CurrencyTextField
          label="Amount"
          variant="standard"
          value={price}
          currencySymbol="$"
     // minimumValue="0"
          outputFormat="string"
          decimalCharacter="."
          digitGroupSeparator=","
          onChange={(event, value) => setPrice(value)}
        />
      </form>
    </div>
  );
};

PurchasesForm.propTypes = {
  savePurchase: PropTypes.func.isRequired,
};

export default PurchasesForm;
