import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PurchasesForm from './PurchasesForm';
import PurchasesList from './PurchasesList';
import DebtorList from './DebtorList';

const Purchases = ({ currentUser, currentTrip }) => {
  const [purchases, setPurchases] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    axios.get(`/split/${currentTrip.id}/${currentUser.id}`)
      .then(({ data }) => {
        const { items, debts } = data;
        setPurchases(items.map((item) => `${item.description}: $${item.price} (${item.purchaser})`));
        setDebts(debts);
      });
  }, []);
  return (
    <div>
      <Typography component="h1" variant="h2">
        Purchases
      </Typography>

      <PurchasesForm
        savePurchase={({ description, price }) => {
          const text = `${description}: $${price}`;
          if (text.length > 0) {
            axios.post('/split', {
              purchaser_id: currentUser.id, trip_id: currentTrip.id, description, price,
            })
              .then(({ data }) => {
                if (Array.isArray(data)) {
                  data.forEach((payment) => {
                    const name = `${payment.first_name} ${payment.last_name}`
                    debts[name] = debts[name] ? debts[name] + payment.amount : payment.amount;
                  })
                  setDebts((debts) => debts);
                  setPurchases([...purchases, text]);
                }
              });
          }
        }}
      />
      <PurchasesList
        purchases={purchases}
        deletePurchase={(purchaseIndex) => {
          const newPurchases = purchases.filter((_, index) => index !== purchaseIndex);
          setPurchases(newPurchases);
        }}
      />
      <Typography component="h4" variant="h5">
        Who owes you?
      </Typography>
      <DebtorList
        debts={debts}
      />
    </div>
  );
};

export default Purchases;
